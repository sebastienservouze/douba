import { Config } from "../../config.js";
import WebTorrent from "webtorrent";
import log from "../../../common/utils/logger.js";
import { Download } from '../../../common/models/download.model.js';
import { Ratio } from '../../../common/models/ratio.model.js';
import { DownloadUtils } from "../utils/download.utils.js";
import WebSocket, { WebSocketServer } from "ws";
import { IncomingMessage } from "http";
import { DownloadRepository } from "../repositories/download.repository.js";
import { readFileSync, writeFileSync } from "fs";

const { Logger } = log;

export class DownloadService {

    readonly repository = new DownloadRepository();

    readonly client = new WebTorrent({
        downloadLimit: 1024 * 1024 * 100
    });

    readonly wss = new WebSocketServer({
        port: Config.WSS_PORT
    })

    updateDelay: number = 200;

    constructor() {
        this.wss.on('listening', () => Logger.log(`La websocket écoute sur le port ${Config.WSS_PORT}`))

        // Récupère les torrents NON completés en bdd et relance leur téléchargement
        this.repository
            .getAll()
            .filter((download: Download) => download.progress < 1)
            .forEach((download: Download) => {
                this.download(download.magnet);
            });

        // Gère la communication avec les clients
        this.wss.on('connection', (ws: WebSocket, req: IncomingMessage) => {
            Logger.log(`Client connecté à la WebSocket`);

            ws.on('message', () => {
                this.broadcastDownloads()
                Logger.log(`Client demande raffraichissement`);
            });

            ws.on('error', (err: Error) => Logger.error('Une erreur est survenue au niveau de la WebSocket', err));
        })

        // Envoi régulièrement aux clients les téléchargements si il y en a
        setInterval(() => {
            if (this.client.torrents.length) {
                this.broadcastDownloads();
            }
        }, this.updateDelay);
    }

    download(magnet: string): boolean {
        if (this.repository.exists((download: Download) => download.hash === magnet.substring(20, 60))) {
            return false;
        }

        const torrent = this.client.add(magnet, {
            path: `${Config.DOWNLOAD_PATH}/downloads`
        });

        // Quand le torrent est prêt, l'ajoute à la BDD si il n'y est pas déjà et envoi les infos aux clients
        torrent.on('ready', () => {
            Logger.log(`Ajout du torrent ${torrent.name} aux téléchargement`)
            this.repository.insert(DownloadUtils.torrentToDownload(torrent));
            this.broadcastDownloads();
        });

        // Quand le torrent est terminé, met à jour la BDD et envoi les infos aux clients
        torrent.on('done', () => {
            Logger.log(`Le téléchargement du Torrent '${torrent.name}' est terminé`);
            this.repository.update(DownloadUtils.torrentToDownload(torrent));
            this.broadcastDownloads();
            this.client.remove(torrent);
        });

        return true;
    }

    getAll(): Download[] {
        return this.repository.getAll();
    }

    broadcastDownloads() {
        this.wss.clients.forEach((ws: WebSocket) => {
            ws.send(JSON.stringify(this.client.torrents.map(DownloadUtils.torrentToDownload)));
        })
    }
}
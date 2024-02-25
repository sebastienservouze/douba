import {Config} from "../../config.js";
import WebTorrent, {Torrent} from "webtorrent";
import log from "../../../common/utils/logger.js";
import {Download} from '../../../common/models/download.model.js';
import {DownloadUtils} from "../utils/download.utils.js";
import WebSocket, {WebSocketServer} from "ws";
import {IncomingMessage} from "http";
import {Singletons} from "../singletons.js";

const { Logger } = log;

export class DownloadService {

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
        Singletons.DownloadRepository
            .getAll()
            .filter((download: Download) => download.progress < 1)
            .forEach((download: Download) => {
                this.download(download.magnet);
            });

        // Gère la communication avec les clients
        this.wss.on('connection', (ws: WebSocket) => {
            Logger.log(`Client connecté à la WebSocket`);

            ws.on('message', () => {
                this.broadcastDownloads()
                Logger.log(`Client demande raffraichissement`);
            });

            ws.on('error', (err: Error) => Logger.error('Une erreur est survenue au niveau de la WebSocket', err));
        })

        // Envoi régulièrement aux clients les téléchargements si il y en a
        setInterval(() => {
            if (this.client.torrents.length && this.client.torrents.some((torrent: Torrent) => torrent.ready)) {
                this.broadcastDownloads();
            }
        }, this.updateDelay);
    }

    download(torrentFile: any): boolean {
        const torrent = this.client.add(torrentFile, {
            path: `${Config.BASE_PATH}/downloads`
        });

        // Quand le torrent est prêt, l'ajoute à la BDD si il n'y est pas déjà et envoi les infos aux clients
        torrent.on('ready', () => {
            if (Singletons.DownloadRepository.exists((download: Download) => download.hash === torrent.infoHash)) {
                this.client.remove(torrent);
                return false;
            }

            Logger.log(`Ajout du torrent ${torrent.name} aux téléchargement`)
            Singletons.DownloadRepository.insert(DownloadUtils.torrentToDownload(torrent));
            this.broadcastDownloads();
        });

        // Quand le torrent est terminé, met à jour la BDD et envoi les infos aux clients
        torrent.on('done', () => {
            Logger.log(`Le téléchargement du Torrent '${torrent.name}' est terminé`);
            Singletons.DownloadRepository.update(DownloadUtils.torrentToDownload(torrent));
            this.broadcastDownloads();
            this.client.remove(torrent);
        });

        return true;
    }

    getAll(): Download[] {
        return Singletons.DownloadRepository.getAll();
    }

    broadcastDownloads() {
        this.wss.clients.forEach((ws: WebSocket) => {
            ws.send(JSON.stringify(this.client.torrents.map(DownloadUtils.torrentToDownload)));
        })
    }
}
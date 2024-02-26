import {Config} from "../../../config/config.js";
import WebTorrent, {Torrent} from "webtorrent";
import log from "../../../common/utils/logger.js";
import {Download} from '../../../common/models/download.model.js';
import {DownloadUtils} from "../utils/download.utils.js";
import WebSocket, {WebSocketServer} from "ws";
import {Singletons} from "../singletons.js";

const {Logger} = log;

export class DownloadService {

    readonly client = new WebTorrent({
        downloadLimit: 1024 * 1024 * 100
    });

    readonly wss = new WebSocketServer({
        port: Config.wssPort
    })

    updateDelay: number = 200;

    constructor() {
        // Get uncompleted downloads from the database and start them
        Singletons.DownloadRepository
            .getAll()
            .filter((download: Download) => download.progress < 1)
            .forEach((download: Download) => {
                this.download(download.magnet);
            });

        this.handleWebsocket();
    }

    /**
     * Handle the websocket server.
     * Broadcasts the active downloads to the clients.
     */
    handleWebsocket() {
        this.wss.on('listening', () => Logger.log(`La websocket écoute sur le port ${Config.wssPort}`))

        // Websocket interactions
        this.wss.on('connection', (ws: WebSocket) => {
            Logger.log(`Client connecté à la WebSocket`);

            ws.on('message', () => {
                this.broadcastDownloads()
                Logger.log(`Client demande raffraichissement`);
            });

            ws.on('error', (err: Error) => Logger.error('Une erreur est survenue au niveau de la WebSocket', err));
        })

        // Regularly send updates of active downloads to the clients
        setInterval(() => {
            if (this.client.torrents.length && this.client.torrents.some((torrent: Torrent) => torrent.ready)) {
                this.broadcastDownloads();
            }
        }, this.updateDelay);
    }

    /**
     * Add a torrent to the torrent client and start the download.
     * When the torrent is ready, add it to the database if it's not already there and send the info to the clients.
     * If the torrent is already in the database, don't add it and return false.
     * When the torrent is done, update the database and send the info to the clients.
     * @param torrentFile
     */
    download(torrentFile: any): boolean {
        const torrent = this.client.add(torrentFile, {
            path: `${Config.basePath}/downloads`
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

    /**
     * Get all the downloads
     */
    getAll(): Download[] {
        return Singletons.DownloadRepository.getAll();
    }

    /**
     * Broadcast the active downloads to the clients
     */
    broadcastDownloads() {
        this.wss.clients.forEach((ws: WebSocket) => {
            ws.send(JSON.stringify(this.client.torrents.map(DownloadUtils.torrentToDownload)));
        })
    }
}
import config from "../../../config/config.js";
import WebTorrent, {Torrent} from "webtorrent";
import log from "../../../common/utils/logger.js";
import {DownloadUtils} from "../utils/download.utils.js";
import WebSocket, {WebSocketServer} from "ws";
import {Download} from "../../../common/models/download.model.js";
import {Injectable} from "@decorators/di";

const {Logger} = log;
const {Config} = config;

@Injectable()
export class DownloadService {

    readonly maxDownloadMb: number = 10;
    updateDelay: number = 200;

    readonly client: WebTorrent.Instance = new WebTorrent({
        // @ts-ignore
        downloadLimit: 1024 * 1024 * this.maxDownloadMb
    });

    readonly wss: WebSocketServer = new WebSocketServer({
        port: Config.wssPort
    })

    constructor() {
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
    startDownload(torrentFile: any): void {
        const torrent = this.client.add(torrentFile, {
            path: `${Config.basePath}/downloads`
        });

        // Quand le torrent est prêt envoie les infos aux clients
        torrent.on('ready', () => {
            Logger.log(`Ajout du torrent ${torrent.name} aux téléchargement`)
            this.broadcastDownloads();
        });

        // Quand le torrent est terminé, met à jour la BDD et envoi les infos aux clients
        torrent.on('done', () => {
            Logger.log(`Le téléchargement du Torrent '${torrent.name}' est terminé`);
            this.broadcastDownloads();
        });
    }

    /**
     * Broadcast the active downloads to the clients
     */
    broadcastDownloads() {
        this.wss.clients.forEach((ws: WebSocket) => {
            ws.send(JSON.stringify(this.client.torrents.map(DownloadUtils.torrentToDownload)));
        })
    }

    /**
     * Get the active downloads
     */
    getDownloads(): Download[] {
        return this.client.torrents.map(DownloadUtils.torrentToDownload);
    }
}
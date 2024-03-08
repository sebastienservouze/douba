import config from "../../../config/config.js";
import WebTorrent, {Torrent} from "webtorrent";
import log from "../../../common/utils/logger.js";
import {DownloadUtils} from "../utils/download.utils.js";
import {Download} from "../../../common/models/download.model.js";
import {WebSocketService} from "../websocket/web-socket.service.js";
import {Dependency} from "../di/dependency.js";

const {Logger} = log;
const {Config} = config;

@Dependency()
export class DownloadService {

    readonly maxDownloadMb: number = 10;
    updateDelay: number = 200;

    readonly client: WebTorrent.Instance = new WebTorrent({
        // @ts-ignore
        downloadLimit: 1024 * 1024 * this.maxDownloadMb
    });

    constructor(private webSocketService: WebSocketService) {
        console.log('hi');

        // Regularly send updates of active downloads to the clients
        setInterval(() => {
            if (this.client.torrents.length && this.client.torrents.some((torrent: Torrent) => torrent.ready)) {
                this.webSocketService.broadcast(this.getDownloads());
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
            this.webSocketService.broadcast(this.getDownloads());
        });

        // Quand le torrent est terminé, met à jour la BDD et envoi les infos aux clients
        torrent.on('done', () => {
            Logger.log(`Le téléchargement du Torrent '${torrent.name}' est terminé`);
            this.webSocketService.broadcast(this.getDownloads());
        });
    }

    /**
     * Get the active downloads
     */
    getDownloads(): Download[] {
        return this.client.torrents.map(DownloadUtils.torrentToDownload);
    }
}
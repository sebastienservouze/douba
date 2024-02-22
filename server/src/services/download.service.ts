import { Config } from "../../config.js";
import WebTorrent, { Torrent } from "webtorrent";
import log from "../../../common/utils/logger.js";
import { Download } from '../../../common/models/download.model.js';
import { TorrentNameDecoder } from "../utils/torrent-name-decoder.utils.js";
import { ByteUtils } from "../utils/bytes.utils.js";

const { Logger } = log;

export class DownloadService {

    readonly client = new WebTorrent();

    constructor() {
        this.client.on('torrent', (torrent: Torrent) => {
            Logger.log(`Le Torrent ${torrent.name} est prêt`)
        })
    }

    async Download(magnet: string): Promise<Torrent> {
        return this.client.add(magnet, {
            path: Config.DOWNLOAD_PATH
        });
    }

    getActives(): Download[] {
        return this.client.torrents.flatMap((torrent: Torrent) => this.getDownloadInfos(torrent));
    }

    getDownloadInfos(torrent: Torrent): Download {
        const download = {} as Download;

        download.fileName = torrent.name;
        download.downloadSpeed = ByteUtils.formatBytes(torrent.downloadSpeed);
        download.totalSize = ByteUtils.formatBytes(torrent.length);
        download.progress = torrent.progress;
        download.remainingTime = torrent.timeRemaining;
        download.uploadSpeed = ByteUtils.formatBytes(torrent.uploadSpeed);
        download.language = TorrentNameDecoder.getLanguage(torrent.name);
        download.quality = TorrentNameDecoder.getQuality(torrent.name);

        return download;
    }
}
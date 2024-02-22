import { Config } from "../../config.js";
import WebTorrent, { Torrent } from "webtorrent";
import log from "../../../common/utils/logger.js";
import { Download } from '../../../common/models/download.model.js';
import { TorrentNameDecoder } from "../utils/torrent-name-decoder.utils.js";
import { ByteUtils } from "../utils/bytes.utils.js";
import { TimeUtils } from "../utils/time.utils.js";
import { readFileSync, writeFileSync } from 'fs'
import { MagnetUtils } from "../utils/magnet.utils.js";

const { Logger } = log;

export class DownloadService {

    readonly client = new WebTorrent({
        downloadLimit: 1024 * 1024 * 10
    });

    constructor() {
        this.client.on('torrent', (torrent: Torrent) => Logger.log(`Le Torrent '${torrent.name}' est prêt`));
    }

    Download(magnet: string): Torrent {
        const torrent = this.client.add(magnet, {
            path: `${Config.DOWNLOAD_PATH}/downloads`
        });

        if (MagnetUtils.get().includes(magnet)) {
            MagnetUtils.store(magnet);
        }

        torrent.on('done', () => Logger.log(`Le téléchargement du Torrent '${torrent.name}' est terminé`));

        return torrent;
    }

    storeMagnet(magnet: string): void {
        const magnets = JSON.parse(readFileSync(`${Config.DOWNLOAD_PATH}/magnets.json`, 'utf-8'));
        magnets.push(magnet);
        writeFileSync(`${Config.DOWNLOAD_PATH}/magnets.json`, JSON.stringify(magnets, null, 4));
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
        download.remainingTime = TimeUtils.format(torrent.timeRemaining);
        download.uploadSpeed = ByteUtils.formatBytes(torrent.uploadSpeed);
        download.language = TorrentNameDecoder.getLanguage(torrent.name);
        download.quality = TorrentNameDecoder.getQuality(torrent.name);

        return download;
    }
}
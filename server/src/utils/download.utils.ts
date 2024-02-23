import { readFileSync, writeFileSync } from "fs";
import { Config } from "../../config.js";
import { Download } from "../../../common/models/download.model.js";
import { Torrent } from "webtorrent";
import byte from "../../../common/utils/bytes.utils.js";
import time from "../../../common/utils/time.utils.js";
import { TorrentNameDecoder } from "./torrent-name-decoder.utils.js";

const { ByteUtils } = byte;
const { TimeUtils } = time;

export class DownloadUtils {

    static torrentToDownload(torrent: Torrent): Download {
        const download = {} as Download;

        download.hash = torrent.infoHash;
        download.magnet = torrent.magnetURI;
        download.fileName = torrent.name;
        download.path = torrent.path;
        download.paused = torrent.paused;
        download.uploaded = torrent.uploaded;
        download.uploadSpeed = ByteUtils.format(torrent.uploadSpeed);
        download.downloaded = torrent.downloaded;
        download.downloadSpeed = ByteUtils.format(torrent.downloadSpeed);
        download.progress = torrent.progress;
        download.totalSize = ByteUtils.format(torrent.length);
        download.remainingTime = TimeUtils.format(torrent.timeRemaining);
        download.language = TorrentNameDecoder.getLanguage(torrent.name);
        download.quality = TorrentNameDecoder.getQuality(torrent.name);
        download.done = torrent.done;

        return download;
    }

}
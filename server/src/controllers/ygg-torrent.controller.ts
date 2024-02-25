import { Router } from "express";
import { YggTorrentService } from "../services/ygg-torrent.service.js";
import log from "../../../common/utils/logger.js";
import {Singletons} from "../singletons.js";
const { Logger } = log;

const YggTorrentController = Router();
const service = new YggTorrentService();

YggTorrentController.get('/:title', async (req, res) => {
    Logger.log(`GET /yggtorrent/${req.params.title}`)
    return res
        .status(200)
        .json(await service.find(req.params.title));
})

YggTorrentController.get('/download/:id', async (req, res) => {
    Logger.log(`GET /yggtorrent/download/${req.params.id}`)

    const torrent = await service.getTorrent(req.params.id);
    Singletons.DownloadService.download(torrent);

    return res
        .status(200)
        .json();
})

export { YggTorrentController }
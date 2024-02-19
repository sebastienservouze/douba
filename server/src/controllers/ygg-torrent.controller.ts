import { Router } from "express";
import { YggTorrentService } from "../services/ygg-torrent.service";
import Logger from "../../../common/utils/logger";

const YggTorrentController = Router();
const service = new YggTorrentService();

YggTorrentController.get('/:title', async (req, res) => {
    Logger.log(`GET /yggtorrent/${req.params.title}`)
    return res
        .status(200)
        .json(await service.find(req.params.title));
})

export { YggTorrentController }
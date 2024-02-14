import {Router} from "express";
import {YggTorrentService} from "../services/yggTorrent.service";
import Logger from "../../../common/utils/logger";

const YggTorrentController = Router();
const service = new YggTorrentService();

YggTorrentController.get('/:title', async (req, res) => {
    Logger.log(`GET /yggtorrent/${req.params.title}`)
    return res
        .status(200)
        .json(await service.findMoviesByTitle(req.params.title));
})

export {YggTorrentController}
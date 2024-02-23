import { Router } from "express";
import { DownloadService } from "../services/download.service.js";
import log from "../../../common/utils/logger.js";

const { Logger } = log;

const DownloadController = Router();
const service = new DownloadService;

/*
 * Endpoints
 */

DownloadController.post('/', async (req, res) => {
    Logger.log(`POST /downloads`, req.body.magnet);

    const isDownloaded = service.download(req.body.magnet);

    return res
        .status(isDownloaded ? 200 : 204)
        .json();
})

DownloadController.get('/', async (req, res) => {
    Logger.log(`GET /downloads`);

    return res
        .status(200)
        .json(service.getAll());
})

export { DownloadController }
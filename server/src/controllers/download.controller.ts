import { Router } from "express";
import { DownloadService } from "../services/download.service.js";
import log from "../../../common/utils/logger.js";
import {Singletons} from "../singletons.js";

const { Logger } = log;

const DownloadController = Router();

/*
 * Endpoints
 */

DownloadController.get('/', async (req, res) => {
    Logger.log(`GET /downloads`);

    return res
        .status(200)
        .json(Singletons.DownloadService.getAll());
})

export { DownloadController }
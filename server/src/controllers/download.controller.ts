import { Router } from "express";
import Logger from "../../../common/utils/logger";
import { DownloadService } from "../services/download.service";
import WebSocket, { WebSocketServer } from "ws";
import { Config } from "../../config";
import { IncomingMessage } from "http";

const DownloadController = Router();
const service = new DownloadService;
const wss = new WebSocketServer({
    port: Config.WSS_PORT
})

DownloadController.get('/', async (req, res) => {
    Logger.log(`GET /downloads`)
    return res
        .status(200)
        .json(await service.Get());
})

wss.on('connection', (ws: WebSocket, req: IncomingMessage, client: any) => {
    ws.on('error', (err: Error) => Logger.error('Une erreur est survenue au niveau de la WebSocket', err));

    Logger.log(`${client} connecté à la WebSocket`);
})

export { DownloadController }
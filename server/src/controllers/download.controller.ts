import { Router } from "express";
import { DownloadService } from "../services/download.service.js";
import WebSocket, { WebSocketServer } from "ws";
import { Config } from "../../config.js";
import { IncomingMessage } from "http";
import log from "../../../common/utils/logger.js";
import { readFileSync } from "fs";
import { MagnetUtils } from "../utils/magnet.utils.js";

const { Logger } = log;

const DownloadController = Router();
const service = new DownloadService;
const wss = new WebSocketServer({
    port: Config.WSS_PORT
})

wss.on('listening', () => Logger.log(`La websocket écoute sur le port ${Config.WSS_PORT}`))

const clients: WebSocket[] = [];
const delay = 200;

// Récupération des torrents existants
const magnets = JSON.parse(readFileSync(`${Config.DOWNLOAD_PATH}/magnets.json`, 'utf-8'));
MagnetUtils.get().forEach((magnet: string) => {
    service.Download(magnet);
});

// Envoi régulier des informations de téléchargement de ceux-ci
setInterval(sendActives, delay);

/*
 * Endpoints
 */

DownloadController.post('/', async (req, res) => {
    Logger.log(`POST /downloads`, req.body.magnet);

    const torrent = service.Download(req.body.magnet);

    return res
        .status(200)
        .json(torrent.name);
})

wss.on('connection', (ws: WebSocket, req: IncomingMessage) => {
    Logger.log(`Client connecté à la WebSocket`);

    clients.push(ws);

    ws.on('error', (err: Error) => Logger.error('Une erreur est survenue au niveau de la WebSocket', err));
})

function sendActives() {
    clients.forEach((ws: WebSocket) => {
        ws.send(JSON.stringify(service.getActives()));
    })
}

export { DownloadController }
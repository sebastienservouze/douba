import express, {Express} from "express";
import {Config} from '../../config/config.js';
import cors from 'cors';
import {YggTorrentController} from "./controllers/ygg-torrent.controller.js";
import {DownloadController} from './controllers/download.controller.js';
import log from "../../common/utils/logger.js";

const { Logger } = log;

/*
 * Express initialization
 */
const app: Express = express();
app.use(express.json())
app.use(cors({ origin: '*' }));

/*
 * Routes
 */

app.use('/yggtorrent', YggTorrentController);
app.use('/download', DownloadController);

/*
 * Start the server
 */
app.listen(Config.apiPort, () => {
    Logger.log(`Le serveur écoute sur le port http://localhost:${Config.apiPort}`);
});
import express, { Express } from "express";
import { Config } from '../../config/config.js';
import cors from 'cors';
import { YggTorrentController } from "./controllers/ygg-torrent.controller.js";
import { DownloadController } from './controllers/download.controller.js';
import log from "../../common/utils/logger.js";
const { Logger } = log;

const app: Express = express();
app.use(express.json())
app.use(cors({ origin: '*' }));

app.use('/yggtorrent', YggTorrentController);
app.use('/download', DownloadController);

app.listen(Config.apiPort, () => {
    Logger.log(`Le serveur écoute sur le port http://localhost:${Config.apiPort}`);
});

delete process.env['http_proxy'];
delete process.env['HTTP_PROXY'];
delete process.env['https_proxy'];
delete process.env['HTTPS_PROXY'];
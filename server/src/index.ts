import Logger from '../../common/utils/logger'
import express, { Express } from "express";
import { Config } from '../config';
import cors from 'cors';
import { YggTorrentController } from "./controllers/yggTorrent.controller";

const app: Express = express();

app.use(cors({ origin: '*' }));

app.use('/yggtorrent', YggTorrentController);

app.listen(Config.API_PORT, () => {
    Logger.log(`Le serveur écoute sur le port http://localhost:${Config.API_PORT}`);
});

delete process.env['http_proxy'];
delete process.env['HTTP_PROXY'];
delete process.env['https_proxy'];
delete process.env['HTTPS_PROXY'];
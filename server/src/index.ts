import express, {Express} from "express";
import {Config} from '../../config/config.js';
import cors from 'cors';
import {YggTorrentController} from "./controllers/ygg-torrent.controller.js";
import {DownloadController} from './controllers/download.controller.js';
import log from "../../common/utils/logger.js";
import fs from "fs";

const { Logger } = log;

/*
 * Express initialization
 */

Logger.log('Initialisation du serveur');

const app: Express = express();
app.use(express.json())
app.use(cors({ origin: '*' }));

/*
 * Create directories if they don't exist
 */

if (!fs.existsSync(Config.basePath)) {
    Logger.log(`Création du répertoire de base au chemin ${Config.basePath}`);
    fs.mkdirSync(Config.basePath);
    fs.mkdirSync(`${Config.basePath}/torrents`);
    fs.mkdirSync(`${Config.basePath}/downloads`);
    fs.writeFileSync(`${Config.basePath}/downloads.json`, JSON.stringify([], null, 4));
    Logger.log('Répertoire de base créé au chemin ${Config.basePath}');
}

/*
 * Routes
 */

Logger.log('Initialisation des routes');
app.use('/yggtorrent', YggTorrentController);
app.use('/download', DownloadController);
Logger.log('Routes initialisées');

/*
 * Start the server
 */

app.listen(Config.apiPort, () => {
    Logger.log(`Le serveur écoute sur le port http://localhost:${Config.apiPort}`);
});
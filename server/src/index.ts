import 'reflect-metadata';
import express, {Express} from "express";
import config from '../../config/config.js';
import cors from 'cors';
import log from "../../common/utils/logger.js";
import fs from "fs";
import {Routes} from "./routes.js";

const {Logger} = log;
const {Config} = config;

startServer().catch(Logger.error);

export async function startServer() {

    // Create the base directory if it doesn't exist
    if (!fs.existsSync(Config.basePath)) {
        Logger.log(`Création du répertoire de base au chemin ${Config.basePath}`);
        fs.mkdirSync(Config.basePath);
        fs.mkdirSync(`${Config.basePath}/torrents`);
        fs.mkdirSync(`${Config.basePath}/downloads`);
        Logger.log(`Répertoire de base créé au chemin ${Config.basePath}`);
    }

    // Create the server
    const app: Express = express();
    app.use(express.json())
    app.use(cors({origin: '*'}));

    // Register the controllers
    Routes.registerAll(app);

    app.listen(Config.apiPort, () => {
        Logger.log(`Le serveur écoute sur le port http://localhost:${Config.apiPort}`);
    });
}

import Logger from '../../common/utils/logger'
import express, { Express } from "express";
import { Config } from '../config';
import { HelloWorldController } from './controllers/hello-world';
import cors from 'cors';

const app: Express = express();

app.use(cors({origin: '*'}));

app.use('/', HelloWorldController);

app.listen(Config.API_PORT, () => {
  Logger.log(`Le serveur écoute sur le port http://localhost:${Config.API_PORT}`);
});
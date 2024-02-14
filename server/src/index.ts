import Logger from '../../common/utils/logger'
import express, {Express} from "express";
import {Config} from '../config';
import {MovieController} from './controllers/movie.controller';
import cors from 'cors';

const app: Express = express();

app.use(cors({origin: '*'}));

app.use('/movies', MovieController);

app.listen(Config.API_PORT, () => {
    Logger.log(`Le serveur écoute sur le port http://localhost:${Config.API_PORT}`);
});
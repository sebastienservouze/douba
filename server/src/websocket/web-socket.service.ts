import WebSocket, {WebSocketServer} from "ws";
import config from "../../../config/config.js";
import logger from "../../../common/utils/logger.js";
import {Dependency} from "../di/dependency.js";

const {Config} = config;
const {Logger} = logger;

@Dependency()
export class WebSocketService {

    readonly webSocketServer: WebSocketServer = new WebSocketServer({
        port: Config.wssPort
    });

    constructor() {
        this.webSocketServer.on('listening', () => Logger.log(`La websocket écoute sur le port ${Config.wssPort}`))
    }

    broadcast(data: any): void {
        this.webSocketServer.clients.forEach((ws: WebSocket) => {
            ws.send(JSON.stringify(data));
        })
    }
}
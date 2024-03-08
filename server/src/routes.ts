import {Router} from "express";
import {YggTorrentController} from "./controllers/ygg-torrent.controller.js";
import {ExpressRoute} from "./di/express/express-route.js";
import log from "../../common/utils/logger.js";
import {Container} from "./di/container.js";
import {MetadataKey} from "./di/metadata.key.js";

const {Logger} = log;

export class Routes {

    /**
     * Register routes for all controllers
     */
    static registerAll(router: Router) {
        this.registerController(router, YggTorrentController);
    }

    /**
     * Register routes for a controller
     * @param router
     * @param controller
     * @private
     */
    private static registerController(router: Router, controller: any) {
        const instance = Container.get(controller);

        const basePath = Reflect.getMetadata(MetadataKey.BASE_PATH, controller);
        const routes = Reflect.getMetadata(MetadataKey.ROUTES, controller);

        routes.forEach((route: ExpressRoute) => {
            // @ts-ignore
            router[route.method.toLowerCase()](basePath + route.path, instance[String(route.handlerName)].bind(instance));
            Logger.log(`Route ${route.method} ${basePath}${route.path} enregistrée.`)
        });

    }

}
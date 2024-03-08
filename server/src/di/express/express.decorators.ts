import {MetadataKey} from "../metadata.key.js";
import {ExpressRoute} from "./express-route.js";
import {ExpressMethod} from "./express-method.enum.js";

export function Controller(basePath: string): ClassDecorator {
    return function (target: any) {
        Reflect.defineMetadata(MetadataKey.BASE_PATH, basePath, target);
    }
}

export function Get(route: string) {
    return methodDecoratorFactory(ExpressMethod.GET, route);
}

export function Post(route: string) {
    return methodDecoratorFactory(ExpressMethod.POST, route);
}

function methodDecoratorFactory(method: ExpressMethod, path: string) {
    return function (target: any, propertyKey: string) {
        const controllerClass = target.constructor;
        const routers: ExpressRoute[] = Reflect.getMetadata(MetadataKey.ROUTES, controllerClass) || [];

        routers.push({
            method: method,
            path: path,
            handlerName: propertyKey
        });

        Reflect.defineMetadata(MetadataKey.ROUTES, routers, controllerClass);
    }
}
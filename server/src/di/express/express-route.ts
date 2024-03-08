import {ExpressMethod} from "./express-method.enum.js";

export interface ExpressRoute {
    method: ExpressMethod;
    path: string;
    handlerName: string | symbol;
}
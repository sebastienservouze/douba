import {Constructor} from "./constructor.type.js";

export class Container {

    private static dependencies: Map<string, Object> = new Map<string, Object>();

    public static get<T extends Constructor>(target: T): T {
        if (this.dependencies.has(target.name)) {
            return this.dependencies.get(target.name) as T;
        }

        const tokens = Reflect.getMetadata("design:paramtypes", target) || [];
        const dependencies = tokens.map((token: Constructor) => this.get(token));
        const instance = new target(...dependencies) as T;

        this.dependencies.set(instance.name, instance);

        return instance;
    }
}
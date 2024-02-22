export class PromiseUtils {

    static ofEvent(item: any, event: string): Promise<any> {
        return new Promise(resolve => {
            item.on(event, (args: any) => resolve(args));
        })
    }
}
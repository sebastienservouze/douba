export class Logger {

    public static log(message?: string, ...optionalParams: any[]): void {
        if (optionalParams.length) {
            console.log(Logger.getFormattedMessage(message), optionalParams);
        } else {
            console.log(Logger.getFormattedMessage(message));
        }
    }

    public static error(message?: string, ...optionalParams: any[]): void {
        if (optionalParams.length) {
            console.error(Logger.getFormattedMessage(message), optionalParams);
        } else {
            console.error(Logger.getFormattedMessage(message));
        }
    }

    private static getFormattedMessage(message?: string): string {
        const date = new Date();
        return `[${date.toISOString()}] ${message}`;
    }

}

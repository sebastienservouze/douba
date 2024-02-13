export default class Logger {

    public static log(message?: string, ...optionalParams: any[]): void {
        if (optionalParams.length) {
            console.log(this.getFormattedMessage(message), optionalParams);
        } else {
            console.log(this.getFormattedMessage(message));
        }
    }

    public static error(message?: string, ...optionalParams: any[]): void {
        if (optionalParams.length) {
            console.error(this.getFormattedMessage(message), optionalParams);
        } else {
            console.error(this.getFormattedMessage(message));
        }
    }

    private static getFormattedMessage(message?: string): string {
        const date = new Date();
        return `[${date.toISOString()}] ${message}`;
    }

}
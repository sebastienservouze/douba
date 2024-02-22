import { readFileSync, writeFileSync } from "fs";
import { Config } from "../../config.js";

export class MagnetUtils {

    static store(magnet: string): void {
        const magnets = JSON.parse(readFileSync(`${Config.DOWNLOAD_PATH}/magnets.json`, 'utf-8'));
        magnets.push(magnet);
        writeFileSync(`${Config.DOWNLOAD_PATH}/magnets.json`, JSON.stringify(magnets, null, 4));
    }

    static get(): string[] {
        return JSON.parse(readFileSync(`${Config.DOWNLOAD_PATH}/magnets.json`, 'utf-8'));
    }

}
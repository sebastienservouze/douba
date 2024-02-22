import { Config } from "../../config";
import { readdirSync } from 'fs';
import path from "path";
import WebTorrent, { Torrent } from "webtorrent";

export class DownloadService {

    readonly client = new WebTorrent();
    torrents: Torrent[];



    async Get(): Promise<string[]> {
        const files = readdirSync(path.resolve(Config.DOWNLOAD_PATH));

        return files;
    }

    async Download(magnet: string): Promise<void> {
        this.torrents.push(this.client.add(magnet, {
            path: Config.DOWNLOAD_PATH
        }));
    }

}
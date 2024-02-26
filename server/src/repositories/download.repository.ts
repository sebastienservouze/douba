import { readFileSync, writeFileSync } from "fs";
import { Download } from "../../../common/models/download.model.js";
import { Config } from "../../../config/config.js";

export class DownloadRepository {

    static readonly PATH = `${Config.basePath}/downloads.json`;

    insert(download: Download): void {
        const downloads = this.getAll();
        downloads.push(download);
        writeFileSync(DownloadRepository.PATH, JSON.stringify(downloads, null, 4));
    }

    update(download: Download) {
        const downloads = this.getAll();
        downloads[downloads.findIndex((d: Download) => d.hash === download.hash)] = download;
        writeFileSync(DownloadRepository.PATH, JSON.stringify(downloads, null, 4));
    }

    getAll(): Download[] {
        return JSON.parse(readFileSync(DownloadRepository.PATH, 'utf-8'));
    }

    search(predicate: (value: Download) => boolean): Download | undefined {
        return this.getAll().find(predicate);
    }

    exists(predicate: (value: Download) => boolean): boolean {
        return this.getAll().some(predicate);
    }

}
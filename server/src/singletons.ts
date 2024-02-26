import {DownloadRepository} from "./repositories/download.repository.js";
import {DownloadService} from "./services/download.service.js";

/**
 * TODO: Use dependency injection instead of singletons
 */
export class Singletons {

    static readonly DownloadRepository = new DownloadRepository();
    static readonly DownloadService = new DownloadService();

}
import {YggTorrentService} from "../services/ygg-torrent.service.js";
import log from "../../../common/utils/logger.js";
import {DownloadService} from "../services/download.service.js";
import {Controller, Get, Params, Post} from "@decorators/express";
import {Response} from "@decorators/express/lib/src/decorators/params.js";

const { Logger } = log;

@Controller('/yggtorrent')
export class YggTorrentController {

    constructor(private readonly yggTorrentService: YggTorrentService,
                private readonly downloadService: DownloadService) {
    }

    @Get('/:title')
    async find(@Response() res: any, @Params('title') title: string) {
        Logger.log(`GET /yggtorrent/${title}`)

        return res
            .status(200)
            .json(await this.yggTorrentService.find(title));
    }

    @Post('/download/:id')
    async download(req: any, res: any) {
        Logger.log(`GET /yggtorrent/download/${req.params.id}`)

        const torrent = await this.yggTorrentService.getTorrent(req.params.id);
        this.downloadService.startDownload(torrent);

        return res
            .status(200)
            .json();
    }

}

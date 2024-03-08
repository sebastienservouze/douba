import {YggTorrentService} from "../services/ygg-torrent.service.js";
import log from "../../../common/utils/logger.js";
import {Controller, Get, Post} from "../di/express/express.decorators.js";

const { Logger } = log;

@Controller('/yggtorrent')
export class YggTorrentController {

    constructor(private readonly yggTorrentService: YggTorrentService) {
    }

    @Get('/test')
    async test(req: any, res: any) {
        Logger.log(`GET /yggtorrent/test`)

        return res
            .status(200)
            .json(await this.yggTorrentService.test());
    }

    @Get('/:title')
    async find(req: any, res: any) {
        Logger.log(`GET /yggtorrent/${req.params.title}`)

        return res
            .status(200)
            .json(await this.yggTorrentService.find(req.params.title));
    }

    @Post('/download/:id')
    async download(req: any, res: any) {
        Logger.log(`GET /yggtorrent/download/${req.params.id}`)

        await this.yggTorrentService.download(req.params.id);

        return res
            .status(200)
            .json();
    }

}

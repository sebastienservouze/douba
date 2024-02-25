import cheerio from "cheerio";
import axios from "axios";
import {TorrentResult} from '../../../common/models/torrent-result.model.js'
import {TorrentNameDecoder} from "../utils/torrent-name-decoder.utils.js";
import {Speed} from "../../../common/enums/speeds.enum.js";
import {Providers} from "../../../common/enums/providers.enum.js";
import {Download} from "../../../common/models/download.model.js";
import {Singletons} from "../singletons.js";
import * as fs from "fs";
import {Config} from "../../config.js";

export class YggTorrentService {

    readonly searchParams = 'description=&file=&uploader=&category=2145&sub_category=all&do=search&order=desc&sort=completed'

    /**
    * Scrap YggTorrent search page to retrieve torrents
    * @param terms
    */
    async find(terms: string): Promise<TorrentResult[]> {
        const response = await axios.get(`${Providers.YggTorrent}/engine/search?name=${terms}&${this.searchParams}`, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36"
            }
        });

        const $ = cheerio.load(response.data);
        const results: TorrentResult[] = [];
        $('.table tbody tr').each((i, el) => {
            const torrentResult = {} as TorrentResult;

            torrentResult.fullName = $(el).children(':nth-child(2)').text().replace('\n', '').trim();
            torrentResult.downloaded = Singletons.DownloadRepository.exists((download: Download) => download.fileName === torrentResult.fullName);
            torrentResult.url = $(el).children(':nth-child(2)').children('a').attr()['href'];
            torrentResult.size = $(el).children(':nth-child(6)').text().replace('\n', '').trim();
            torrentResult.completed = +$(el).children(':nth-child(7)').text().replace('\n', '').trim();
            torrentResult.seeds = +$(el).children(':nth-child(8)').text().replace('\n', '').trim();
            torrentResult.leechs = +$(el).children(':nth-child(9)').text().replace('\n', '').trim();
            torrentResult.speed = this.getSpeed(torrentResult.seeds, torrentResult.leechs);
            torrentResult.language = TorrentNameDecoder.getLanguage(torrentResult.fullName);
            torrentResult.quality = TorrentNameDecoder.getQuality(torrentResult.fullName);

            const splittedUrl = torrentResult.url.split('/');
            torrentResult.id = +splittedUrl[splittedUrl.length - 1].match(/^[\d]*(?=-)/g)![0];

            const fullAge = $(el).children(':nth-child(5)').text().replace('\n', '').trim().split(' ');
            torrentResult.age = `${fullAge[1]} ${fullAge[2]}`

            results.push(torrentResult)
        })

        return results;
    }

    async getTorrent(id: string): Promise<any> {
        const response = await axios.get(`${Providers.YggTorrent}/engine/download_torrent?id=${id}`, {
            responseType: 'arraybuffer',
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36",
                "Cookie": "ygg_=qd5vv6i1uggqsgboq1gufc5hf61t6734"
            },
        });

        fs.writeFileSync(`${Config.BASE_PATH}/torrents/${id}.torrent`, response.data);

        return response.data;
    }

    private getSpeed(seeds: number, leechs: number): Speed {
        const delta = seeds - leechs;

        if (delta < 5) {
            return Speed.Slow;
        } else if (delta < 10) {
            return Speed.Average;
        } else if (delta < 15) {
            return Speed.Fast;
        }

        return Speed.VeryFast;
    }
}
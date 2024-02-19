import cheerio from "cheerio";
import axios from "axios";
import {TorrentResult} from '../../../common/models/torrent-result.model'
import {TorrentNameDecoder} from "../utils/torrent-name-decoder.utils";
import {Speed} from "../../../common/enums/speeds.enum";
import {Providers} from "../../../common/enums/providers.enum";

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
            const fullName = $(el).children(':nth-child(2)').text().replace('\n', '').trim();
            const link = $(el).children(':nth-child(2)').children('a').attr()['href'];
            const fullAge = $(el).children(':nth-child(5)').text().replace('\n', '').trim().split(' ');
            const age = `${fullAge[1]} ${fullAge[2]}`
            const size = $(el).children(':nth-child(6)').text().replace('\n', '').trim();
            const completed = +$(el).children(':nth-child(7)').text().replace('\n', '').trim();
            const seeds = +$(el).children(':nth-child(8)').text().replace('\n', '').trim();
            const leechs = +$(el).children(':nth-child(9)').text().replace('\n', '').trim();

            const speed = this.getSpeed(seeds, leechs);

            let torrentResult: TorrentResult = {
                fullName,
                url: link,
                age,
                completed,
                seeds,
                leechs,
                size,
                speed,
            }

            TorrentNameDecoder.decodeTorrentName(torrentResult);

            results.push(torrentResult)
        })

        return results;
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
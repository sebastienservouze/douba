import Logger from "../../../common/utils/logger";
import cheerio from "cheerio";
import axios from "axios";
import { Torrent } from '../../../common/models/torrent.model'
import { TorrentNameDecoder } from "../utils/torrent-name-decoder.utils";

export class YggTorrentService {

    readonly googleSearchUrl = 'https://www.google.com/search?q=yggtorrent';
    yggTorrentUrl: string | null;

    /**
    * Scrap YggTorrent search page to retrieve torrents
    * @param terms
    */
    async findTorrents(terms: string): Promise<Torrent[]> {
        await this.findUrl();

        const response = await axios.get(`https://www.${this.yggTorrentUrl}/recherche/${terms}`, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36"
            }
        });

        const $ = cheerio.load(response.data);
        const results: Torrent[] = [];
        $('tbody tr').each((i, el) => {
            const line = $(el).text();
            results.push(TorrentNameDecoder.getTorrent(line))
        })

        return results;
    }

    /**
     * Scrap the twitter page to find the yggTorrent url.
     * @private
     */
    private async findUrl(): Promise<void> {
        const response = await axios.get(this.googleSearchUrl, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.54 Safari/537.36"
            }
        });

        const $ = cheerio.load(response.data);
        this.yggTorrentUrl = $('g-inner-card a').html();
        Logger.log(`Yggtorrent URL '${this.yggTorrentUrl}'`);

        return Promise.resolve();
    }
}
import puppeteer from "puppeteer";

export class YggTorrentService {

    readonly twitterUrl = 'https://twitter.com/yggtorrent_';

    /**
     * Scrap the twitter page to find the yggTorrent url
     * @private
     */
    private async findUrl(): Promise<string> {
        const browser = await puppeteer.launch()
        const page = await browser.newPage();
        await page.setUserAgent(
            "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36"
        )

        await page.goto(this.twitterUrl, {
            waitUntil: "networkidle2"
        });

        return await page
            .$$eval('span', elements => elements.filter((elem) => elem.innerText.startsWith('yggtorrent.')));
    }

    /**
     * Find movie torrents by title
     * @param title
     */
    async findMoviesByTitle(title: string): Promise<string> {
        return await this.findUrl();
    }

}
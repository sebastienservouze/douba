import { Torrent } from "../../../common/models/torrent.model";

export class TorrentNameDecoder {
    /**
     * Map Yggtorrent search result row to Torrent model.
     * @param line 
     * @returns 
     */
    public static getTorrent(line: string): Torrent {
        const splittedLine = line.split('\n');
        let fullTitle = splittedLine[1];

        const quality = this.getQuality(fullTitle);
        if (quality) {
            fullTitle = fullTitle.replace(new RegExp(quality, 'ig'), '',);
            if (quality === '4K') {
                fullTitle = fullTitle.replace(new RegExp('ULTRA HD', 'ig'), '');
            }
        }

        const language = this.getLanguage(fullTitle);
        if (language) {
            fullTitle = fullTitle.replace(new RegExp(language, 'ig'), '');
            fullTitle = fullTitle.replace(new RegExp('TRUEFRENCH|FRENCH', 'ig'), '');
        }

        const rip = this.getRip(fullTitle);
        if (rip) {
            fullTitle = fullTitle.replace(new RegExp(rip, 'ig'), '');
        }

        const year = this.getYear(fullTitle);
        if (year) {
            fullTitle = fullTitle.replace(year.toString(), '');
        }

        const codec = this.getCodec(fullTitle);
        if (codec) {
            fullTitle = fullTitle.replace(new RegExp(codec, 'ig'), '');
        }


        return {
            title: fullTitle.trim(),
            size: splittedLine[2],
            seeds: +splittedLine[3],
            leeches: +splittedLine[4],
            quality,
            language,
            rip,
            year,
        }
    }

    private static getQuality(fullTitle: string): string | undefined {
        const qualities = [
            '720P',
            '1080P',
            '2160P',
            '4K',
        ];

        let quality;
        qualities.forEach((q: string) => {
            if (fullTitle.toUpperCase().includes(q)) {
                quality = q;
            }
        })

        return quality;
    }

    private static getLanguage(fullTitle: string): string | undefined {
        const languages = [
            'FRENCH',
            'TRUEFRENCH',
            'VOSTFR',
            'MULTI'
        ];

        let language;
        languages.forEach((l: string) => {
            if (fullTitle.toUpperCase().includes(l)) {
                if (l === 'TRUEFRENCH' || l === 'FRENCH') {
                    language = 'VF'
                } else {
                    language = l;
                }
            }
        })

        return language;
    }

    private static getRip(fullTitle: string): string | undefined {
        const rips = [
            'BLURAY',
            'DVDRIP',
            'HDTV',
            'WEBRIP'
        ];

        let rip;
        rips.forEach((r: string) => {
            if (fullTitle.toUpperCase().includes(r)) {
                rip = r;
            }
        })

        return rip;
    }

    private static getYear(fullTitle: string): number | undefined {
        const yearRegExp = new RegExp(/(19|20)\d{2}/)
        const year = fullTitle.match(yearRegExp);
        if (year) {
            return +year[0];
        }

        return undefined;
    }

    private static getCodec(fullTitle: string): string | undefined {
        const codecs = [
            'X264',
            'X265',
        ];

        let codec;
        codecs.forEach((c: string) => {
            if (fullTitle.toUpperCase().includes(c)) {
                codec = c;
            }
        })

        return codec;
    }
}
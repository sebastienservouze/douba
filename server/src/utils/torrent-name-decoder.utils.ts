import { TorrentResult } from "../../../common/models/torrent-result.model";

export class TorrentNameDecoder {

    /**
     * Decode Torrent name to extract infos
     * @param line 
     * @returns 
     */
    public static decodeTorrentName(torrentResult: TorrentResult): void {
        torrentResult.quality = this.getQuality(torrentResult.fullName);
        torrentResult.language = this.getLanguage(torrentResult.fullName);
        torrentResult.rip = this.getRip(torrentResult.fullName);
        torrentResult.year = this.getYear(torrentResult.fullName);
        torrentResult.codec = this.getCodec(torrentResult.fullName);
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
            'VOST',
            'MULTI'
        ];

        let language;
        languages.forEach((l: string) => {
            if (fullTitle.toUpperCase().includes(l)) {
                if (l === 'TRUEFRENCH' || l === 'FRENCH') {
                    language = 'VF'
                } else if (l === 'VOST') {
                    language = 'VOSTFR'
                }
                else {
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
export class TorrentNameDecoder {

    public static getQuality(fullTitle: string): string | undefined {
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

    public static getLanguage(fullTitle: string): string | undefined {
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
}
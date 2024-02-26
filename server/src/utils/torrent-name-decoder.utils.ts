export class TorrentNameDecoder {

    /**
     * Get the quality of a torrent from its full title.
     * @param fullTitle
     */
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

    /**
     * Get the language of a torrent from its full title.
     * @param fullTitle
     */
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
export interface Torrent {
    title: string;
    seeds: number;
    leeches: number;
    size: string;
    codec?: string;
    language?: string;
    quality?: string;
    rip?: string;
    magnetLink?: string;
    year?: number;
}
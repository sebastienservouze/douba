import { Speed } from '../enums/speeds.enum'

export interface TorrentResult {
    fullName: string;
    completed: number;
    seeds: number;
    leechs: number;
    speed: Speed;
    age: string;
    size: string;
    url?: string;
    codec?: string;
    language?: string;
    quality?: string;
    rip?: string;
    year?: number;
}
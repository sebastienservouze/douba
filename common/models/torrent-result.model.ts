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
    language?: string;
    quality?: string;
}
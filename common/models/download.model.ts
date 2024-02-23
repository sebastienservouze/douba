export interface Download {
    hash: string;
    magnet: string;
    path: string;
    fileName: string;
    progress: number;
    remainingTime: string;
    downloadSpeed: string;
    downloaded: number;
    uploadSpeed: string;
    uploaded: number;
    totalSize: string;
    paused: boolean;
    alreadyDownloaded: boolean;
    quality?: string;
    language?: string;
}
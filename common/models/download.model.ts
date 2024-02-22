export interface Download {
    fileName: string;
    progress: number;
    remainingTime: number;
    downloadSpeed: string;
    uploadSpeed: string;
    totalSize: string;
    quality?: string;
    language?: string;
}
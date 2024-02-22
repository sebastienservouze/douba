export interface Download {
    fileName: string;
    progress: number;
    remainingTime: string;
    downloadSpeed: string;
    uploadSpeed: string;
    totalSize: string;
    quality?: string;
    language?: string;
}
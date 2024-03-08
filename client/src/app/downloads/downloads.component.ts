import {Component, OnDestroy, OnInit} from '@angular/core';
import {Download} from '../../../../common/models/download.model';
import {Subject, takeUntil} from 'rxjs';
import {WebSocketService} from "../services/web-socket.service";

@Component({
    selector: 'app-downloads',
    templateUrl: './downloads.component.html',
    styleUrls: ['./downloads.component.scss']
})
export class DownloadsComponent implements OnInit, OnDestroy {

    destroy$: Subject<void> = new Subject();
    downloads?: Download[]/* = [
		{
			downloadSpeed: '36.73 MB',
			fileName: "EUPHORIA.US.S01.MULTI.1080p.10.BITS.X265.WEBrip-Frosties",
			progress: 0.5636788357972967,
			remainingTime: '2min37',
			totalSize: "263.64 MB",
			uploadSpeed: "55.3 KB",
			language: 'MULTI',
			quality: '1080P'
		},
		{
			downloadSpeed: '36.73 MB',
			fileName: "EUPHORIA.US.S01.MULTI.1080p.10.BITS.X265.WEBrip-Frosties",
			progress: 1,
			remainingTime: '0s',
			totalSize: "263.64 MB",
			uploadSpeed: "55.3 KB",
			language: 'MULTI',
			quality: '1080P'
		}
	];*/

    constructor(private webSocketService: WebSocketService) {
    }

    ngOnInit(): void {
        this.webSocketService.listen<Download[]>()
            .pipe(takeUntil(this.destroy$))
            .subscribe((downloads: Download[]) => {
                this.downloads = downloads;
            });
    }

    ngOnDestroy(): void {
        this.destroy$.next();
    }
}

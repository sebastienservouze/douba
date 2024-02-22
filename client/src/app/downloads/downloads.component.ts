import { Component } from '@angular/core';
import { DownloadService } from '../services/download.service';
import { Download } from '../../../../common/models/download.model';

@Component({
	selector: 'app-downloads',
	templateUrl: './downloads.component.html',
	styleUrls: ['./downloads.component.scss']
})
export class DownloadsComponent {

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

	constructor(private downloadService: DownloadService) {
		this.downloadService.ws$.subscribe((downloads: Download[]) => {
			this.downloads = downloads;
		});
	}


}

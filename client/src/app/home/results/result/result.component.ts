import { Component, Input } from '@angular/core';
import { TorrentResult } from '../../../../../../common/models/torrent-result.model';
import * as Speed from '../../../../../../common/enums/speeds.enum';
import { YggTorrentService } from 'src/app/services/ygg-torrent.service';
import { DownloadService } from 'src/app/services/download.service';

@Component({
	selector: 'app-result',
	templateUrl: './result.component.html',
	styleUrls: ['./result.component.scss']
})
export class ResultComponent {

	@Input() result!: TorrentResult;

	Speed = (Speed as any).Speed;

  loading?: boolean;

	constructor(private yggTorrentService: YggTorrentService) { }

	onDownloadClicked() {
    this.yggTorrentService.download(this.result.id).subscribe();
	}
}

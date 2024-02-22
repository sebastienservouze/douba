import { Component, Input } from '@angular/core';
import { TorrentResult } from '../../../../../../common/models/torrent-result.model';
import * as Speed from '../../../../../../common/enums/speeds.enum';

@Component({
	selector: 'app-result',
	templateUrl: './result.component.html',
	styleUrls: ['./result.component.scss']
})
export class ResultComponent {

	@Input() result!: TorrentResult;

	Speed = (Speed as any).Speed;
}

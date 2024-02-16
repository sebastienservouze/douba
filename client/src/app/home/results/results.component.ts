import { Component, Input, OnInit } from '@angular/core';
import { TorrentResult } from '../../../../../common/models/torrent-result.model';

@Component({
	selector: 'app-results',
	templateUrl: './results.component.html',
	styleUrls: ['./results.component.scss']
})
export class ResultsComponent {

	@Input() results?: TorrentResult[];

}

import { Component, Input, OnInit } from '@angular/core';
import { Torrent } from '../../../../../common/models/torrent.model';

@Component({
	selector: 'app-results',
	templateUrl: './results.component.html',
	styleUrls: ['./results.component.scss']
})
export class ResultsComponent {

	@Input() results?: Torrent[];

}

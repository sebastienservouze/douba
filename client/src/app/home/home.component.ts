import { Component, OnInit } from '@angular/core';
import { TorrentResult } from '../../../../common/models/torrent-result.model';
import { RESULTS_MOCK } from './results/results.mock';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent {

	results?: TorrentResult[] = RESULTS_MOCK;

	onSearch(results: TorrentResult[]): void {
		this.results = results
	}

}

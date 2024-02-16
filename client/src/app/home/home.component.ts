import { Component, OnInit } from '@angular/core';
import { Torrent } from '../../../../common/models/torrent.model';
import { RESULTS_MOCK } from './results/results.mock';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent {

	results?: Torrent[] = [];

	onSearch(results: Torrent[]): void {
		this.results = results
	}

}

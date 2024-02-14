import { Component, OnInit } from '@angular/core';
import { Torrent } from '../../../../common/models/torrent.model';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent {

	results?: Torrent[] = [
		{
			title: 'Star Wars',
			leeches: 6,
			seeds: 21,
			size: '157 MB'
		},
		{
			title: 'Dune',
			leeches: 12,
			seeds: 44,
			size: '644 MB'
		}
	];

	onSearch(results: Torrent[]): void {
		this.results = results
	}

}

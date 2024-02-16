import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Providers } from '../../../../common/enums/providers.enum';

@Component({
	selector: 'app-torrent',
	templateUrl: './torrent.component.html',
	styleUrls: ['./torrent.component.scss']
})
export class TorrentComponent {

	url?: string;

	constructor(route: ActivatedRoute) {
		const link = route.snapshot.params['link'] as string;
		this.url = link.replace(/\|/g, '/');
	}

}

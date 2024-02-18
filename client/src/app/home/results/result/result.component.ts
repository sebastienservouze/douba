import { Component, Input } from '@angular/core';
import { TorrentResult } from '../../../../../../common/models/torrent-result.model';
import { Speed } from '../../../../../../common/enums/speeds.enum';
import { Providers } from '../../../../../../common/enums/providers.enum';
import { Router } from '@angular/router';

@Component({
	selector: 'app-result',
	templateUrl: './result.component.html',
	styleUrls: ['./result.component.scss']
})
export class ResultComponent {

	@Input() result!: TorrentResult;

	readonly Speed = Speed;

	constructor(private router: Router) { }

	onClick() {
		const pageUrl = this.result.url?.replace(/\//g, '|');
		this.router.navigate(['page', pageUrl]);
	}
}

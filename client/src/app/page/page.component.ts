import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Providers } from '../../../../common/enums/providers.enum';
import { YggTorrentService } from '../services/ygg-torrent.service';
import { TorrentPage } from '../../../../common/models/torrent-page.model';

@Component({
	selector: 'app-torrent',
	templateUrl: './page.component.html',
	styleUrls: ['./page.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class PageComponent {

	page?: TorrentPage;

	constructor(route: ActivatedRoute, service: YggTorrentService) {
		let url = route.snapshot.params['url'] as string;
		service.findPage(url).subscribe((result: TorrentPage) => {
			this.page = result;
		});
	}

}

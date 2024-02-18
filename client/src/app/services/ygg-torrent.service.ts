import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TorrentResult } from '../../../../common/models/torrent-result.model'
import { TorrentPage } from '../../../../common/models/torrent-page.model'

@Injectable({
	providedIn: 'root'
})
export class YggTorrentService {

	constructor(private httpClient: HttpClient) { }

	find(terms: string): Observable<TorrentResult[]> {
		if (!terms.length) return of([]);
		return this.httpClient.get<TorrentResult[]>(`http://localhost:3000/yggtorrent/${terms}`);
	}

	findPage(url: string): Observable<TorrentPage> {
		return this.httpClient.get<TorrentPage>(`http://localhost:3000/yggtorrent/page/${url}`);
	}

}

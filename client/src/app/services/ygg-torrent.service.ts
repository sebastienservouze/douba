import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Torrent } from '../../../../common/models/torrent.model'

@Injectable({
	providedIn: 'root'
})
export class YggTorrentService {

	constructor(private httpClient: HttpClient) { }

	findTorrents(terms: string): Observable<Torrent[]> {
		return this.httpClient.get<Torrent[]>(`http://localhost:3000/yggtorrent/${terms}`);
	}

}

import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {TorrentResult} from '../../../../common/models/torrent-result.model'
import {Config} from "../../../../config/config";

@Injectable({
    providedIn: 'root'
})
export class YggTorrentService {

    constructor(private httpClient: HttpClient) {
    }

    find(terms: string): Observable<TorrentResult[]> {
        if (!terms.length) return of([]);
        return this.httpClient.get<TorrentResult[]>(`http://localhost:${Config.apiPort}/yggtorrent/${terms}`);
    }

    download(id: number): Observable<void> {
        return this.httpClient.get<void>(`http://localhost:${Config.apiPort}/yggtorrent/download/${id}`);
    }

}

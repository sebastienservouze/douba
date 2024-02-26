import {Injectable} from '@angular/core';
import {WebSocketSubject} from 'rxjs/webSocket';
import {Download} from '../../../../common/models/download.model';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Config} from "../../../../config/config";


@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  private ws: WebSocketSubject<Download[]>

  ws$: Observable<Download[]>;

  constructor(private httpClient: HttpClient) {
    this.ws = new WebSocketSubject(`ws://localhost:${Config.wssPort}`);
    this.ws$ = this.ws.asObservable();
  }

  getAll(): Observable<Download[]> {
    return this.httpClient.get<Download[]>(`http://localhost:${Config.apiPort}/download/`);
  }
}

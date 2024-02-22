import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { Download } from '../../../../common/models/download.model';
import { Observable } from 'rxjs';


@Injectable({
	providedIn: 'root'
})
export class DownloadService {

	private ws: WebSocketSubject<Download[]>

	ws$: Observable<Download[]>;

	constructor() {
		this.ws = new WebSocketSubject(`ws://localhost:8080`);
		this.ws$ = this.ws.asObservable();
	}
}

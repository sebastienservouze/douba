import {Injectable} from '@angular/core';
import {WebSocketSubject} from "rxjs/webSocket";
import {Config} from "../../../../config/config";
import {Observable, of} from "rxjs";
import {Packet} from "../../../../common/models/packet.model";
import {Download} from "../../../../common/models/download.model";

@Injectable({
    providedIn: 'root'
})
export class WebSocketService {

    private ws: WebSocketSubject<Packet<any>>;

    constructor() {
        this.ws = new WebSocketSubject(`ws://localhost:${Config.wssPort}`);
        this.listen<Download>().subscribe(console.log);
    }

    listen<T>(): Observable<T> {
        // @ts-ignore
        const type = ({} as T).constructor.name;
        console.log(type);
        return of({} as T);
    }
}

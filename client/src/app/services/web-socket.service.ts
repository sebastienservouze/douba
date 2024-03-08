import {Injectable} from '@angular/core';
import {WebSocketSubject} from "rxjs/webSocket";
import {Config} from "../../../../config/config";
import {filter, map, Observable} from "rxjs";
import {Download} from "../../../../common/models/download.model";
import {Dummy} from "../../../../common/models/dummy.model";
import {Packet} from "../../../../common/models/packet.model";
import {PacketType} from "../../../../common/enums/packets.enum";

@Injectable({
    providedIn: 'root'
})
export class WebSocketService {

    private ws: WebSocketSubject<Packet<any>>;

    constructor() {
        this.ws = new WebSocketSubject(`ws://localhost:${Config.wssPort}`);
    }

    listen<T>(type: PacketType): Observable<T> {
        return this.ws.pipe(
            filter((packet: Packet<any>) => packet.type === type),
            map((packet: Packet<any>) => packet.payload as T)
        );
    }
}

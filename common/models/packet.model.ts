import {PacketType} from "../enums/packets.enum";

export class Packet<T> {

    type: PacketType;
    payload: T;

    constructor(type: PacketType, payload: T) {
        this.type = type;
        this.payload = payload;
    }

}
export class Packet<T> {

    data: T;

    constructor(data: T) {
        this.data = data;
    }
}
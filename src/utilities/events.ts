import { PacketType } from "packets/types/index.js";

type ReceivablePacket = { };
type Name = PacketType | 'connect' | 'disconnect';
type Callback = (data: ReceivablePacket) => void;

export class Events {
    private all: { name: Name, callback: Callback}[] = [];

    async on(name: Name, callback: Callback) {
        this.all.push({ name, callback });
    }

    fire(name: Name, data: ReceivablePacket = {}) {
        const events = this.all.filter((event) => event.name === name);
        if(events.length > 0) {
            for(const event of events) {
                event.callback(data);
            }
        }
    }
}
import { PacketType } from "packets/types/Packet.js";

type Name = PacketType | 'connect' | 'disconnect';
type Callback = (data: object) => void;

export class Events {
    private all: { name: Name, callback: Callback}[] = [];

    async on(name: Name, callback: Callback) {
        this.all.push({ name, callback });
    }

    fire(name: Name, data: object) {
        const events = this.all.filter((event) => event.name === name);
        if(events.length > 0) {
            for(const event of events) {
                event.callback(data);
            }
        }
    }
}
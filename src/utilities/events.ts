import { PacketType } from "../packets/types/index.js";

type Name = PacketType | 'connect' | 'disconnect' | 'connected' | 'global';
type Callback_1 = (data: any, name: Name) => void;
type Callback_2 = (name: Name, data: any) => void;

export class Events {
    private all: { name: Name, callback: Callback_1 | Callback_2}[] = [];

    on(name: Name | Callback_2, callback: Callback_1 | null = null) {
        if(typeof name == 'function') {
            this.all.push({ name: 'global', callback: name });
        }
        else {
            if(callback) {
                this.all.push({ name, callback });
            }
        }
    }

    fire(name: Name, data?: any) {
        const events = this.all.filter((event) => event.name === name || event.name === 'global');
        for(const event of events) {
            if(event.name === 'global') event.callback(name, data);
            else event.callback(data, event.name);
        }
    }
}
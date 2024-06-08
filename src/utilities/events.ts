import { PacketType } from "../packets/types/index.js";

type Name = PacketType | 'connect' | 'disconnect' | 'connected' | 'global';
type CallbackGlobal = (name: Name, data: any) => void;
type Callback = (data: any, name: Name ) => void;

export class Events {
    private all: { name: Name, callback: Callback | CallbackGlobal }[] = [];

    on(name: Name, callback: Callback) {
        this.all.push({ name, callback });
    }

    onGlobal(callback: CallbackGlobal) {
        this.all.push({ name: 'global', callback });
    }

    fire(name: Name, data?: any) {
        const events = this.all.filter((event) => event.name === name || event.name === 'global');
        for(const event of events) {
            if(event.name === 'global') event.callback(name, data);
            else event.callback(data, name);
        }
    }
}
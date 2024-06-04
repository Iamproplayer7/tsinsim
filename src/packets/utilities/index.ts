import { getFormat } from "packets/structs/decorators.js";
import { PacketPack } from './pack.js';
import { PacketType } from "packets/types/Packet.js";


export class Receivable {
    unpack(data: Uint8Array): this {
        return this;
    }
}

export class Sendable extends Receivable {
    Size: number = 0;
    Type: PacketType = 0;
    ReqI: number = 0;

    pack(): Uint8Array {
        const Size = Object.getOwnPropertyDescriptor(this, 'Size')?.value;
        if(!Size) {
            throw Error('Failed to pack(); ' + this.constructor.name + ' make sure there is Size property!');
        }

        const pack = new PacketPack(Size);
        for(const key of Object.getOwnPropertyNames(this)) {
            var value = Object.getOwnPropertyDescriptor(this, key)?.value;
            if(key == 'Size') {
                value /= 4;
            }

            const format = getFormat(this, key);
            if(format.type == 'byte') {
                pack.writeUInt8(value)
            }
            else if(format.type == 'word') {
                pack.writeUInt16(value)
            }
            else if(format.type == 'char') {
                pack.writeChar(value, format.length)
            }
        }
        
        return pack.buffer;
    }
}
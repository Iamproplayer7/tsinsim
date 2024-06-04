import { getFormat } from "packets/structs/decorators.js";
import { PacketPack } from "./pack.js";
import { PacketUnpack } from "./unpack.js";
import { PacketType } from "packets/types/index.js";

export class Receivable {
    unpack(data: Buffer): this {
        const unpack = new PacketUnpack(data);
        for(const key of Object.getOwnPropertyNames(this)) {
            const format = getFormat(this, key);

            var res: string | number = 0;
            if(key == 'Size') {
                res = unpack.readUInt8() * 4;
            }
            else if(format.type == 'byte') {
                res = unpack.readUInt8();
            }
            else if(format.type == 'word') {
                res = unpack.readUInt16();
            }
            else if(format.type == 'char') {
                res = unpack.readChar(format.length)
            }

            // something bad as f here: dont look :(
            Object.assign(this, { [key]: res });
        }

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
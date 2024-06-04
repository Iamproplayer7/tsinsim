import { getFormat } from "packets/structs/decorators.js";
import { PacketPack } from "./pack.js";
import { PacketUnpack } from "./unpack.js";
import { PacketType } from "packets/types/index.js";

export class Receivable {
    unpack(data: Buffer): this {
        const keys: string[] = Object.getOwnPropertyNames(this);
        const types: { type: string, length?: number }[] = keys.map((k) => getFormat(this, k));

        // something bad as f here: dont be like me do better :(
        Object.assign(this, { ...PacketUnpack(data, keys, types) });

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

        const keys = Object.getOwnPropertyNames(this);
        const values: string[] | number[] = keys.map((k) => {
            const value = Object.getOwnPropertyDescriptor(this, k)?.value; 
            return k == 'Size' ? value/4 : value;    
        });
        const types: { type: string, length?: number }[] = keys.map((k) => getFormat(this, k));
        
        return PacketPack(values, types);
    }
}
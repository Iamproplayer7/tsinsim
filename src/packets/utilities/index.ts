import { getFormat } from "./decorators.js";
import { PacketPack } from "./pack.js";
import { PacketUnpack } from "./unpack.js";
import { PacketType } from "../types/PacketType.js";

export class Receivable {
    unpack(data: Buffer): this {
        const keys: string[] = Object.getOwnPropertyNames(this);
        const types: { type: string, length: number }[] = keys.map((k) => getFormat(this, k));

        // something bad as f here: dont be like me do better :(
        Object.assign(this, { ...PacketUnpack(data, keys, types) });

        return this;
    }
}

export class Struct extends Receivable {
    pack(newSize: number = 0): Uint8Array {
        const keys = Object.getOwnPropertyNames(this);
        const values: string[] = keys.map((k) => {
            const value = Object.getOwnPropertyDescriptor(this, k)?.value; 
            return k == 'Size' ? value/4 : value;  
        });
        const types: { type: string, length: number }[] = keys.map((k) => getFormat(this, k)).filter((type) => type != undefined);
        
        return PacketPack(values, types, newSize);
    }
}

export abstract class Sendable extends Struct {
    abstract Size: number;
    abstract Type: PacketType;
    abstract ReqI: number;
}
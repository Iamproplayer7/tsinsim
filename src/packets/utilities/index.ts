import { getFormat } from "./decorators.js";
import { PacketPack } from "./pack.js";
import { PacketUnpack } from "./unpack.js";
import { PacketType } from "../types/PacketType.js";

export class Receivable {
    unpack(data: Buffer): this {
        const keys: string[] = Object.getOwnPropertyNames(this);
        const vk: { [key: string]: { value: string, type: string, length: number } } = {};
        for(const key of keys) {
            vk[key] = getFormat(this, key) || { type: '', length: 0 };
        };

        // something bad as f here: dont be like me do better :(
        Object.assign(this, { ...PacketUnpack(vk, data) });

        return this;
    }
}

export class Struct extends Receivable {
    pack(newSize: number = 0): Uint8Array {
        const keys = Object.getOwnPropertyNames(this);
        const vk: { [key: string]: { value: string, type: string, length: number } } = {};
        for(const key of keys) {
            const value = Object.getOwnPropertyDescriptor(this, key)?.value; 
            vk[key] = { value: (key == 'Size' ? value/4 : value), ...getFormat(this, key)  || { type: '', length: 0 } };
        }

        return PacketPack(vk, newSize);
    }
}

export abstract class Sendable extends Struct {
    abstract Size: number;
    abstract Type: PacketType;
    abstract ReqI: number;
}
import { Receivable, Sendable } from "./index.js";
import "reflect-metadata";

const key = Symbol("format");

export const char = (length: number) => {
    return Reflect.metadata(key, { type: 'char', length });
}

/* 1-byte unsigned integer */
export const byte = () => {
    return Reflect.metadata(key, { type: 'byte', length: 1 });
}

/* 2-byte unsigned integer */
export const word = () => {
    return Reflect.metadata(key, { type: 'word', length: 2 });
}

/* 2-byte signed integer */
export const short = () => {
    return Reflect.metadata(key, { type: 'short', length: 2 });
}

/* 4-byte unsigned integer */
export const unsigned = () => {
    return Reflect.metadata(key, { type: 'unsigned', length: 4 });
}

/* 4-byte signed integer */
export const int = () => {
    return Reflect.metadata(key, { type: 'int', length: 4 });
}

/* 4-byte float */
export const float = () => {
    return Reflect.metadata(key, { type: 'float', length: 4 });
}

export const getFormat = (target: any, propertyKey: string) => {
    return Reflect.getMetadata(key, target, propertyKey);
}

class PacketHandler {
    all: { [name: string]: new() => Sendable | Receivable } = {};

    set(constructor: new() => Sendable | Receivable) {
        this.all[constructor.name.replace('IS_', 'ISP_')] = constructor;
    }

    get(name: string) {
        return this.all[name];
    }
}

export const Packets = new PacketHandler;

export const define = (constructor: new() => Sendable | Receivable) => {
    Packets.set(constructor);
}
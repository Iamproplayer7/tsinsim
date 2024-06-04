import { Receivable, Sendable } from "packets/utilities/index.js";
import "reflect-metadata";

const key = Symbol("format");

export const char = (length: number) => {
    return Reflect.metadata(key, { type: 'char', length });
}

/* 1-byte unsigned integer */
export const byte = () => {
    return Reflect.metadata(key, { type: 'byte' });
}

/* 2-byte unsigned integer */
export const word = () => {
    return Reflect.metadata(key, { type: 'word' });
}

/* 2-byte signed integer */
export const short = () => {
    return Reflect.metadata(key, { type: 'short' });
}

/* 4-byte unsigned integer */
export const unsigned = () => {
    return Reflect.metadata(key, { type: 'unsigned' });
}

/* 4-byte signed integer */
export const int = () => {
    return Reflect.metadata(key, { type: 'int' });
}

/* 4-byte float */
export const float = () => {
    return Reflect.metadata(key, { type: 'float' });
}

export const getFormat = (target: any, propertyKey: string) => {
    return Reflect.getMetadata(key, target, propertyKey);
}

class PacketHandler {
    all: { [name: string]: new() => Sendable | Receivable } = {};

    set(constructor: new() => Sendable | Receivable) {
        var name = constructor.name;
        const nameArr = name.split('_');
        nameArr[0] += 'P';
        name = nameArr.join('_');

        this.all[name] = constructor;
    }

    get(name: string) {
        return this.all[name];
    }
}

export const Packets = new PacketHandler;

export const define = (constructor: new() => Sendable | Receivable) => {
    Packets.set(constructor);
}
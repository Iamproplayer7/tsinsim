import "reflect-metadata";

const key = Symbol("format");

export const char = (length: number) => {
    return Reflect.metadata(key, { type: 'char', length });
}

export const byte = () => {
    return Reflect.metadata(key, { type: 'byte' });
}

export const word = () => {
    return Reflect.metadata(key, { type: 'word' });
}

export const getFormat = (target: any, propertyKey: string) => {
    return Reflect.getMetadata(key, target, propertyKey);
}


class PacketHandler {
    all: { [name: string]: Function } = {};

    set(constructor: Function) {
        var name = constructor.name;
        const nameArr = name.split('_');
        nameArr[0] += 'P';
        name = nameArr.join('_');

        this.all[name] = constructor;
    }

    get(name: string): Function {
        return this.all[name];
    }
}

export const Packets = new PacketHandler;

export const define = (constructor: Function) => {
    Packets.set(constructor);
}
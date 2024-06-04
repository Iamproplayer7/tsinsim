export const PacketPack = (values: string[] | number[], types: { type: string, length?: number }[], newSize?: number): Uint8Array => {
    const buffer: Buffer = Buffer.alloc(values[0] as number * 4);

    var offset: number = 0;
    values.forEach((value, key) => {
        if(!types[key]) return;
        
        const type = types[key].type;
        const length = types[key].length ?? 0;

        if(typeof value == 'number') {
            if(type == 'byte') {
                buffer.writeUInt8(newSize && key == 0 ? newSize/4 : value, offset);
                offset += 1;
            }
            else if(type == 'word') {
                buffer.writeUInt16LE(value, offset);
                offset += 2;
            }
            else if(type == 'short') {
                buffer.writeInt16LE(value, offset);
                offset += 2;
            }
            else if(type == 'int') {
                buffer.writeInt32LE(value, offset);
                offset += 4;
            }
            else if(type == 'unsigned') {
                buffer.writeUInt32LE(value, offset);
                offset += 4;
            }
            else if(type == 'float') {
                buffer.writeFloatLE(value, offset);
                offset += 4;
            }
        }
        else {
            if(type == 'char') {
                value = value.slice(0, length);
        
                for(var i = 0; i < value.length; i++) {
                    buffer.writeUInt8(value.charCodeAt(i), offset);
                    offset += 1;
                }

                offset += length - value.length;
            }
        }
    })

    return buffer;
}
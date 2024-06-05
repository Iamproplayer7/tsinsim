export const PacketPack = (values: string[], types: { type: string, length: number }[], newSize: number = 0): Uint8Array => {
    const sizeExperimental = types.map((type) => type.length).reduce((sum, current) => sum + current, 0);
    const buffer: Buffer = Buffer.alloc(sizeExperimental);

    var offset: number = 0;
    values.forEach((value, key) => {
        if(!types[key]) return;
        
        const type = types[key].type;
        const length = types[key].length;

        if(typeof value == 'number') {
            if(type == 'byte') {
                buffer.writeUInt8(newSize && key == 0 ? newSize/4 : value, offset);
            }
            else if(type == 'word') {
                buffer.writeUInt16LE(value, offset);
            }
            else if(type == 'short') {
                buffer.writeInt16LE(value, offset);
            }
            else if(type == 'int') {
                buffer.writeInt32LE(value, offset);
            }
            else if(type == 'unsigned') {
                buffer.writeUInt32LE(value, offset);
            }
            else if(type == 'float') {
                buffer.writeFloatLE(value, offset);
            }
        }
        else {
            if(type == 'char') {
                value = value.slice(0, length);
        
                for(var i = 0; i < value.length; i++) {
                    buffer.writeUInt8(value.charCodeAt(i), offset);
                    offset += 1;
                }
            }
        }

        offset += type == 'char' ? length - value.slice(0, length).length : length;
    })

    return buffer;
}
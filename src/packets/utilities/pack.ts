export const PacketPack = (vk: { [key: string]: { value: string, type: string, length: number } }, newSize: number = 0): Uint8Array => {
    const bufferLength = Object.values(vk).map((v) => v.length).reduce((sum, current) => sum + current, 0);
    const buffer: Buffer = Buffer.alloc(bufferLength);

    var offset: number = 0;
    for(const key of Object.keys(vk)) {
        var value = vk[key].value;
        const type = vk[key].type;
        const length = vk[key].length;
        
        if(typeof value == 'number') {
            if(type == 'byte') {
                buffer.writeUInt8((newSize && key == 'Size' ? newSize/4 : value), offset);
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
            else if(type == 'vector') {
                buffer.writeFloatLE(value, offset);
                buffer.writeFloatLE(value, offset+4);
                buffer.writeFloatLE(value, offset+8);
            }
            else if(type == 'vec') {
                buffer.writeInt32LE(value, offset);
                buffer.writeInt32LE(value, offset+4);
                buffer.writeInt32LE(value, offset+8);
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
    }
    
    return buffer;
}
import parseLFSMessage from 'parse-lfs-message';

export const PacketUnpack = (buffer: Buffer, keys: string[], types: { type: string, length: number }[]): { [key: string]: string | number } => {
    const data: { [key: string]: string | number } = {};

    var offset: number = 0;
    keys.forEach((value, key) => {
        if(!types[key]) return;

        const type = types[key].type;
        const length = types[key].length;

        if(type != 'char') {
            if(type == 'byte') {
                data[value] = buffer.readUInt8(offset);
            }
            else if(type == 'word') {
                data[value] = buffer.readUInt16LE(offset);
            }
            else if(type == 'short') {
                data[value] = buffer.readInt16LE(offset);
            }
            else if(type == 'int') {
                data[value] = buffer.readInt32LE(offset);
            }
            else if(type == 'unsigned') {
                data[value] = buffer.readUInt32LE(offset);
            }
            else if(type == 'float') {
                data[value] = buffer.readFloatLE(offset);
            }
        }
        else {
            if(type == 'char') {
                data[value] = parseLFSMessage(buffer.subarray(offset, offset + length));
            }
        }

        offset += length;
    })

    return data;
}
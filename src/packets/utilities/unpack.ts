import parseLFSMessage from 'parse-lfs-message';

export const PacketUnpack = (buffer: Buffer, keys: string[], types: { type: string, length?: number }[]): { [key: string]: string | number } => {
    const data: { [key: string]: string | number } = {};

    var offset: number = 0;
    keys.forEach((value, key) => {
        const type = types[key].type;
        const length = types[key].length ?? 0;

        if(type != 'char') {
            if(type == 'byte') {
                data[value] = buffer.readUInt8(offset);
                offset += 1;
            }
            else if(type == 'word') {
                data[value] = buffer.readUInt16LE(offset);
                offset += 2;
            }
            else if(type == 'short') {
                data[value] = buffer.readInt16LE(offset);
                offset += 2;
            }
            else if(type == 'int') {
                buffer.readInt32LE(offset);
                offset += 4;
            }
            else if(type == 'unsigned') {
                data[value] = buffer.readUInt32LE(offset);
                offset += 4;
            }
            else if(type == 'float') {
                data[value] = buffer.readFloatLE(offset);
                offset += 4;
            }
        }
        else {
            if(type == 'char') {
                data[value] = parseLFSMessage(buffer.subarray(offset, offset + length));
                offset += length;
            }
        }
    })

    return data;
}
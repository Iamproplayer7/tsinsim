import parseLFSMessage from 'parse-lfs-message';
import { Vector3 } from '../../utilities/vector.js';

export const PacketUnpack = (vk: { [key: string]: { value: string, type: string, length: number } }, buffer: Buffer): { [key: string]: string | number | Vector3 } => {
    const data: { [key: string]: string | number | Vector3 } = {};

    var offset: number = 0;
    for(const key of Object.keys(vk)) {
        const type = vk[key].type;
        const length = vk[key].length;

        if(type != 'char') {
            if(type == 'byte') {
                data[key] = buffer.readUInt8(offset);
            }
            else if(type == 'word') {
                data[key] = buffer.readUInt16LE(offset);
            }
            else if(type == 'short') {
                data[key] = buffer.readInt16LE(offset);
            }
            else if(type == 'int') {
                data[key] = buffer.readInt32LE(offset);
            }
            else if(type == 'unsigned') {
                data[key] = buffer.readUInt32LE(offset);
            }
            else if(type == 'float') {
                data[key] = buffer.readFloatLE(offset);
            }
            else if(type == 'vector') {
                data[key] = new Vector3(buffer.readFloatLE(offset), buffer.readFloatLE(offset+4), buffer.readFloatLE(offset+8));
            }
            else if(type == 'vec') {
                data[key] = new Vector3(buffer.readInt32LE(offset), buffer.readInt32LE(offset+4), buffer.readInt32LE(offset+8));
            }
        }
        else {
            if(type == 'char') {
                data[key] = parseLFSMessage(buffer.subarray(offset, offset + length));
            }
        }

        offset += length;
    }

    return data;
}
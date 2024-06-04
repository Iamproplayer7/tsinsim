import parseLFSMessage from 'parse-lfs-message';

export class PacketUnpack {
    offset: number = 0;

    constructor(public buffer: Buffer) {}

    readUInt8(): number {
        const ret = this.buffer.readUInt8(this.offset);
        this.offset += 1;
        return ret;
    }

    readUInt16(): number {
        const ret = this.buffer.readUInt16LE(this.offset);
        this.offset += 2;
        return ret;
    }

    readChar(length: number = 0): string {
        const ret = parseLFSMessage(this.buffer.subarray(this.offset, this.offset + length));
        this.offset += length;
        return ret;
    }
}
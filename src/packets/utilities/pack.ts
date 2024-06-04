export class PacketPack {
    buffer!: Buffer;
    offset: number = 0;

    constructor(length: number) {
        this.buffer = Buffer.alloc(length);
    }

    writeUInt8(value: number): void {
        this.buffer.writeUInt8(value, this.offset);
        this.offset += 1;
    }

    writeUInt16(value: number): void {
        this.buffer.writeUInt16LE(value, this.offset);
        this.offset += 2;
    }

    writeChar(text: string, length: number = 0) {
        text = text.slice(0, length);
        
        for(var i = 0; i < text.length; i++) {
            this.writeUInt8(text.charCodeAt(i));
        }

        this.offset += length - text.length;
    }
}
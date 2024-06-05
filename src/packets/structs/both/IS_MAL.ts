import { Sendable } from "../../utilities/index.js";
import { define, byte } from "../../utilities/decorators.js";
import { PacketType } from "../../types/PacketType.js";

@define
export class IS_MAL extends Sendable {
    constructor(options: Partial<IS_MAL> = {}) { 
        super(); 
        Object.assign(this, options);
    }

    @byte() Size = 8;
    @byte() readonly Type = PacketType.ISP_MAL;
    @byte() readonly ReqI = 0;
    @byte() NumM = 0;

    @byte() UCID = 0;
    @byte() private readonly Flags = 0;
    @byte() private readonly Sp2 = 0;
    @byte() private readonly Sp3 = 0;

    SkinID: string[] = [];

    pack(): Uint8Array {
        // limit for now
        this.SkinID = this.SkinID.slice(0, 120).filter(s => s.length == 6);

        this.NumM = this.SkinID.length;

        var buffer = super.pack(this.Size + this.SkinID.length * 4);
        for(const id of this.SkinID) {
            buffer = Buffer.concat([buffer, Buffer.from('00' + id, 'hex').reverse()]);
        }

        return buffer;
    }

    unpack(data: Buffer): this {
        super.unpack(data);

        const buf = data.subarray(8, data.length);
        for(var i = 0; i < (data.length-8)/4; i++) {
            const mbuf = buf.subarray(i*4, i*4+4).reverse().subarray(1, 4).toString('hex');
            this.SkinID.push(mbuf);
        }
        
        return this;
    }
}
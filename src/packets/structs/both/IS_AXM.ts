import { Sendable } from "../../utilities/index.js";
import { define, byte } from "../../utilities/decorators.js";
import { PacketType } from "../../types/PacketType.js";
import { PMOAction, PMOFlags } from "../../enums/index.js";
import { ObjectInfo } from "../ObjectInfo.js";

@define
export class IS_AXM extends Sendable {
    constructor(options: Omit<Partial<IS_AXM>, "pack"> = {}) { 
        super(); 
        Object.assign(this, options);
    }
    
    @byte() readonly Size = 8;
    @byte() readonly Type = PacketType.ISP_AXM;
    @byte() readonly ReqI = 0;
    @byte() NumO = 0;

    @byte() UCID = 0;
    @byte() PMOAction: PMOAction = 0;
    @byte() PMOFlags: PMOFlags | 0 = 0;
    @byte() private readonly Sp3 = 0;

    Info: ObjectInfo[] = [];

    pack(): Uint8Array {
        this.NumO = this.Info.length > 60 ? 60 : this.Info.length;

        var buffer = super.pack(this.Size + this.Info.length * 8);
        for(const item of this.Info.slice(0, 60)) {
            buffer = Buffer.concat([buffer, item.pack()]);
        }

        return buffer;
    }

    unpack(data: Buffer): this {
        super.unpack(data);

        for(var i = 0; i < this.NumO; i++) {
            const start = 8 + 8 * i;
            this.Info.push(new ObjectInfo().unpack(data.subarray(start, start + 8)));
        }
    
        return this;
    }
}
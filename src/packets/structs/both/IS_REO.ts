import { Sendable } from "packets/utilities/index.js";
import { define, byte } from "packets/utilities/decorators.js";
import { PacketType } from "packets/types/PacketType.js";

@define
export class IS_REO extends Sendable {
    constructor(options?: {}) { 
        super(); 
        Object.assign(this, options);
    }
    
    @byte() readonly Size = 4;
    @byte() readonly Type = PacketType.ISP_REO;
    @byte() ReqI = 0;
    @byte() NumP = 0;

    PLID: number[] = [];

    unpack(data: Buffer): this {
        super.unpack(data);

        this.PLID = [...data.subarray(4, data.length)];
    
        return this;
    }
}
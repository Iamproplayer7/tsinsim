import { Sendable } from "packets/utilities/index.js";
import { define, byte } from "packets/utilities/decorators.js";
import { PacketType } from "packets/types/PacketType.js";
import { PlayerHCap } from "../PlayerHCap.js";

@define
export class IS_PLH extends Sendable {
    constructor(options?: {}) { 
        super(); 
        Object.assign(this, options);
    }
    
    @byte() readonly Size = 4;
    @byte() readonly Type = PacketType.ISP_PLH;
    @byte() readonly ReqI = 0;
    @byte() NumP = 0;

    HCaps: PlayerHCap[] = [];

    unpack(data: Buffer): this {
        super.unpack(data);

        for(var i = 0; i < this.NumP; i++) {
            const start = 4 + 4 * i;
            this.HCaps.push(new PlayerHCap().unpack(data.subarray(start, start + 4)));
        }

        return this;
    }
}
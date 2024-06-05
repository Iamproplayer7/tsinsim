import { Sendable } from "packets/utilities/index.js";
import { define, byte } from "packets/utilities/decorators.js";
import { PacketType } from "packets/types/PacketType.js";
import { TTCType } from "packets/enums/index.js";

@define
export class IS_TTC extends Sendable {
    constructor(options?: {}) { 
        super(); 
        Object.assign(this, options);
    }
    
    @byte() readonly Size = 8;
    @byte() readonly Type = PacketType.ISP_TTC;
    @byte() readonly ReqI = 0;
    @byte() SubT: TTCType = 0;

    @byte() UCID = 0;
    @byte() B1 = 0;
    @byte() B2 = 0;
    @byte() B3 = 0;
}
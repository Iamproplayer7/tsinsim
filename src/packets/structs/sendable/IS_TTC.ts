import { Sendable } from "../../utilities/index.js";
import { define, byte } from "../../utilities/decorators.js";
import { PacketType } from "../../types/PacketType.js";
import { TTCType } from "../../enums/index.js";

@define
export class IS_TTC extends Sendable {
    constructor(options: Partial<IS_TTC> = {}) { 
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
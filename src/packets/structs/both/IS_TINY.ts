import { Sendable } from "packets/utilities/index.js";
import { define, byte } from "packets/utilities/decorators.js";
import { PacketType } from "packets/types/PacketType.js";

@define
export class IS_TINY extends Sendable {
    constructor(options?: {}) { 
        super(); 
        Object.assign(this, options);
    }

    @byte() readonly Size = 4;
    @byte() readonly Type = PacketType.ISP_TINY;
    @byte() ReqI = 0;
    @byte() SubT = 0;
}
import { Sendable } from "../../utilities/index.js";
import { define, byte } from "../../utilities/decorators.js";
import { PacketType } from "../../types/PacketType.js";

@define
export class IS_TINY extends Sendable {
    constructor(options: Omit<Partial<IS_TINY>, "pack"> = {}) { 
        super(); 
        Object.assign(this, options);
    }

    @byte() readonly Size = 4;
    @byte() readonly Type = PacketType.ISP_TINY;
    @byte() ReqI = 0;
    @byte() SubT = 0;
}
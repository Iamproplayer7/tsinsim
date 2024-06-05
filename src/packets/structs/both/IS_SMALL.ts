import { Sendable } from "../../utilities/index.js";
import { define, byte, unsigned } from "../../utilities/decorators.js";
import { PacketType } from "../../types/PacketType.js";
import { SmallType } from "../../enums/SmallType.js";

@define
export class IS_SMALL extends Sendable {
    constructor(options: Partial<IS_SMALL> = {}) { 
        super(); 
        Object.assign(this, options);
    }

    @byte() readonly Size = 5;
    @byte() readonly Type = PacketType.ISP_SMALL;
    @byte() ReqI = 0;
    @byte() SubT: SmallType = SmallType.SMALL_NONE;

    @unsigned() UVal = 0;
}
import { Sendable } from "../../utilities/index.js";
import { define, byte } from "../../utilities/decorators.js";
import { PacketType } from "../../types/PacketType.js";

@define
export class IS_SCH extends Sendable {
    constructor(options: Partial<IS_SCH> = {}) { 
        super(); 
        Object.assign(this, options);
    }

    @byte() readonly Size = 8;
    @byte() readonly Type = PacketType.ISP_SCH;
    @byte() readonly ReqI = 0;
    @byte() readonly Zero = 0;

    @byte() CharB = 0;
    @byte() Flags: 0 | 1 = 0;
    @byte() private readonly Spare2 = 0;
    @byte() private readonly Spare3 = 0;
}
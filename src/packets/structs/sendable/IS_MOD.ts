import { Sendable } from "@app/packets/utilities/index.js";
import { define, byte, int } from "@app/packets/utilities/decorators.js";
import { PacketType } from "@app/packets/types/PacketType.js";

@define
export class IS_MOD extends Sendable {
    constructor(options?: {}) { 
        super(); 
        Object.assign(this, options);
    }

    @byte() readonly Size = 68;
    @byte() readonly Type = PacketType.ISP_MOD;
    @byte() readonly ReqI = 0;
    @byte() readonly Zero = 0;

    @int() Bits16 = 0;
    @int() RR = 0;
    @int() Width = 0;
    @int() Height = 0;
}
import { Sendable } from "../../utilities/index.js";
import { define, byte, int } from "../../utilities/decorators.js";
import { PacketType } from "../../types/PacketType.js";

@define
export class IS_MOD extends Sendable {
    constructor(options: Omit<Partial<IS_MOD>, "pack"> = {}) { 
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
import { Sendable } from "@app/packets/utilities/index.js";
import { define, byte, unsigned } from "@app/packets/utilities/decorators.js";
import { PacketType } from "@app/packets/types/PacketType.js";
import { CarFlags } from "@app/packets/enums/CarFlags.js";

@define
export class IS_PLC extends Sendable {
    constructor(options?: {}) { 
        super(); 
        Object.assign(this, options);
    }
    
    @byte() readonly Size = 12;
    @byte() readonly Type = PacketType.ISP_PLC;
    @byte() readonly ReqI = 0;
    @byte() readonly Zero = 0;

    @unsigned() Cars: CarFlags = 0;
}
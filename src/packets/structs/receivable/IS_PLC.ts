import { Sendable } from "../../utilities/index.js";
import { define, byte, unsigned } from "../../utilities/decorators.js";
import { PacketType } from "../../types/PacketType.js";
import { CarFlags } from "../../enums/CarFlags.js";

@define
export class IS_PLC extends Sendable {
    constructor(options: Partial<IS_BTN> = {}) { 
        super(); 
        Object.assign(this, options);
    }
    
    @byte() readonly Size = 12;
    @byte() readonly Type = PacketType.ISP_PLC;
    @byte() readonly ReqI = 0;
    @byte() readonly Zero = 0;

    @unsigned() Cars: CarFlags = 0;
}
import { Sendable } from "../../utilities/index.js";
import { define, byte, unsigned } from "../../utilities/decorators.js";
import { PacketType } from "../../types/PacketType.js";
import { CarFlags } from "../../enums/CarFlags.js";

@define
export class IS_PLC extends Sendable {
    constructor(options: Omit<Partial<IS_PLC>, "pack"> = {}) { 
        super(); 
        Object.assign(this, options);
    }
    
    @byte() readonly Size = 12;
    @byte() readonly Type = PacketType.ISP_PLC;
    @byte() readonly ReqI = 0;
    @byte() readonly Zero = 0;

    @byte() UCID = 0;
    @byte() readonly Sp1 = 0;
    @byte() readonly Sp2 = 0;
    @byte() readonly Sp3 = 0;

    @unsigned() Cars: CarFlags = 0;
}
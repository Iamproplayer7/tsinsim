import { Sendable } from "../../utilities/index.js";
import { define, byte } from "../../utilities/decorators.js";
import { PacketType } from "../../types/PacketType.js";
import { OCOAction, ObjectIndex } from "../../enums/index.js";

@define
export class IS_OCO extends Sendable {
    constructor(options?: {}) { 
        super(); 
        Object.assign(this, options);
    }
    
    @byte() readonly Size = 8;
    @byte() readonly Type = PacketType.ISP_OCO;
    @byte() readonly ReqI = 0;
    @byte() readonly Zero = 0;

    @byte() OCOAction: OCOAction = 0;
    @byte() Index: ObjectIndex = 0;
    @byte() Identifier = 0;
    @byte() Data = 0;
}
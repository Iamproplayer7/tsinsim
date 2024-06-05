import { Sendable } from "@app/packets/utilities/index.js";
import { define, byte } from "@app/packets/utilities/decorators.js";
import { PacketType } from "@app/packets/types/PacketType.js";
import { OCOAction, ObjectIndex } from "@app/packets/enums/index.js";

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
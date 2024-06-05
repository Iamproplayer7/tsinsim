import { Sendable } from "@app/packets/utilities/index.js";
import { define, byte } from "@app/packets/utilities/decorators.js";
import { PacketType } from "@app/packets/types/PacketType.js";

@define
export class IS_BFN extends Sendable {
    constructor(options?: {}) { 
        super(); 
        Object.assign(this, options);
    }

    @byte() readonly Size = 8;
    @byte() readonly Type = PacketType.ISP_BFN;
    @byte() readonly ReqI = 0;
    @byte() readonly Zero = 0;

    @byte() UCID = 0;
    @byte() ClickID = 0;
    @byte() ClickMAX = 0;
    @byte() Inst = 0;
}
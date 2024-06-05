import { Sendable } from "@app/packets/utilities/index.js";
import { define, byte, char } from "@app/packets/utilities/decorators.js";
import { PacketType } from "@app/packets/types/PacketType.js";

@define
export class IS_MST extends Sendable {
    constructor(options?: {}) { 
        super(); 
        Object.assign(this, options);
    }

    @byte() readonly Size = 68;
    @byte() readonly Type = PacketType.ISP_MST;
    @byte() readonly ReqI = 0;
    @byte() readonly Zero = 0;

    @char(64) Msg = 0;
}
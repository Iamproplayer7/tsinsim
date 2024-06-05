import { Sendable } from "packets/utilities/index.js";
import { define, byte, char } from "packets/utilities/decorators.js";
import { PacketType } from "packets/types/PacketType.js";

@define
export class IS_MSX extends Sendable {
    constructor(options?: {}) { 
        super(); 
        Object.assign(this, options);
    }

    @byte() readonly Size = 100;
    @byte() readonly Type = PacketType.ISP_MSX;
    @byte() readonly ReqI = 0;
    @byte() readonly Zero = 0;

    @char(95) Msg = 0;

    // last byte must be zero
    @byte() readonly ZeroByte = 0;
}
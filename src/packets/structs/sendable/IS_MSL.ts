import { Sendable } from "packets/utilities/index.js";
import { define, byte, char } from "packets/utilities/decorators.js";
import { PacketType } from "packets/types/PacketType.js";
import { MessageSound } from "packets/enums/MessageSound.js";

@define
export class IS_MSL extends Sendable {
    constructor(options?: {}) { 
        super(); 
        Object.assign(this, options);
    }

    @byte() readonly Size = 100;
    @byte() readonly Type = PacketType.ISP_MSL;
    @byte() readonly ReqI = 0;
    @byte() Sound: MessageSound = 0;

    @char(128) Msg = 0;

    // last byte must be zero
    @byte() readonly ZeroByte = 0;
}
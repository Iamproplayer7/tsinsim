import { Sendable } from "../../utilities/index.js";
import { define, byte, char } from "../../utilities/decorators.js";
import { PacketType } from "../../types/PacketType.js";

@define
export class IS_MSX extends Sendable {
    constructor(options: Omit<Partial<IS_MSX>, "pack"> = {}) { 
        super(); 
        Object.assign(this, options);
    }

    @byte() readonly Size = 100;
    @byte() readonly Type = PacketType.ISP_MSX;
    @byte() ReqI = 0;
    @byte() readonly Zero = 0;

    @char(95) Msg = 0;

    // last byte must be zero
    @byte() readonly ZeroByte = 0;
}
import { Sendable } from "../../utilities/index.js";
import { define, byte, char } from "../../utilities/decorators.js";
import { PacketType } from "../../types/PacketType.js";
import unicodeToLfs from "unicode-to-lfs";

@define
export class IS_MST extends Sendable {
    constructor(options: Omit<Partial<IS_MST>, "pack"> = {}) { 
        super(); 
        Object.assign(this, options);
    }

    @byte() readonly Size = 68;
    @byte() readonly Type = PacketType.ISP_MST;
    @byte() readonly ReqI = 0;
    @byte() readonly Zero = 0;

    @char(64) Msg = '';

    pack(): Uint8Array { 
        this.Msg = unicodeToLfs(this.Msg);
       
        return super.pack();
    }
}
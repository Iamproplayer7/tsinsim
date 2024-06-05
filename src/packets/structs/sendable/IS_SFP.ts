import { Sendable } from "../../utilities/index.js";
import { define, byte, word } from "../../utilities/decorators.js";
import { PacketType } from "../../types/PacketType.js";
import { StateFlags } from "../../enums/StateFlags.js";

@define
export class IS_SFP extends Sendable {
    constructor(options?: {}) { 
        super(); 
        Object.assign(this, options);
    }

    @byte() readonly Size = 8;
    @byte() readonly Type = PacketType.ISP_SFP;
    @byte() readonly ReqI = 0;
    @byte() readonly Zero = 0;

    @word() Flag = 0;
    @byte() OffOn: 
            StateFlags.ISS_SHIFTU_NO_OPT 
        |   StateFlags.ISS_SHOW_2D 
        |   StateFlags.ISS_MPSPEEDUP
        |   StateFlags.ISS_SOUND_MUTE | 0 = 0;
    @byte() private readonly Spare3 = 0;
}
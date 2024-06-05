import { Sendable } from "@app/packets/utilities/index.js";
import { define, byte, word } from "@app/packets/utilities/decorators.js";
import { PacketType } from "@app/packets/types/PacketType.js";
import { StateFlags } from "@app/packets/enums/StateFlags.js";

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
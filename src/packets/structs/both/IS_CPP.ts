import { Sendable } from "../../utilities/index.js";
import { define, byte, word, int, float } from "../../utilities/decorators.js";
import { PacketType } from "../../types/PacketType.js";
import { ViewIdentifier } from "../../enums/ViewIdentifier.js";
import { StateFlags } from "../../enums/StateFlags.js";

@define
export class IS_CPP extends Sendable {
    constructor(options?: {}) { 
        super(); 
        Object.assign(this, options);
    }

    @byte() readonly Size = 32;
    @byte() readonly Type = PacketType.ISP_CPP;
    @byte() readonly ReqI = 0;
    @byte() readonly Zero = 0;

    // 3x int = vec as in InSim.h
    @int() X = 0;
    @int() Y = 0;
    @int() Z = 0;
    
    @word() H = 0;
    @word() P = 0;
    @word() R = 0;

    @byte() ViewPlid = 0;
    @byte() InGameCam: ViewIdentifier = 0;

    @float() FOV = 0;

    @word() Time = 0;
    @word() Flags: 
        | StateFlags.ISS_SHIFTU
        | StateFlags.ISS_SHIFTU_FOLLOW
        | StateFlags.ISS_VIEW_OVERRIDE | 0 = 0;
}
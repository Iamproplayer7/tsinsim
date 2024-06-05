import { Sendable } from "packets/utilities/index.js";
import { define, byte } from "packets/utilities/decorators.js";
import { PacketType } from "packets/types/PacketType.js";
import { ViewIdentifier } from "packets/enums/ViewIdentifier.js";

@define
export class IS_SCC extends Sendable {
    constructor(options?: {}) { 
        super(); 
        Object.assign(this, options);
    }

    @byte() readonly Size = 8;
    @byte() readonly Type = PacketType.ISP_SCC;
    @byte() readonly ReqI = 0;
    @byte() readonly Zero = 0;

    @byte() ViewPLID = 0;
    @byte() InGameCam: ViewIdentifier = 0;
    @byte() private readonly Sp2 = 0;
    @byte() private readonly Sp3 = 0;
}
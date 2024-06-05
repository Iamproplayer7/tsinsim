import { Sendable } from "packets/utilities/index.js";
import { define, byte } from "./decorators.js";
import { PacketType } from "packets/types/PacketType.js";
import { ObjectInfo } from "./ObjectInfo.js";
import { JRRAction } from "packets/enums/JRRAction.js";

@define
export class IS_JRR extends Sendable {
    constructor(options?: {}) { 
        super(); 
        Object.assign(this, options);
    }

    @byte() readonly Size = 8;
    @byte() readonly Type = PacketType.ISP_JRR;
    @byte() readonly ReqI = 0;
    @byte() PLID = 0;

    @byte() UCID = 0;
    @byte() JRRAction: JRRAction = 0;
    @byte() private readonly Sp2 = 0;
    @byte() private readonly Sp3 = 0;

    StartPos: ObjectInfo = new ObjectInfo();

    pack(): Uint8Array { 
        return Buffer.concat([super.pack(16), this.StartPos.pack()])
    }
}
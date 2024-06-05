import { Sendable } from "packets/utilities/index.js";
import { define, byte, char } from "./decorators.js";
import { PacketType } from "packets/types/PacketType.js";
import { MessageSound } from "packets/enums/MessageSound.js";

@define
export class IS_MTC extends Sendable {
    constructor(options?: {}) { 
        super(); 
        Object.assign(this, options);
    }

    @byte() readonly Size = 136;
    @byte() readonly Type = PacketType.ISP_MTC;
    @byte() readonly ReqI = 0;
    @byte() Sound: MessageSound = 0;

    @byte() UCID = 0;
    @byte() PLID = 0;
    @byte() private readonly Sp2 = 0;
    @byte() private readonly Sp3 = 0;

    @char(128) Text = '';
}
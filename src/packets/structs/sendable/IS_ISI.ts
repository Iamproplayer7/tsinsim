import { Sendable } from "packets/utilities/index.js";
import { define, byte, char, word } from "packets/utilities/decorators.js";
import { PacketType } from "packets/types/PacketType.js";

@define
export class IS_ISI extends Sendable {
    constructor(options?: {}) { 
        super(); 
        Object.assign(this, options);
    }

    @byte() readonly Size = 44;
    @byte() readonly Type = PacketType.ISP_ISI;
    @byte() readonly ReqI = 0;
    @byte() readonly Zero = 0;

    @word() UDPPort = 0;
    @word() Flags = 0;

    @byte() InSimVer = 0;
    @byte() Prefix = 0;
    @word() Interval = 0;

    @char(16) Admin = '';
    @char(16) IName = '';
}
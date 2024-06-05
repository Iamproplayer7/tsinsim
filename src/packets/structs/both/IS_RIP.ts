import { Sendable } from "../../utilities/index.js";
import { define, byte, unsigned, word, char } from "../../utilities/decorators.js";
import { ReplayError, ReplayMode, ReplayOptions } from "../../enums/index.js";
import { PacketType } from "../../types/PacketType.js";

@define
export class IS_RIP extends Sendable {
    constructor(options: Omit<Partial<IS_RIP>, "pack"> = {}) { 
        super(); 
        Object.assign(this, options);
    }
    
    @byte() readonly Size = 80;
    @byte() readonly Type = PacketType.ISP_RIP;
    @byte() ReqI = 0;
    @byte() Error: ReplayError = 0;

    @byte() MPR: ReplayMode = 0;
    @byte() Paused = 0;
    @word() Options: ReplayOptions | 0 = 0;
    @word() private readonly Sp3 = 0;

    @unsigned() CTime = 0;
    @unsigned() TTime = 0;

    @char(64) RName = '';
}
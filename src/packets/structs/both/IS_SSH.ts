import { Sendable } from "../../utilities/index.js";
import { define, byte, char } from "../../utilities/decorators.js";
import { PacketType } from "../../types/PacketType.js";
import { ScreenshotError } from "../../enums/ScreenshotError.js";

@define
export class IS_SSH extends Sendable {
    constructor(options?: {}) { 
        super(); 
        Object.assign(this, options);
    }

    @byte() readonly Size = 40;
    @byte() readonly Type = PacketType.ISP_SSH;
    @byte() ReqI = 0;
    @byte() Error: ScreenshotError = 0;

    @byte() private readonly Sp0 = 0;
    @byte() private readonly Sp1 = 0;
    @byte() private readonly Sp2 = 0;
    @byte() private readonly Sp3 = 0;

    @char(32) Name = '';
}
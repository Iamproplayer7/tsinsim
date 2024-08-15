import { Sendable } from "../../utilities/index.js";
import { define, byte } from "../../utilities/decorators.js";
import { PacketType } from "../../types/PacketType.js";
import { ButtonFunction } from "../../enums/ButtonFunction.js";

@define
export class IS_BFN extends Sendable {
    constructor(options: Omit<Partial<IS_BFN>, "pack"> = {}) { 
        super(); 
        Object.assign(this, options);
    }

    @byte() readonly Size = 8;
    @byte() readonly Type = PacketType.ISP_BFN;
    @byte() readonly ReqI = 0;
    @byte() SubT: ButtonFunction = ButtonFunction.BFN_DEL_BTN;

    @byte() UCID = 0;
    @byte() ClickID = 0;
    @byte() ClickMAX = 0;
    @byte() Inst = 0;
}
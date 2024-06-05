import { Sendable } from "packets/utilities/index.js";
import { define, byte, char } from "./decorators.js";
import { PacketType } from "packets/types/PacketType.js";
import { ButtonStyle } from "packets/enums/ButtonStyle.js";

@define
export class IS_BTN extends Sendable {
    constructor(options?: {}) { 
        super(); 
        Object.assign(this, options);
    }

    @byte() readonly Size = 12;
    @byte() readonly Type = PacketType.ISP_BTN;
    @byte() readonly ReqI = 0;
    @byte() readonly Zero = 0;

    @byte() ClickID = 0;
    @byte() Inst = 0;
    @byte() BStyle: ButtonStyle | 0 = 0;
    @byte() TypeIn = 0;

    @byte() L = 0;
    @byte() T = 0;
    @byte() W = 0;
    @byte() H = 0;

    @char(240) Text = '';
}
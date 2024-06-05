import { Receivable } from "@app/packets/utilities/index.js";
import { define, byte, char } from "@app/packets/utilities/decorators.js";
import { PacketType } from "@app/packets/types/PacketType.js";

@define
export class IS_BTT extends Receivable {
    @byte() readonly Size = 104;
    @byte() readonly Type = PacketType.ISP_BTT;
    @byte() readonly ReqI = 0;
    @byte() UCID = 0;

    @byte() ClickID = 0;
    @byte() Inst = 0;
    @byte() TypeIn = 0;
    @byte() private readonly Sp3 = 0;

    @char(96) Text = '';
}
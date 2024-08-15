import { Receivable } from "../../utilities/index.js";
import { define, byte } from "../../utilities/decorators.js";
import { PacketType } from "../../types/PacketType.js";
import { ButtonClickFlags } from "../../enums/ButtonClickFlags.js";

@define
export class IS_BTC extends Receivable {
    @byte() readonly Size = 8;
    @byte() readonly Type = PacketType.ISP_BTC;
    @byte() readonly ReqI = 0;
    @byte() readonly UCID = 0;

    @byte() ClickID = 0;
    @byte() Inst = 0;
    @byte() CFlags: ButtonClickFlags | 0 = 0;
    @byte() private readonly Sp3 = 0;
}
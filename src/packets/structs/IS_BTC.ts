import { Receivable } from "packets/utilities/index.js";
import { define, byte } from "./decorators.js";
import { PacketType } from "packets/types/PacketType.js";
import { ButtonClickFlags } from "packets/enums/ButtonClickFlags.js";

@define
export class IS_BTC extends Receivable {
    @byte() readonly Size = 8;
    @byte() readonly Type = PacketType.ISP_BTC;
    @byte() readonly ReqI = 0;
    @byte() readonly Zero = 0;

    @byte() UCID = 0;
    @byte() Inst = 0;
    @byte() CFlags: ButtonClickFlags | 0 = 0;
    @byte() private readonly Sp3 = 0;
}
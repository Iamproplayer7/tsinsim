import { Receivable } from "@app/packets/utilities/index.js";
import { define, byte } from "@app/packets/utilities/decorators.js";
import { PacketType } from "@app/packets/types/PacketType.js";
import { ButtonClickFlags } from "@app/packets/enums/ButtonClickFlags.js";

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
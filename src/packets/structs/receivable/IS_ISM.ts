import { Receivable } from "@app/packets/utilities/index.js";
import { define, byte, char } from "@app/packets/utilities/decorators.js";
import { PacketType } from "@app/packets/types/PacketType.js";
import { SmallType, InSimHost } from "@app/packets/enums/index.js";

@define
export class IS_ISM extends Receivable {
    @byte() readonly Size = 40;
    @byte() readonly Type = PacketType.ISP_ISM;
    @byte() readonly ReqI = 0;
    @byte() SubT: SmallType = SmallType.SMALL_NONE;

    @byte() Host: InSimHost = 0;
    @byte() private readonly Sp1 = 0;
    @byte() private readonly Sp2 = 0;
    @byte() private readonly Sp3 = 0;

    @char(32) HName = '';
}
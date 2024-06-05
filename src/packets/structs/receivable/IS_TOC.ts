import { Receivable } from "@app/packets/utilities/index.js";
import { define, byte } from "@app/packets/utilities/decorators.js";
import { PacketType } from "@app/packets/types/PacketType.js";

@define
export class IS_TOC extends Receivable {
    @byte() readonly Size = 8;
    @byte() readonly Type = PacketType.ISP_TOC;
    @byte() readonly ReqI = 0;
    @byte() PLID = 0;

    @byte() OldUCID = 0;
    @byte() NewUCID = 0;
    @byte() private readonly Sp2 = 0;
    @byte() private readonly Sp3 = 0;
}
import { Receivable } from "@app/packets/utilities/index.js";
import { define, byte } from "@app/packets/utilities/decorators.js";
import { PacketType } from "@app/packets/types/PacketType.js";
import { ViewIdentifier } from "@app/packets/enums/ViewIdentifier.js";

@define
export class IS_CCH extends Receivable {
    @byte() readonly Size = 8;
    @byte() readonly Type = PacketType.ISP_CCH;
    @byte() readonly ReqI = 0;
    @byte() PLID = 0;

    @byte() Camera: ViewIdentifier = 0;
    @byte() private readonly Sp1 = 0;
    @byte() private readonly Sp2 = 0;
    @byte() private readonly Sp3 = 0;
}
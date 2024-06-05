import { Receivable } from "@app/packets/utilities/index.js";
import { define, byte } from "@app/packets/utilities/decorators.js";
import { PacketType } from "@app/packets/types/PacketType.js";
import { PitLaneFact } from "@app/packets/enums/PitLaneFact.js";

@define
export class IS_PLA extends Receivable {
    @byte() readonly Size = 8;
    @byte() readonly Type = PacketType.ISP_PLA;
    @byte() readonly ReqI = 0;
    @byte() PLID = 0;

    @byte() Fact: PitLaneFact = 0;
    @byte() private readonly Sp1 = 0;
    @byte() private readonly Sp2 = 0;
    @byte() private readonly Sp3 = 0;
}
import { Receivable } from "../../utilities/index.js";
import { define, byte } from "../../utilities/decorators.js";
import { PacketType } from "../../types/PacketType.js";
import { PitLaneFact } from "../../enums/PitLaneFact.js";

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
import { Receivable } from "../../utilities/index.js";
import { define, byte } from "../../utilities/decorators.js";
import { PacketType } from "../../types/PacketType.js";
import { PenaltyValue, PenaltyReason } from "../../enums/index.js";

@define
export class IS_PEN extends Receivable {
    @byte() readonly Size = 8;
    @byte() readonly Type = PacketType.ISP_PEN;
    @byte() readonly ReqI = 0;
    @byte() PLID = 0;

    @byte() OldPen: PenaltyValue = 0;
    @byte() NewPen: PenaltyValue = 0;
    @byte() Reason: PenaltyReason = 0;
    @byte() private readonly Sp3 = 0;
}
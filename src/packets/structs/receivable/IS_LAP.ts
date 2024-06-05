import { Receivable } from "../../utilities/index.js";
import { define, byte, unsigned, word } from "../../utilities/decorators.js";
import { PacketType } from "../../types/PacketType.js";
import { PenaltyValue, PlayerFlags } from "../../enums/index.js";

@define
export class IS_LAP extends Receivable {
    @byte() readonly Size = 20;
    @byte() readonly Type = PacketType.ISP_LAP;
    @byte() readonly ReqI = 0;
    @byte() PLID = 0;

    @unsigned() LTime = 0;
    @unsigned() Etime = 0;

    @word() LapsDone = 0;
    @word() Flags: PlayerFlags | 0 = 0;

    @byte() Sp0 = 0;
    @byte() Penalty: PenaltyValue = 0;
    @byte() NumStops = 0;
    @byte() Fuel200 = 0;
}
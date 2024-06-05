import { Receivable } from "../../utilities/index.js";
import { define, byte, unsigned } from "../../utilities/decorators.js";
import { PacketType } from "../../types/PacketType.js";
import { PenaltyValue } from "../../enums/index.js";

@define
export class IS_SPX extends Receivable {
    @byte() readonly Size = 16;
    @byte() readonly Type = PacketType.ISP_SPX;
    @byte() readonly ReqI = 0;
    @byte() PLID = 0;

    @unsigned() STime = 0;
    @unsigned() ETime = 0;

    @byte() Split = 0;
    @byte() Penalty: PenaltyValue = 0;
    @byte() NumStops = 0;
    @byte() Fuel200 = 0;
}
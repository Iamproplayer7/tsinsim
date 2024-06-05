import { Receivable } from "../../utilities/index.js";
import { define, byte, unsigned, word } from "../../utilities/decorators.js";
import { PacketType } from "../../types/PacketType.js";
import { ConfirmationFlags, PlayerFlags } from "../../enums/index.js";

@define
export class IS_FIN extends Receivable {
    @byte() readonly Size = 20;
    @byte() readonly Type = PacketType.ISP_FIN;
    @byte() readonly ReqI = 0;
    @byte() PLID = 0;

    @unsigned() TTime = 0;
    @unsigned() BTime = 0;

    @byte() SpA = 0;
    @byte() NumStops = 0;
    @byte() Confirm: ConfirmationFlags | 0 = 0;
    @byte() SpB = 0;

    @word() LapsDone = 0;
    @word() Flags: PlayerFlags | 0 = 0;
}
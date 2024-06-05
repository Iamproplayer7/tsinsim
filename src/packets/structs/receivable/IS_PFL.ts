import { Receivable } from "../../utilities/index.js";
import { define, byte, word } from "../../utilities/decorators.js";
import { PacketType } from "../../types/PacketType.js";
import { PlayerFlags } from "../../enums/PlayerFlags.js";

@define
export class IS_PFL extends Receivable {
    @byte() readonly Size = 8;
    @byte() readonly Type = PacketType.ISP_PFL;
    @byte() readonly ReqI = 0;
    @byte() PLID = 0;

    @word() Flags: PlayerFlags | 0 = 0;
    @word() private readonly Spare = 0;
}
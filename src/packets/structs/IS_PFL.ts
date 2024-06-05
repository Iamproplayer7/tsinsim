import { Receivable } from "packets/utilities/index.js";
import { define, byte, word } from "./decorators.js";
import { PacketType } from "packets/types/PacketType.js";
import { PlayerFlags } from "packets/enums/PlayerFlags.js";

@define
export class IS_PFL extends Receivable {
    @byte() readonly Size = 8;
    @byte() readonly Type = PacketType.ISP_PFL;
    @byte() readonly ReqI = 0;
    @byte() PLID = 0;

    @word() Flags: PlayerFlags | 0 = 0;
    @word() private readonly Spare = 0;
}
import { Receivable } from "../../utilities/index.js";
import { define, byte, char } from "../../utilities/decorators.js";
import { PacketType } from "../../types/PacketType.js";
import { PlayerFlags } from "../../enums/index.js";

@define
export class IS_NCN extends Receivable {
    @byte() readonly Size = 56;
    @byte() readonly Type = PacketType.ISP_NCN;
    @byte() readonly ReqI = 0;
    @byte() UCID = 0;

    @char(24) UName = '';
    @char(24) PName = '';

    @byte() Admin = 0;
    @byte() Total = 0;
    @byte() Flags: PlayerFlags | 0 = 0;
    @byte() private readonly Sp3 = 0;
}
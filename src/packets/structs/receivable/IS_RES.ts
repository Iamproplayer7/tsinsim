import { Receivable } from "../../utilities/index.js";
import { define, byte, unsigned, word, char } from "../../utilities/decorators.js";
import { PacketType } from "../../types/PacketType.js";
import { ConfirmationFlags, PlayerFlags } from "../../enums/index.js";

@define
export class IS_RES extends Receivable {
    @byte() readonly Size = 84;
    @byte() readonly Type = PacketType.ISP_RES;
    @byte() readonly ReqI = 0;
    @byte() PLID = 0;

    @char(24) UName = '';
    @char(24) PName = '';
    @char(8) Plate = '';
    @char(4) CName = '';
    
    @unsigned() TTime = 0;
    @unsigned() BTime = 0;

    @byte() SpA = 0;
    @byte() NumStops = 0;
    @byte() Confirm: ConfirmationFlags | 0 = 0;
    @byte() SpB = 0;

    @word() LapsDone = 0;
    @word() Flags: PlayerFlags | 0 = 0;

    @byte() ResultNum = 0;
    @byte() NumRes = 0;
    @word() PSeconds = 0;
}
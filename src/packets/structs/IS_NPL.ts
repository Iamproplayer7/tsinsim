import { Receivable } from "packets/utilities/index.js";
import { define, byte, char, word } from "./decorators.js";
import { PacketType } from "packets/types/PacketType.js";
import { PlayerType, PlayerFlags, TyreCoumpound, SetupFlags } from "packets/enums/index.js";

@define
export class IS_NPL extends Receivable {
    @byte() readonly Size = 76;
    @byte() readonly Type = PacketType.ISP_NPL;
    @byte() readonly ReqI = 0;
    @byte() PLID = 0;

    @byte() UCID = 0;
    @byte() PType: PlayerType = 0;
    @word() Flags: PlayerFlags | 0 = 0;

    @char(24) PName = '';
    @char(8) Plate = '';

    @char(4) CName = '';
    @char(16) SName = '';
    @byte() TyreRL: TyreCoumpound = 0;
    @byte() TyreRR: TyreCoumpound = 0;
    @byte() TyreFL: TyreCoumpound = 0;
    @byte() TyreFR: TyreCoumpound = 0;

    @byte() H_Mass = 0;
    @byte() H_TRes = 0;
    @byte() Model = 0;
    @byte() Pass = 0;

    @byte() RWAdj = 0;
    @byte() FWADj = 0;
    @byte() private readonly Sp2 = 0;
    @byte() private readonly Sp3 = 0;

    @byte() SetF: SetupFlags | 0 = 0;
    @byte() NumP = 0;
    @byte() Config = 0;
    @byte() Fuel = 0;
}
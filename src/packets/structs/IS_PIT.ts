import { Receivable } from "packets/utilities/index.js";
import { define, byte, word } from "./decorators.js";
import { PacketType } from "packets/types/PacketType.js";
import { PlayerFlags, PenaltyValue, TyreCoumpound, PitWorkFlags } from "packets/enums/index.js";

@define
export class IS_PIT extends Receivable {
    @byte() readonly Size = 24;
    @byte() readonly Type = PacketType.ISP_PIT;
    @byte() readonly ReqI = 0;
    @byte() PLID = 0;

    @word() LapsDone = 0;
    @word() Flags: PlayerFlags | 0 = 0;

    @byte() FuelAdd = 0;
    @byte() Penalty: PenaltyValue = 0;
    @byte() NumStops = 0;
    @byte() private readonly Sp3 = 0;

    @byte() TyreRL: TyreCoumpound = 0;
    @byte() TyreRR: TyreCoumpound = 0;
    @byte() TyreFL: TyreCoumpound = 0;
    @byte() TyreFR: TyreCoumpound = 0;

    @byte() Work: PitWorkFlags | 0 = 0;
    @byte() private readonly Spare = 0;
}
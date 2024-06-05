import { Receivable } from "@app/packets/utilities/index.js";
import { define, byte, word } from "@app/packets/utilities/decorators.js";
import { PacketType } from "@app/packets/types/PacketType.js";
import { PlayerFlags, PenaltyValue, TyreCompound, PitWorkFlags } from "@app/packets/enums/index.js";

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

    @byte() TyreRL: TyreCompound = 0;
    @byte() TyreRR: TyreCompound = 0;
    @byte() TyreFL: TyreCompound = 0;
    @byte() TyreFR: TyreCompound = 0;

    @byte() Work: PitWorkFlags | 0 = 0;
    @byte() private readonly Spare = 0;
}
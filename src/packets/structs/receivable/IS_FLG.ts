import { Receivable } from "packets/utilities/index.js";
import { define, byte } from "packets/utilities/decorators.js";
import { PacketType } from "packets/types/PacketType.js";
import { FlagType } from "packets/enums/FlagType.js";

@define
export class IS_FLG extends Receivable {
    @byte() readonly Size = 8;
    @byte() readonly Type = PacketType.ISP_FLG;
    @byte() readonly ReqI = 0;
    @byte() PLID = 0;

    @byte() OffOn = 0;
    @byte() Flag: FlagType | 0 = 0;
    @byte() CarBehind = 0;
    @byte() private readonly Sp3 = 0;
}
import { Receivable } from "../../utilities/index.js";
import { define, byte } from "../../utilities/decorators.js";
import { PacketType } from "../../types/PacketType.js";
import { FlagType } from "../../enums/FlagType.js";

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
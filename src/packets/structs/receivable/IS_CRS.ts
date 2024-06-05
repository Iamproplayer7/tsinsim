import { Receivable } from "../../utilities/index.js";
import { define, byte } from "../../utilities/decorators.js";
import { PacketType } from "../../types/PacketType.js";

@define
export class IS_CRS extends Receivable {
    @byte() readonly Size = 4;
    @byte() readonly Type = PacketType.ISP_CRS;
    @byte() readonly ReqI = 0;
    @byte() PLID = 0;
}
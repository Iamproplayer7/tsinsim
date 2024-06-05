import { Receivable } from "packets/utilities/index.js";
import { define, byte } from "packets/utilities/decorators.js";
import { PacketType } from "packets/types/PacketType.js";

@define
export class IS_PLP extends Receivable {
    @byte() readonly Size = 4;
    @byte() readonly Type = PacketType.ISP_PLP;
    @byte() readonly ReqI = 0;
    @byte() PLID = 0;
}
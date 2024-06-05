import { Receivable } from "@app/packets/utilities/index.js";
import { define, byte } from "@app/packets/utilities/decorators.js";
import { PacketType } from "@app/packets/types/PacketType.js";

@define
export class IS_AXO extends Receivable {
    @byte() readonly Size = 4;
    @byte() readonly Type = PacketType.ISP_AXO;
    @byte() readonly ReqI = 0;
    @byte() PLID = 0;
}
import { Receivable } from "packets/utilities/index.js";
import { define, byte, unsigned } from "packets/utilities/decorators.js";
import { PacketType } from "packets/types/PacketType.js";

@define
export class IS_PSF extends Receivable {
    @byte() readonly Size = 4;
    @byte() readonly Type = PacketType.ISP_PSF;
    @byte() readonly ReqI = 0;
    @byte() PLID = 0;

    @unsigned() Time = 0;
    @unsigned() private readonly Spare = 0;
}
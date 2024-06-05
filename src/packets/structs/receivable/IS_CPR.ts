import { Receivable } from "@app/packets/utilities/index.js";
import { define, byte, char } from "@app/packets/utilities/decorators.js";
import { PacketType } from "@app/packets/types/PacketType.js";

@define
export class IS_CPR extends Receivable {
    @byte() readonly Size = 36;
    @byte() readonly Type = PacketType.ISP_CPR;
    @byte() readonly ReqI = 0;
    @byte() UCID = 0;

    @char(24) PName = '';
    @char(8) Plate = '';
}
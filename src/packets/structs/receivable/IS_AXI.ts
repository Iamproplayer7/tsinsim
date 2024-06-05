import { Receivable } from "@app/packets/utilities/index.js";
import { define, byte, char, word } from "@app/packets/utilities/decorators.js";
import { PacketType } from "@app/packets/types/PacketType.js";

@define
export class IS_AXI extends Receivable {
    @byte() readonly Size = 40;
    @byte() readonly Type = PacketType.ISP_AXI;
    @byte() readonly ReqI = 0;
    @byte() readonly Zero = 0;

    @byte() AXStart = 0;
    @byte() NumCP = 0;
    @word() NumO = 0;

    @char(32) LName = '';
}
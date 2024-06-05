import { Receivable } from "@app/packets/utilities/index.js";
import { define, byte, char } from "@app/packets/utilities/decorators.js";
import { PacketType } from "@app/packets/types/PacketType.js";

@define
export class IS_VER extends Receivable {
    @byte() readonly Size = 20;
    @byte() readonly Type = PacketType.ISP_VER;
    @byte() readonly ReqI = 0;
    @byte() readonly Zero = 0;

    @char(8) Version = '';
    @char(6) Product = '';
    @byte() InSimVer = 0;
    @byte() private readonly Spare = 0;
}
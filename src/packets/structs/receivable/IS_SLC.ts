import { Receivable } from "../../utilities/index.js";
import { define, byte, char } from "../../utilities/decorators.js";
import { PacketType } from "../../types/PacketType.js";

@define
export class IS_SLC extends Receivable {
    @byte() readonly Size = 4;
    @byte() readonly Type = PacketType.ISP_SLC;
    @byte() readonly ReqI = 0;
    @byte() UCID = 0;

    @char(4) CName = '';
}
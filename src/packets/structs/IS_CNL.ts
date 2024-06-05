import { Receivable } from "packets/utilities/index.js";
import { define, byte } from "./decorators.js";
import { PacketType } from "packets/types/PacketType.js";
import { LeaveReason } from "packets/enums/LeaveReason.js";

@define
export class IS_CNL extends Receivable {
    @byte() readonly Size = 8;
    @byte() readonly Type = PacketType.ISP_CNL;
    @byte() readonly ReqI = 0;
    @byte() UCID = 0;

    @byte() Reason: LeaveReason = 0;
    @byte() Total = 0;
    @byte() private readonly Sp2 = 0;
    @byte() private readonly Sp3 = 0;
}
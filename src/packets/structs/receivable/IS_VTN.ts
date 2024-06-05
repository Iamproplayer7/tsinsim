import { Receivable } from "packets/utilities/index.js";
import { define, byte } from "packets/utilities/decorators.js";
import { PacketType } from "packets/types/PacketType.js";
import { VoteAction } from "packets/enums/VoteAction.js";

@define
export class IS_VTN extends Receivable {
    @byte() readonly Size = 8;
    @byte() readonly Type = PacketType.ISP_VTN;
    @byte() readonly ReqI = 0;
    @byte() readonly Zero = 0;

    @byte() UCID = 0;
    @byte() Action: VoteAction = 0;
    @byte() private readonly Spare2 = 0;
    @byte() private readonly Spare3 = 0;
}
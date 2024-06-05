import parseLFSMessage from "parse-lfs-message";
import { Receivable } from "../../utilities/index.js";
import { define, byte } from "../../utilities/decorators.js";
import { PacketType } from "../../types/PacketType.js";
import { UserType } from "../../enums/UserType.js";

@define
export class IS_MSO extends Receivable {
    @byte() readonly Size = 136;
    @byte() readonly Type = PacketType.ISP_MSO;
    @byte() readonly ReqI = 0;
    @byte() readonly Zero = 0;

    @byte() UCID = 0;
    @byte() PLID = 0;
    @byte() UserType: UserType = 0;
    @byte() TextStart = 0;

    Text: string = '';

    unpack(data: Buffer): this {
        super.unpack(data);

        this.Text = parseLFSMessage(data.subarray(8, data.length));

        return this;
    }
}
import parseLFSMessage from "parse-lfs-message";
import { Receivable } from "@app/packets/utilities/index.js";
import { define, byte, word } from "@app/packets/utilities/decorators.js";
import { PacketType } from "@app/packets/types/PacketType.js";
import { AdminCommandResult } from "@app/packets/enums/index.js";

@define
export class IS_ACR extends Receivable {
    @byte() readonly Size = 12;
    @byte() readonly Type = PacketType.ISP_ACR;
    @byte() readonly ReqI = 0;
    @byte() readonly Zero = 0;

    @byte() UCID = 0;
    @byte() Admin = 0;
    @word() Result: AdminCommandResult | 0 = 0;
    @byte() private readonly Sp3 = 0;

    Text: string = '';

    unpack(data: Buffer): this {
        super.unpack(data);

        this.Text = parseLFSMessage(data.subarray(8, data.length).toString());
        
        return this;
    }
}
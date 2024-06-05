import { Receivable } from "@app/packets/utilities/index.js";
import { define, byte, unsigned } from "@app/packets/utilities/decorators.js";
import { PacketType } from "@app/packets/types/PacketType.js";
import { Language, License } from "@app/packets/enums/index.js";

@define
export class IS_NCI extends Receivable {
    @byte() readonly Size = 16;
    @byte() readonly Type = PacketType.ISP_NCI;
    @byte() readonly ReqI = 0;
    @byte() UCID = 0;

    @byte() Language: Language = 0;
    @byte() License: License = 0;
    @byte() private readonly Sp2 = 0;
    @byte() private readonly Sp3 = 0;

    @unsigned() UserID = 0;
    
    IpAddress: string = '';

    unpack(data: Buffer): this {
        super.unpack(data);

        this.IpAddress = data.subarray(12, 16).join('.');

        return this;
    }
}
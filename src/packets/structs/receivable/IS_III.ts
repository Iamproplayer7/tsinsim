import parseLFSMessage from "parse-lfs-message";
import { Receivable } from "@app/packets/utilities/index.js";
import { define, byte } from "@app/packets/utilities/decorators.js";
import { PacketType } from "@app/packets/types/PacketType.js";

@define
export class IS_III extends Receivable {
    @byte() readonly Size = 72;
    @byte() readonly Type = PacketType.ISP_III;
    @byte() readonly ReqI = 0;
    @byte() readonly Zero = 0;

    @byte() UCID = 0;
    @byte() PLID = 0;
    @byte() Sp2 = 0;
    @byte() Sp3 = 0;

    Msg: string = '';

    unpack(data: Buffer): this { 
        super.unpack(data);

        this.Msg = parseLFSMessage(data.subarray(8, data.length))

        return this;
    }
}
import { Receivable } from "@app/packets/utilities/index.js";
import { define, byte, unsigned } from "@app/packets/utilities/decorators.js";
import { PacketType } from "@app/packets/types/PacketType.js";
import { CarContOBJ } from "../CarContOBJ.js";
import { ObjectInfo } from "../ObjectInfo.js";
import { UCOAction } from "@app/packets/enums/index.js";

@define
export class IS_UCO extends Receivable {
    @byte() readonly Size = 28;
    @byte() readonly Type = PacketType.ISP_UCO;
    @byte() readonly ReqI = 0;
    @byte() PLID = 0;

    @byte() private readonly Sp0 = 0;
    @byte() UCOAction: UCOAction = 0;
    @byte() private readonly Sp2 = 0;
    @byte() private readonly Sp3 = 0;

    @unsigned() Time = 0;

    C: CarContOBJ = new CarContOBJ;
    Info: ObjectInfo = new ObjectInfo;

    unpack(data: Buffer): this {
        super.unpack(data);

        this.C = new CarContOBJ().unpack(data.subarray(12, 20));
        this.Info = new ObjectInfo().unpack(data.subarray(20, 28))
        
        return this;
    }
}
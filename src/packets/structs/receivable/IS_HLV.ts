import { Receivable } from "@app/packets/utilities/index.js";
import { define, byte, word } from "@app/packets/utilities/decorators.js";
import { PacketType } from "@app/packets/types/PacketType.js";
import { CarContOBJ } from "../CarContOBJ.js";
import { HLVCViolation } from "@app/packets/enums/HLVCViolation.js";

@define
export class IS_HLV extends Receivable {
    @byte() readonly Size = 16;
    @byte() readonly Type = PacketType.ISP_HLV;
    @byte() readonly ReqI = 0;
    @byte() PLID = 0;

    @byte() HLVC: HLVCViolation = 0;
    @byte() private readonly Sp1 = 0;
    @word() Time = '';
    
    C: CarContOBJ = new CarContOBJ;

    unpack(data: Buffer): this { 
        super.unpack(data);

        this.C = new CarContOBJ().unpack(data);

        return this;
    }
}
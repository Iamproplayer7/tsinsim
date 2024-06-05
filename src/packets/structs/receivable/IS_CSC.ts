import { Receivable } from "../../utilities/index.js";
import { define, byte, unsigned } from "../../utilities/decorators.js";
import { PacketType } from "../../types/PacketType.js";
import { CSCAction } from "../../enums/CSCAction.js";
import { CarContOBJ } from "../CarContOBJ.js";

@define
export class IS_CSC extends Receivable {
    @byte() readonly Size = 20;
    @byte() readonly Type = PacketType.ISP_CSC;
    @byte() readonly ReqI = 0;
    @byte() PLID = 0;

    @byte() private readonly Sp0 = 0;
    @byte() CSCAction: CSCAction = 0;
    @byte() private readonly Sp2 = 0;
    @byte() private readonly Sp3 = 0;

    @unsigned() Time = 0;
    
    C: CarContOBJ = new CarContOBJ;

    unpack(data: Buffer): this { 
        super.unpack(data);

        this.C = new CarContOBJ().unpack(data);

        return this;
    }
}
import { Receivable } from "packets/utilities/index.js";
import { define, byte, word, short } from "./decorators.js";
import { PacketType } from "packets/types/PacketType.js";
import { ObjectIndex, OBHFlags } from "packets/enums/index.js";
import { CarContOBJ } from "./CarContOBJ.js";

@define
export class IS_OBH extends Receivable {
    @byte() readonly Size = 24;
    @byte() readonly Type = PacketType.ISP_OBH;
    @byte() readonly ReqI = 0;
    @byte() PLID = 0;

    @word() SPClose = 0;
    @word() Time = 0;

    @short() X = 0;
    @short() Y = 0;

    @byte() Zbyte = 0;
    @byte() private readonly Sp1 = 0;
    @byte() Index: ObjectIndex = 0;
    @byte() OBHFlags: OBHFlags | 0 = 0;

    C: CarContOBJ = new CarContOBJ;

    unpack(data: Buffer): this {
        super.unpack(Buffer.concat([data.subarray(0, 8), data.subarray(16, data.length)]));

        this.C = new CarContOBJ().unpack(data.subarray(8, 16));

        return this;
    }
}
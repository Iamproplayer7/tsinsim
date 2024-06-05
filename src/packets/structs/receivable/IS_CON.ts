import { Receivable } from "packets/utilities/index.js";
import { define, byte, word } from "packets/utilities/decorators.js";
import { PacketType } from "packets/types/PacketType.js";
import { CarContact } from "../CarContact.js";

@define
export class IS_CON extends Receivable {
    @byte() readonly Size = 40;
    @byte() readonly Type = PacketType.ISP_CON;
    @byte() readonly ReqI = 0;
    @byte() readonly Zero = 0;

    @word() SpClose = 0;
    @word() Time = 0;

    A: CarContact = new CarContact;
    B: CarContact = new CarContact;

    unpack(data: Buffer): this {
        super.unpack(data);

        this.A = new CarContact().unpack(data.subarray(8, 16));
        this.B = new CarContact().unpack(data.subarray(16, 32));

        return this;
    }
}
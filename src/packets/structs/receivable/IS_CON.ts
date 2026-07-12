import { Receivable } from "../../utilities/index.js";
import { define, byte, word, unsigned } from "../../utilities/decorators.js";
import { PacketType } from "../../types/PacketType.js";
import { CarContact } from "../CarContact.js";

@define
export class IS_CON extends Receivable {
    @byte() readonly Size = 44;
    @byte() readonly Type = PacketType.ISP_CON;
    @byte() readonly ReqI = 0;
    @byte() readonly Zero = 0;

    @word() SpClose = 0;
    @word() SpW = 0;

    @unsigned() Time = 0;

    A: CarContact = new CarContact;
    B: CarContact = new CarContact;

    unpack(data: Buffer): this {
        super.unpack(data);

        this.A = new CarContact().unpack(data.subarray(12, 28));
        this.B = new CarContact().unpack(data.subarray(28, 44));

        return this;
    }
}
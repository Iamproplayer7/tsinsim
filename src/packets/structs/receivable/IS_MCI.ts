import { Receivable } from "@app/packets/utilities/index.js";
import { define, byte } from "@app/packets/utilities/decorators.js";
import { PacketType } from "@app/packets/types/PacketType.js";
import { CompCar } from "../CompCar.js";

@define
export class IS_MCI extends Receivable {
    @byte() readonly Size = 452;
    @byte() readonly Type = PacketType.ISP_MCI;
    @byte() readonly ReqI = 0;
    @byte() NumC = 0;

    Info: CompCar[] = [];

    unpack(data: Buffer): this {
        super.unpack(data);

        for(var i = 0; i < this.NumC; i++) {
            const start = 4 + 28 * i;
            this.Info.push(new CompCar().unpack(data.subarray(start, start + 28)));
        }

        return this;
    }
}
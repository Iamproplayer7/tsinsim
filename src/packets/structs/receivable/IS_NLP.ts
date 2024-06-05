import { Receivable } from "packets/utilities/index.js";
import { define, byte} from "packets/utilities/decorators.js";
import { PacketType } from "packets/types/PacketType.js";
import { NodeLap } from "../NodeLap.js";

@define
export class IS_NLP extends Receivable {
    @byte() readonly Size = 4;
    @byte() readonly Type = PacketType.ISP_NLP;
    @byte() readonly ReqI = 0;
    @byte() NumP = 0;

    Info: NodeLap[] = [];

    unpack(data: Buffer): this {
        super.unpack(data);

        for(var i = 0; i < this.NumP; i++) {
            const start = 4 + 6 * i;
            this.Info.push(new NodeLap().unpack(data.subarray(start, start+4)))
        }

        return this;
    }
}
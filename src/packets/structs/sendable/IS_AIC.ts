import { Sendable } from "../../utilities/index.js";
import { define, byte } from "../../utilities/decorators.js";
import { PacketType } from "../../types/PacketType.js";
import { AIInputVal } from "../AIInputVal.js";

@define
export class IS_AIC extends Sendable {
    constructor(options: Omit<Partial<IS_AIC>, "pack"> = {}) { 
        super(); 
        Object.assign(this, options);
    }

    @byte() readonly Size = 4;
    @byte() readonly Type = PacketType.ISP_AIC;
    @byte() ReqI = 0;
    @byte() PLID = 0;

    Inputs: AIInputVal[] = [];

    pack(): Uint8Array {
        const InputsLength = this.Inputs.length > 20 ? 20 : this.Inputs.length;

        var buffer = super.pack(this.Size + InputsLength * 4);
        for(const item of this.Inputs.slice(0, 20)) {
            buffer = Buffer.concat([buffer, item.pack()]);
        }

        return buffer;
    }
}
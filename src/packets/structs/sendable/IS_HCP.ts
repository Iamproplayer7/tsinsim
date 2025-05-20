import { Sendable } from "../../utilities/index.js";
import { define, byte } from "../../utilities/decorators.js";
import { PacketType } from "../../types/PacketType.js";
import { CarHCP } from "../../structs/CarHCP.js";

@define
export class IS_HCP extends Sendable {
    constructor(options: Omit<Partial<IS_HCP>, "pack"> = {}) { 
        super(); 
        Object.assign(this, options);
    }

    @byte() readonly Size = 68;
    @byte() readonly Type = PacketType.ISP_HCP;
    @byte() ReqI = 0;
    @byte() readonly Zero = 0;

    Info: CarHCP[] = [];

    pack(): Uint8Array {
        var buffer = super.pack();
        for(const item of this.Info) {
            buffer = Buffer.concat([buffer, item.pack()]);
        }

        return buffer;
    }
}
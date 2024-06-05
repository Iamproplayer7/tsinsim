import { Sendable } from "@app/packets/utilities/index.js";
import { define, byte } from "@app/packets/utilities/decorators.js";
import { PacketType } from "@app/packets/types/PacketType.js";
import { CarHCP } from "@app/../CarHCP.js";

@define
export class IS_HCP extends Sendable {
    constructor(options?: {}) { 
        super(); 
        Object.assign(this, options);
    }

    @byte() readonly Size = 68;
    @byte() readonly Type = PacketType.ISP_HCP;
    @byte() readonly ReqI = 0;
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
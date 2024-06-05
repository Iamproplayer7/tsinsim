import { Struct } from "@app/packets/utilities/index.js";
import { define, byte } from "@app/packets/utilities/decorators.js";
import { PlayerHCapFlags } from "@app/packets/enums/index.js";

@define
export class PlayerHCap extends Struct {
    constructor(options?: {}) { 
        super(); 
        Object.assign(this, options);
    }
    
    @byte() PLID = 0;
    @byte() Flags: PlayerHCapFlags | 0 = 0;
    @byte() H_Mass = 0;
    @byte() H_TRes = 0;
};
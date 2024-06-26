import { Struct } from "../utilities/index.js";
import { define, byte } from "../utilities/decorators.js";
import { PlayerHCapFlags } from "../enums/index.js";

@define
export class PlayerHCap extends Struct {
    constructor(options: Partial<PlayerHCap> = {}) { 
        super(); 
        Object.assign(this, options);
    }
    
    @byte() PLID = 0;
    @byte() Flags: PlayerHCapFlags | 0 = 0;
    @byte() H_Mass = 0;
    @byte() H_TRes = 0;
};
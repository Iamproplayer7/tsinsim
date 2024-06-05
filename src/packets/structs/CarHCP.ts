import { Struct } from "@app/packets/utilities/index.js";
import { define, byte } from "@app/packets/utilities/decorators.js";

@define
export class CarHCP extends Struct {
    constructor(options?: {}) { 
        super(); 
        Object.assign(this, options);
    }
    
    @byte() H_Mass = 0;
    @byte() H_Tress = 0;
};
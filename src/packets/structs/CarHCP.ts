import { Struct } from "packets/utilities/index.js";
import { define, byte } from "../utilities/decorators.js";

@define
export class CarHCP extends Struct {
    constructor(options?: {}) { 
        super(); 
        Object.assign(this, options);
    }
    
    @byte() H_Mass = 0;
    @byte() H_Tress = 0;
};
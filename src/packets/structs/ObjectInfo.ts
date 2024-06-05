import { Struct } from "@app/packets/utilities/index.js";
import { define, byte, short } from "@app/packets/utilities/decorators.js";
import { ObjectIndex } from "@app/packets/enums/ObjectIndex.js";

@define
export class ObjectInfo extends Struct {
    constructor(options?: {}) { 
        super(); 
        Object.assign(this, options);
    }
    
    @short() X = 0;
    @short() Y = 0;

    @byte() ZByte = 0;
    @byte() Flags = 0;
    @byte() Index: ObjectIndex = 0;
    @byte() Heading = 0;
};
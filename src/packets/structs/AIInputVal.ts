import { Struct } from "../utilities/index.js";
import { define, byte, word } from "../utilities/decorators.js";
import { AICInput } from "../enums/AICInput.js";

@define
export class AIInputVal extends Struct {
    constructor(options: Partial<AIInputVal> = {}) { 
        super(); 
        Object.assign(this, options);
    }

    @byte() Input: AICInput = 0;
    @byte() Time = 0;
    @word() Value = 0;
};
import { Struct } from "../utilities/index.js";
import { define, float, vector, vec } from "../utilities/decorators.js";

@define
export class OSMain extends Struct {
    constructor(options: Partial<OSMain> = {}) { 
        super(); 
        Object.assign(this, options);
    }
    
    @vector() AngVel = 0;

    @float() Heading = 0;
    @float() Pitch = 0;
    @float() Roll = 0;

    @vector() Accel = 0;
    @vector() Vel = 0;

    @vec() Pos = 0;
};
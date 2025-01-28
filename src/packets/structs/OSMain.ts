import { Struct } from "../utilities/index.js";
import { define, float, vector, vec } from "../utilities/decorators.js";

@define
export class OSMain extends Struct {
    constructor(options: Partial<OSMain> = {}) { 
        super(); 
        Object.assign(this, options);
    }
    
    @vector() AngVel = { X: 0, Y: 0, Z: 0 };

    @float() Heading = 0;
    @float() Pitch = 0;
    @float() Roll = 0;

    @vector() Accel = { X: 0, Y: 0, Z: 0 };
    @vector() Vel = { X: 0, Y: 0, Z: 0 };

    @vec() Pos = { X: 0, Y: 0, Z: 0 };
};
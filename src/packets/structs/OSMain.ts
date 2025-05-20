import { Struct } from "../utilities/index.js";
import { define, float, vector, vec } from "../utilities/decorators.js";
import { Vector3 } from "../../utilities/vector.js";

@define
export class OSMain extends Struct {
    constructor(options: Partial<OSMain> = {}) { 
        super(); 
        Object.assign(this, options);
    }
    
    @vector() AngVel = new Vector3;

    @float() Heading = 0;
    @float() Pitch = 0;
    @float() Roll = 0;

    @vector() Accel = new Vector3;
    @vector() Vel = new Vector3;

    @vec() Pos = new Vector3;
};
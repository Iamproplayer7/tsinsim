import { Struct } from "packets/utilities/index.js";
import { define, byte, short } from "./decorators.js";

@define
export class CarContOBJ extends Struct {
    @byte() Direction = 0;
    @byte() Heading = 0;
    @byte() Speed = 0;
    @byte() ZByte = 0;

    @short() X = 0;
    @short() Y = 0;
};
import { Struct } from "../utilities/index.js";
import { define, byte, short, char } from "../utilities/decorators.js";
import { CompCarFlags } from "../enums/CompCarFlags.js";

@define
export class CarContact extends Struct {
    @byte() PLID = 0;
    @byte() Info: CompCarFlags | 0 = 0;
    @byte() Sp2 = 0;
    @char(1) Steer = '';

    @byte() ThrBrk = 0;
    @byte() CluHan = 0;
    @byte() GearSp = 0;
    @byte() Speed = 0;

    @byte() Direction = 0;
    @byte() Heading = 0;
    @char(1) AccelF = '';
    @char(1) AccelR = '';

    @short() Y = 0;
    @short() X = 0;
};
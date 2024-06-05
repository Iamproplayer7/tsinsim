import { Struct } from "packets/utilities/index.js";
import { define, byte, short, word, int } from "../utilities/decorators.js";
import { CompCarFlags } from "packets/enums/CompCarFlags.js";

@define
export class CompCar extends Struct {
    @word() Node = 0;
    @word() Lap = 0;

    @byte() PLID = 0;
    @byte() Position = 0;
    @byte() Info: CompCarFlags | 0 = 0;
    @byte() private readonly Sp3 = 0;

    @int() X = 0;
    @int() Y = 0;
    @int() Z = 0;

    @word() Speed = 0;
    @word() Direction = 0;
    @word() Heading = 0;

    @short() AngVel = 0;
};
import { Struct } from "packets/utilities/index.js";
import { define, byte, word } from "../utilities/decorators.js";

@define
export class NodeLap extends Struct {
    @word() Node = 0;
    @word() Lap = 0;
    @byte() PLID = 0;
    @byte() Position = 0;
};
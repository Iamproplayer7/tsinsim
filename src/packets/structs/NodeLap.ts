import { Struct } from "@app/packets/utilities/index.js";
import { define, byte, word } from "@app/packets/utilities/decorators.js";

@define
export class NodeLap extends Struct {
    @word() Node = 0;
    @word() Lap = 0;
    @byte() PLID = 0;
    @byte() Position = 0;
};
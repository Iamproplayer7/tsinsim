import { Receivable } from "packets/utilities/index.js";
import { define, byte, char, word } from "packets/utilities/decorators.js";
import { PacketType } from "packets/types/PacketType.js";
import { Wind } from "packets/enums/index.js";

@define
export class IS_RST extends Receivable {
    @byte() readonly Size = 28;
    @byte() readonly Type = PacketType.ISP_RST;
    @byte() readonly ReqI = 0;
    @byte() readonly Zero = 0;

    @byte() RaceLaps = 0;
    @byte() QualMins = 0;
    @byte() NumP = 0;
    @byte() Timing = 0;

    @char(6) Track = '';
    @byte() Weather = 0;
    @byte() Wind: Wind = 0;

    @word() Flags = 0;
    @word() NumNodes = 0;
    @word() Finish = 0;
    @word() Split1 = 0;
    @word() Split2 = 0;
    @word() Split3 = 0;
}
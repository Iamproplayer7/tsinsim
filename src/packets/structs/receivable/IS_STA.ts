import { Receivable} from "packets/utilities/index.js";
import { define, byte, float, word, char } from "packets/utilities/decorators.js";
import { PacketType } from "packets/types/PacketType.js";
import { StateFlags, ViewIdentifier } from "packets/enums/index.js";

@define
export class IS_STA extends Receivable {
    @byte() readonly Size = 28;
    @byte() readonly Type = PacketType.ISP_STA;
    @byte() ReqI = 0;
    @byte() readonly Zero = 0;

    @float() ReplaySpeed = 0;

    @word() Flags: StateFlags | 0 = 0;
    @byte() InGameCam: ViewIdentifier = 0;
    @byte() ViewPLID = 0;

    @byte() NumP = 0;
    @byte() NumConns = 0;
    @byte() NumFinished = 0;
    @byte() RaceInProg = 0;

    @byte() QualMins = 0;
    @byte() RaceLaps = 0;
    @byte() private readonly Sp2 = 0;
    @byte() ServerStatus = 0;

    @char(6) Track = '';
    @byte() Weather = 0;
    @byte() Wind = 0;
}
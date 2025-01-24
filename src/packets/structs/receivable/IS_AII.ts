import { Receivable } from "../../utilities/index.js";
import { define, byte, float, unsigned, char } from "../../utilities/decorators.js";
import { PacketType } from "../../types/PacketType.js";
import { OSMain } from "../OSMain.js";

@define
export class IS_AII extends Receivable {
    @byte() readonly Size = 96;
    @byte() readonly Type = PacketType.ISP_AII;
    @byte() readonly ReqI = 0;
    @byte() readonly PLID = 0;

    @char(60) OSData: OSMain = new OSMain;

    @byte() Flags = 0;
    @byte() Gear = 0;
    @byte() private readonly Sp2 = 0;
    @byte() private readonly Sp3 = 0;

    @float() RPM = 0;
    @float() SpF0 = 0;
    @float() SpF1 = 0;

    @unsigned() ShowLights = 0;
    @unsigned() SPU1 = 0;
    @unsigned() SPU2 = 0;
    @unsigned() SPU3 = 0;

    unpack(data: Buffer): this {
        super.unpack(data);

        this.OSData = new OSMain().unpack(data.subarray(4, 4+60))

        return this;
    }
}
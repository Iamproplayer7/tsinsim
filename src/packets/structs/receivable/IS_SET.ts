import { Receivable } from "../../utilities/index.js";
import { define, byte, char, unsigned, byteArray } from "../../utilities/decorators.js";
import { PacketType } from "../../types/PacketType.js";

const OFFICIAL_VEHICLES =  ['UF1', 'XFG', 'XRG', 'LX4', 'LX6', 'RB4', 'FXO', 'XRT', 'RAC', 'FZ5', 'UFR', 'XFR', 'FXR', 'XRR', 'FZR', 'MRT', 'FBM', 'FOX', 'FO8', 'BF1'];

@define
export class IS_SET extends Receivable {
    @byte() readonly Size = 4;
    @byte() readonly Type = PacketType.ISP_SET;
    @byte() readonly ReqI = 0;
    @byte() UCID = 0;

    @char(0) CName = '';
    @unsigned() CNameInt = 0;

    @unsigned() Spare = 0;

    @byte() FuelLoad = 0;
    @byte() Sp1 = 0;
    @byte() Sp2 = 0;
    @byte() Sp3 = 0;

    @byteArray(120) Setup = [];

    unpack(data: Buffer): this {
        const buffer = super.unpack(data);

        var OfficialName: false | string = false;
        for(const vehName of OFFICIAL_VEHICLES) {
            const oid = Buffer.concat([Buffer.from(vehName), Buffer.alloc(1)]).readUInt32LE(0).toString(16);
            if(oid == buffer.CNameInt.toString(16)) {
                OfficialName = vehName;
            }
        }

        buffer.CName = OfficialName ? OfficialName : buffer.CNameInt.toString(16).toUpperCase();

        return this;
    }
}
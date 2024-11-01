import { Receivable } from "../../utilities/index.js";
import { define, byte, char, word, unsigned } from "../../utilities/decorators.js";
import { PacketType } from "../../types/PacketType.js";
import { PlayerType, PlayerFlags, TyreCompound, SetupFlags, PassengerFlags } from "../../enums/index.js";

const OFFICIAL_VEHICLES =  ['UF1', 'XFG', 'XRG', 'LX4', 'LX6', 'RB4', 'FXO', 'XRT', 'RAC', 'FZ5', 'UFR', 'XFR', 'FXR', 'XRR', 'FZR', 'MRT', 'FBM', 'FOX', 'FO8', 'BF1'];

@define
export class IS_NPL extends Receivable {
    @byte() readonly Size = 76;
    @byte() readonly Type = PacketType.ISP_NPL;
    @byte() readonly ReqI = 0;
    @byte() PLID = 0;

    @byte() UCID = 0;
    @byte() PType: PlayerType = 0;
    @word() Flags: PlayerFlags | 0 = 0;

    @char(24) PName = '';
    @char(8) Plate = '';

    @char(0) CName = '';
    @unsigned() CNameInt = 0;
    @char(16) SName = '';
    @byte() TyreRL: TyreCompound = 0;
    @byte() TyreRR: TyreCompound = 0;
    @byte() TyreFL: TyreCompound = 0;
    @byte() TyreFR: TyreCompound = 0;

    @byte() H_Mass = 0;
    @byte() H_TRes = 0;
    @byte() Model = 0;
    @byte() Pass: PassengerFlags | 0 = 0;

    @byte() RWAdj = 0;
    @byte() FWADj = 0;
    @byte() private readonly Sp2 = 0;
    @byte() private readonly Sp3 = 0;

    @byte() SetF: SetupFlags | 0 = 0;
    @byte() NumP = 0;
    @byte() Config = 0;
    @byte() Fuel = 0;

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
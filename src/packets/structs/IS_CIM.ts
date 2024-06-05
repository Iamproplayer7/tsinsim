import { Receivable } from "packets/utilities/index.js";
import { define, byte } from "./decorators.js";
import { PacketType } from "packets/types/PacketType.js";
import { GarageInterfaceSubMode, InterfaceMode, NormalInterfaceSubMode, ShiftUInterfaceSubMode } from "packets/enums/InterfaceIdentifier.js";
import { ObjectIndex } from "packets/enums/ObjectIndex.js";

@define
export class IS_CIM extends Receivable {
    @byte() readonly Size = 8;
    @byte() readonly Type = PacketType.ISP_CIM;
    @byte() readonly ReqI = 0;
    @byte() UCID = 0;

    @byte() Mode: InterfaceMode = 0;
    @byte() SubMode: NormalInterfaceSubMode | GarageInterfaceSubMode | ShiftUInterfaceSubMode = 0;
    @byte() SelType: ObjectIndex = 0;
    @byte() private readonly Sp3 = 0;
}
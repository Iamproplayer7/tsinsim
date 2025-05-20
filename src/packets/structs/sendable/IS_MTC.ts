import unicodeToLfs from "unicode-to-lfs";
import { Sendable } from "../../utilities/index.js";
import { define, byte, char } from "../../utilities/decorators.js";
import { PacketType } from "../../types/PacketType.js";
import { MessageSound } from "../../enums/MessageSound.js";

@define
export class IS_MTC extends Sendable {
    constructor(options: Omit<Partial<IS_MTC>, "pack"> = {}) { 
        super(); 
        Object.assign(this, options);
    }

    @byte() readonly Size = 8;
    @byte() readonly Type = PacketType.ISP_MTC;
    @byte() ReqI = 0;
    @byte() Sound: MessageSound = 0;

    @byte() UCID = 0;
    @byte() PLID = 0;
    @byte() private readonly Sp2 = 0;
    @byte() private readonly Sp3 = 0;

    @char(0) Text = '';

    pack(): Uint8Array {
        this.Text = unicodeToLfs(this.Text);
       
        const buf = Buffer.from(this.Text, 'ascii').subarray(0, 127);

        const textLength = buf.length + 1;
        const len: number = textLength % 4 != 0 ? textLength + 4 - (textLength % 4) : textLength;

        return Buffer.concat([super.pack(this.Size + len), buf, Buffer.alloc(len-buf.length)]);
    }
}
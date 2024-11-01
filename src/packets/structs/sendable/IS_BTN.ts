import unicodeToLfs from "unicode-to-lfs";
import { Sendable } from "../../utilities/index.js";
import { define, byte, char } from "../../utilities/decorators.js";
import { PacketType } from "../../types/PacketType.js";
import { ButtonStyle, ButtonTextColour } from "../../enums/index.js";


@define
export class IS_BTN extends Sendable {
    constructor(options: Omit<Partial<IS_BTN>, "pack"> = {}) { 
        super(); 
        Object.assign(this, options);
    }

    @byte() readonly Size = 12;
    @byte() readonly Type = PacketType.ISP_BTN;
    @byte() ReqI = 0;
    @byte() UCID = 0;

    @byte() ClickID = 0;
    @byte() Inst = 0;
    @byte() BStyle: ButtonStyle | ButtonTextColour = 0;
    @byte() TypeIn = 0;

    @byte() L = 0;
    @byte() T = 0;
    @byte() W = 0;
    @byte() H = 0;

    @char(0) Text = '';

    pack(): Uint8Array { 
        this.Text = unicodeToLfs(this.Text);
 
        var buf = Buffer.from(this.Text).subarray(0, 239);

        // fix symbol
        for(const d of ['c2aa', 'c3b8', 'c2a9', 'c3ba', 'c2ab', 'c3bb', 'c3bb', 'c2a8', 'c3b9']) {
            const indexOf = buf.indexOf(d, 0, 'hex');
            if(indexOf !== -1) {
                buf = Buffer.concat([buf.subarray(0, indexOf), buf.subarray(indexOf+1, buf.length)])
            }
        }

        const textLength = buf.length + 1;
        const len: number = textLength % 4 != 0 ? textLength + 4 - (textLength % 4) : textLength;

        return Buffer.concat([super.pack(this.Size + len), buf, Buffer.alloc(len-buf.length)]);
    }
}
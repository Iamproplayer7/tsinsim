import { Sendable } from "../../utilities/index.js";
import { define, byte } from "../../utilities/decorators.js";
import { PacketType } from "../../types/PacketType.js";

@define
export class IS_IPB extends Sendable {
    constructor(options: Omit<Partial<IS_IPB>, "pack"> = {}) { 
        super(); 
        Object.assign(this, options);
    }

    @byte() Size = 8;
    @byte() readonly Type = PacketType.ISP_IPB;
    @byte() readonly ReqI = 0;
    @byte() NumB = 0;

    @byte() Sp0 = 0;
    @byte() Sp1 = 0;
    @byte() Sp2 = 0;
    @byte() Sp3 = 0;

    BanIPs: string[] = [];

    pack(): Uint8Array {
        // filterOut bad ones
        this.BanIPs = this.BanIPs.filter((ip) => {
            if(ip.split('.').length != 4) return false;
            
            var valid = true;
            for(const v of ip.split('.')) {
                if(v.length < 1 || parseInt(v) < 0 || parseInt(v) > 255) {
                    valid = false;
                }
            }

            return valid;
        })

        this.NumB = this.BanIPs.length;

        var buffer = super.pack(this.Size + this.NumB * 4);
        for(const ip of this.BanIPs) {
            const bufferIpAdress: Buffer = Buffer.alloc(4);

            ip.split('.').map((v, i) => { 
                bufferIpAdress.writeUint8(parseInt(v), i);
                return v;
            });

            buffer = Buffer.concat([buffer, bufferIpAdress]);
        }
        
        return buffer;
    }

    unpack(data: Buffer): this {
        super.unpack(data);

        for(var i = 8; i < 8+this.NumB*4; i+= 4) {
            this.BanIPs.push(data.subarray(i, i+4).join('.'));
        }

        return this;
    }
}
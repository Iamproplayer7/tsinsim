import net from 'net';
import { Packets } from "@app/packets/utilities/decorators.js";
import { PacketType } from '@app/packets/types/index.js';
import { Sendable } from '@app/packets/utilities/index.js';
import { IS_ISI, IS_TINY } from '@app/packets/structs/index.js';
import { Events } from '@app/utilities/events.js';

// types
type InSimConnectionOptions = {
    Host: string;
    Port: number;
}
//

export class InSim extends Events {
    private stream: net.Socket | null = null;
    private buffer: Buffer = Buffer.from('');
    connected: boolean = false;

    constructor(private InSimOptions: Partial<IS_ISI>) { super(); }

    connect(connectionOptions: InSimConnectionOptions): void {
        this.stream = net.connect(connectionOptions.Port, connectionOptions.Host);
        this.stream.on('connect', () => {
            this.sendPacket(new IS_ISI({ ...this.InSimOptions, ReqI: 1 }));

            for(const value of [6, 7, 8, 10, 13, 14, 15, 16, 17, 18, 19, 20, 22, 23, 25, 27]) {
                this.sendPacket(new IS_TINY({ ReqI: 1, SubT: value }));
            }

            this.on(PacketType.ISP_TINY, () => {
                this.sendPacket(new IS_TINY({ ReqI: 1 }));
            });

            this.fire('connect');
        });

        this.stream.on('data', (data: Buffer) => {
            this.buffer = Buffer.concat([ this.buffer, data ]);

            var size = this.peekByte();
            while((this.buffer.length > 0) && (size <= this.buffer.length)) {
                if(size > 0) {
                    this.deserializePacket(this.buffer.subarray(0, size));
                    this.buffer = this.buffer.subarray(size, this.buffer.length);
                }

                // next packet size
                size = this.peekByte();
            }
        });

        this.stream.on('close', () => {
            console.log('[InSim] Disconnected.');
            this.disconnect();
        });

        this.stream.on('error', (err: Error) => {
            console.log('[InSim] Error: ' + err);
            this.disconnect();
        });
    }

    peekByte(offset: number = 0): number {
        return offset >= this.buffer.length ? 0 : this.buffer.subarray(0, 1).readUInt8(offset) * 4;
    }

    disconnect(): void {
        if(this.stream) {
            this.stream.end();
            this.stream = null;
        }

        this.connected = false;
        this.fire('disconnect');
    }

    sendPacket(packet: Sendable) {
        if(this.stream === null) return;

        this.stream.write(packet.pack());
        console.log('-> Sent:', PacketType[packet.Type]);
    }

    deserializePacket(data: Buffer): void {
        if(this.stream === null) return;

        if(!this.connected) {
            this.connected = true;
            this.fire('connected');
        }

        const packetId = data.readUInt8(1);
        const packetType = PacketType[packetId];
        if(!packetType) {
            return console.log('[InSim:deserializePacket] packetType with packetId: ' + packetId + ' unknown!');
        }

        const packetClass = Packets.get(packetType);
        if(!packetClass) {
            return console.log('[InSim:deserializePacket] packetClass for packetType: ' + packetType + ' ID: ' + packetId + ' unknown!');
        }

        if(packetType !== 'ISP_MCI') console.log('<- Received', packetType);

        this.fire(packetId, (new packetClass).unpack(data));
    }
}
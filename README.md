# TSINSIM
An [InSim](https://en.lfsmanual.net/wiki/InSim.txt) library for Node.js (JavaScript runtime environment) with TypeScript support.<br>
It allows you connect to [Live for Speed](https://www.lfs.net) Server over a [TCP](https://lt.wikipedia.org/wiki/TCP) connection, share data between your program and game.

<br>

## InSim compatibility
Fully compatible with [InSim Version 9](https://github.com/Iamproplayer7/tsinsim/blob/main/InSim.h.txt) (0.7E).

## Requirements
This module requires [Node.Js](https://nodejs.org/en) and [TypeScript](https://www.typescriptlang.org/).<br>

## Installation
Install `tsinsim` in your Node.Js application:<br>
```bash
npm install --save tsinsim
```

## Usage
### Connection
```typescript
// import our module
import { InSim } from 'tsinsim';

// import our InSimFlags type for Flags below
import { InSimFlags } from 'tsinsim/enums';

const INSIM_VERSION = 9;

const insim = new InSim({
    Admin: '',                           // PASSWORD TO YOUR LFS HOST
    Flags: InSimFlags.ALL_MULTIPLAYER,   // FLAGS TO YOUR LFS HOST (MULTIPLAYER)
    Interval: 100,                       // TIME IN MS FOR IS_MCI (VEHICLE UPDATE PACKET). MINIMUM: 10 MS, RECOMMENDED: > 100 MS
    InSimVer: INSIM_VERSION,             // SEND INSIM VERSION TO LFS SERVER
    IName: 'host name',                  // APPLICATION NAME
    Prefix: 33                           // COMMAND PREFIX (33 -> !)                        
});

insim.connect({ 
    Host: '127.0.0.1',                  // HOST IP
    Port: 29999                         // HOST PORT
});

insim.on('connect', () => {
    console.log('InSim connecting...');
});

insim.on('connected', () => {
    console.log('InSim conected.');
});

insim.on('disconnect', () => {
    console.log('InSim disconnected.');
});
```

### Receiving Packets
```typescript
insim.on('connected', () => {
    // SEND MESSAGE TO ALL CONNECTED PLAYERS
    const Packet = new IS_MTC();
    Packet.UCID = 255;
    Packet.Text = '^2Hello from the InSim Application!'
    insim.sendPacket(Packet);
});
```

### Sending Packets
```typescript
import { PacketType } from 'tsinsim/packets';

// version info
insim.on(PacketType.ISP_VER, (data) => {
    console.log(data);
    /*
    IS_VER {
        Size: 5,
        Type: 2,
        ReqI: 1,
        Zero: 0,
        Version: '0.7E',
        Product: 'S3',
        InSimVer: 9,
        Spare: 0
    }
    */
});
```

### Lets do something bigger together
```typescript
// you already have insim connection above lets checkout this
// lets import our packet to send messages
import { IS_MTC } from 'tsinsim/packets';

// new connection
insim.on(PacketType.ISP_NCN, (data) => {
    console.log(data);
    /*
    IS_NCN {
        Size: 14,
        Type: 18,
        ReqI: 1,
        UCID: 1,          // YOUR UNIQUE ID
        UName: 'TSINSIM', // YOUR LICENSE NAME
        PName: 'TSINSIM', // YOUR PLAYER NAME
        Admin: 1,         // ADMIN STATE
        Total: 2,
        Flags: 4,
        Sp3: 0
    }
    */

    // send message to the new player (shorter method)
    insim.sendPacket(new IS_MTC({ UCID: data.UCID, Text: 'Welcome to the server a little adventurer! Use: !help' }));
});


// command handler
// we already have IS_MTC imported above but we don't have UserType for easier data handling
import { UserType } from 'tsinsim/enums';

insim.on(PacketType.ISP_MSO, (data) => {
    if(data.UserType == UserType.MSO_PREFIX) {
        const command = data.Text.substring(data.TextStart, data.Text.length);
        const isCommand = command.startsWith('!');

        if(isCommand && command == '!help') {
            insim.sendPacket(new IS_MTC({ UCID: data.UCID, Text: '^7You used command ^3!help ^7adventurer:' }));
            insim.sendPacket(new IS_MTC({ UCID: data.UCID, Text: '^7- This is example of module ^3tsinsim' }));
        }
    }
})
```
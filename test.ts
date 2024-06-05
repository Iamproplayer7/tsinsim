// import our module
import { InSim } from '@app/InSim.js';
import { InSimFlags } from './src/packets/enums/InSimFlags.js';

const INSIM_VERSION = 9;

const insim = new InSim({
    Admin: 'test',                           // PASSWORD TO YOUR LFS HOST
    Flags: InSimFlags.ALL_MULTIPLAYER,   // FLAGS TO YOUR LFS HOST (MULTIPLAYER)
    Interval: 100,                       // TIME IN MS FOR IS_MCI (VEHICLE UPDATE PACKET). MINIMUM: 10 MS, RECOMMENDED: > 100 MS
    InSimVer: INSIM_VERSION,             // SEND INSIM VERSION TO LFS SERVER
    IName: 'host name',                  // APPLICATION NAME
    Prefix: 33                           // COMMAND PREFIX (33 -> !)                        
});

insim.connect({ 
    Host: '188.122.74.156',                  // HOST IP
    Port: 52670                         // HOST PORT
});

insim.on('connected', () => {
    console.log('connected')
})
// a little workaround
import './packets/structs/index.js';

import { InSim } from './InSim.js';

const insim = new InSim({
    Admin: 'test', 
    Flags: 2043+2048,
    Interval: 1000/12,
    InSimVer: 9,
    IName: 'testas',
    Prefix: 33
});

insim.connect({ 
    Host: '188.122.74.155',
    Port: 56368
});
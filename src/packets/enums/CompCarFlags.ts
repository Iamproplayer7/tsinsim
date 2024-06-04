export enum CompCarFlags {
    CCI_BLUE	=	1,		// this car is in the way of a driver who is a lap ahead 
    CCI_YELLOW	=	2,		// this car is slow or stopped and in a dangerous place
    CCI_LAG		=	32,		// this car is lagging (missing or delayed position packets)
    CCI_FIRST	=	64,		// this is the first compcar in this set of MCI packets
    CCI_LAST	=	128		// this is the last compcar in this set of MCI packets
}
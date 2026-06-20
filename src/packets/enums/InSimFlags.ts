export enum InSimFlags {
    ISF_RES_0       =   1,	// bit  0: spare
    ISF_RES_1       =   2,	// bit  1: spare
    ISF_LOCAL       =   4,	// bit  2: guest or single player
    ISF_MSO_COLS    =   8,	// bit  3: keep colours in MSO text
    ISF_NLP         =   0x10,	// bit  4: receive NLP packets
    ISF_MCI         =   0x20,	// bit  5: receive MCI packets
    ISF_CON         =   0x40,	// bit  6: receive CON packets
    ISF_OBH         =   0x80,	// bit  7: receive OBH packets
    ISF_HLV         =   0x0100,	// bit  8: receive HLV packets
    ISF_AXM_LOAD    =   0x0200,	// bit  9: receive AXM when loading a layout
    ISF_AXM_EDIT    =   0x0400,	// bit 10: receive AXM when changing objects
    ISF_REQ_JOIN    =   0x0800,	// bit 11: process join requests
    ISF_SET         =   0x1000,	// bit 12: receive SET packets from guests who send their setup
    ALL_MULTIPLAYER =   8187    
}
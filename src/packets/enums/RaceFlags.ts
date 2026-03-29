export enum RaceFlags {
    HOSTF_CAN_VOTE      = 1,
    HOSTF_CAN_SELECT    = 2,
    HOSTF_MID_RACE      = 32,
    HOSTF_MUST_PIT      = 64,
    HOSTF_CAN_RESET     = 128,
    HOSTF_FCV			= 0x100,
    HOSTF_CRUISE        = 0x200,
    HOSTF_SHOW_FUEL     = 0x400,
    HOSTF_CAN_REFUEL    = 0x800,
    HOSTF_ALLOW_MODS    = 0x1000,
    HOSTF_UNAPPROVED    = 0x2000,
    HOSTF_TEAMARROWS    = 0x4000,
    HOSTF_NO_FLOOD		= 0x8000
}
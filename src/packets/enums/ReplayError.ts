export enum ReplayError {
	RIP_OK,				//  0 - OK: completed instruction
	RIP_ALREADY,		//  1 - OK: already at the destination
	RIP_DEDICATED,		//  2 - can't run a replay - dedicated host
	RIP_WRONG_MODE,		//  3 - can't start a replay - not in a suitable mode
	RIP_NOT_REPLAY,		//  4 - RName is zero but no replay is currently loaded
	RIP_CORRUPTED,		//  5 - IS_RIP corrupted (e.g. RName does not end with zero)
	RIP_NOT_FOUND,		//  6 - the replay file was not found
	RIP_UNLOADABLE,		//  7 - obsolete / future / corrupted
	RIP_DEST_OOB,		//  8 - destination is beyond replay length
	RIP_UNKNOWN,		//  9 - unknown error found starting replay
	RIP_USER,			// 10 - replay search was terminated by user
	RIP_OOS,			// 11 - can't reach destination - SPR is out of sync
};

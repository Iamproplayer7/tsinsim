export enum LeaveReason {
	LEAVE_DISCO,		// 0 - none
	LEAVE_TIMEOUT,		// 1 - timed out
	LEAVE_LOSTCONN,		// 2 - lost connection
	LEAVE_KICKED,		// 3 - kicked
	LEAVE_BANNED,		// 4 - banned
	LEAVE_SECURITY,		// 5 - security
	LEAVE_CPW,			// 6 - cheat protection wrong
	LEAVE_OOS,			// 7 - out of sync with host
	LEAVE_JOOS,			// 8 - join OOS (initial sync failed)
	LEAVE_HACK,			// 9 - invalid packet
	LEAVE_NUM
};
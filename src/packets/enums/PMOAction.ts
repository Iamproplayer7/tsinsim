export enum PMOAction {
	PMO_LOADING_FILE,	// 0 - sent by the layout loading system only
	PMO_ADD_OBJECTS,	// 1 - adding objects (from InSim or editor)
	PMO_DEL_OBJECTS,	// 2 - delete objects (from InSim or editor)
	PMO_CLEAR_ALL,		// 3 - clear all objects (NumO must be zero)
	PMO_TINY_AXM,		// 4 - a reply to a TINY_AXM request
	PMO_TTC_SEL,		// 5 - a reply to a TTC_SEL request
	PMO_SELECTION,		// 6 - set a connection's layout editor selection
	PMO_POSITION,		// 7 - user pressed O without anything selected
	PMO_GET_Z,			// 8 - request Z values / reply with Z values
	PMO_NUM
};
export enum InterfaceMode {
    CIM_NORMAL,				// 0 - not in a special mode
	CIM_OPTIONS,			// 1
	CIM_HOST_OPTIONS,		// 2
	CIM_GARAGE,				// 3
	CIM_CAR_SELECT,			// 4
	CIM_TRACK_SELECT,		// 5
	CIM_SHIFTU,				// 6 - free view mode
}

export enum NormalInterfaceSubMode {
	NRM_NORMAL,
	NRM_WHEEL_TEMPS,		// F9
	NRM_WHEEL_DAMAGE,		// F10
	NRM_LIVE_SETTINGS,		// F11
	NRM_PIT_INSTRUCTIONS,	// F12
	NRM_NUM
};

export enum GarageInterfaceSubMode {
	GRG_INFO,
	GRG_COLOURS,
	GRG_BRAKE_TC,
	GRG_SUSP,
	GRG_STEER,
	GRG_DRIVE,
	GRG_TYRES,
	GRG_AERO,
	GRG_PASS,
	GRG_NUM
};

export enum ShiftUInterfaceSubMode {
	FVM_PLAIN,				// no buttons displayed
	FVM_BUTTONS,			// buttons displayed (not editing)
	FVM_EDIT,				// edit mode
	FVM_NUM
};
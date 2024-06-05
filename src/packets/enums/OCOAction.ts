export enum OCOAction {
	OCO_ZERO,			// reserved
	OCO_1,				//
	OCO_2,				//
	OCO_3,				//
	OCO_LIGHTS_RESET,	// give up control of all lights
	OCO_LIGHTS_SET,		// use Data byte to set the bulbs
	OCO_LIGHTS_UNSET,	// give up control of the specified lights
	OCO_NUM
};
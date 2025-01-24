export enum SmallType {
	SMALL_NONE,		//  0					: not used
	SMALL_SSP,		//  1 - instruction		: start sending positions
	SMALL_SSG,		//  2 - instruction		: start sending gauges
	SMALL_VTA,		//  3 - report			: vote action
	SMALL_TMS,		//  4 - instruction		: time stop
	SMALL_STP,		//  5 - instruction		: time step
	SMALL_RTP,		//  6 - info			: race time packet (reply to GTH)
	SMALL_NLI,		//  7 - instruction		: set node lap interval
	SMALL_ALC,		//  8 - both ways		: set or get allowed cars (TINY_ALC)
	SMALL_LCS,		//  9 - instruction		: set local car switches (flash, horn, siren)
	SMALL_LCL,		// 10 - instruction		: set local car lights
	SMALL_AII,		// 11 - info request	: get local AI info
};
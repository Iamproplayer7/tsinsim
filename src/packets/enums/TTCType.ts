export enum TTCType {
	TTC_NONE,		//  0					: not used
	TTC_SEL,		//  1 - info request	: send IS_AXM for a layout editor selection
	TTC_SEL_START,	//  2 - info request	: send IS_AXM every time the selection changes
	TTC_SEL_STOP,	//  3 - instruction		: switch off IS_AXM requested by TTC_SEL_START
};
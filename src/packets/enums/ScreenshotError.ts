export enum ScreenshotError {
    SSH_OK,				//  0 - OK: completed instruction
	SSH_DEDICATED,		//  1 - can't save a screenshot - dedicated host
	SSH_CORRUPTED,		//  2 - IS_SSH corrupted (e.g. Name does not end with zero)
	SSH_NO_SAVE,		//  3 - could not save the screenshot
}
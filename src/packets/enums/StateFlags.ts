export enum StateFlags {
    ISS_GAME			= 1,		// in game (or MPR)
    ISS_REPLAY			= 2,		// in SPR
    ISS_PAUSED			= 4,		// paused
    ISS_SHIFTU			= 8,		// SHIFT+U mode
    ISS_DIALOG			= 16,		// in a dialog
    ISS_SHIFTU_FOLLOW	= 32,		// FOLLOW view
    ISS_SHIFTU_NO_OPT	= 64,		// SHIFT+U buttons hidden
    ISS_SHOW_2D			= 128,		// showing 2d display
    ISS_FRONT_END		= 256,		// entry screen
    ISS_MULTI			= 512,		// multiplayer mode
    ISS_MPSPEEDUP		= 1024,	    // multiplayer speedup option
    ISS_WINDOWED		= 2048,	    // LFS is running in a window
    ISS_SOUND_MUTE		= 4096,	    // sound is switched off
    ISS_VIEW_OVERRIDE	= 8192,	    // override user view
    ISS_VISIBLE			= 16384	    // InSim buttons visible ISS_TEXT_ENTRY		32768	// in a text entry dialog
}
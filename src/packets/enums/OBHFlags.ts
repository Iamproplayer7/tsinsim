export enum OBHFlags {
    OBH_LAYOUT		=   1,		// an added object
    OBH_CAN_MOVE	=   2,		// a movable object
    OBH_WAS_MOVING	=   4,		// was moving before this hit
    OBH_ON_SPOT		=   8		// object in original position
}
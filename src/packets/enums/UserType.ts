export enum UserType {
	MSO_SYSTEM,			// 0 - system message
	MSO_USER,			// 1 - normal visible user message
	MSO_PREFIX,			// 2 - hidden message starting with special prefix (see ISI)
	MSO_O,				// 3 - hidden message typed on local pc with /o command
	MSO_NUM
};

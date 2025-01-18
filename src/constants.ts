//	TODO: test + verify values - MAJOR + XHB appear to be the only two currently in use

export enum BATTLE_TYPE {
	MAJOR = 0,
	CAMPAIGN = 1,
	UNKNOWN_2 = 2,
	XHB = 3,
	UNKNOWN_4 = 4,
}

export const APIBattleTypeLabels = {
	[BATTLE_TYPE.MAJOR]: "Major",
	[BATTLE_TYPE.CAMPAIGN]: "Campaign",
	[BATTLE_TYPE.UNKNOWN_2]: "(unknown id#2)",
	[BATTLE_TYPE.XHB]: "XHB",
	[BATTLE_TYPE.UNKNOWN_4]: "(unknown id#4)",
};

export const SITE_ABRV = "BotB";
export const SITE_NAME = "Battle of the Bits";

export enum TOKEN_OPTION {
	BLANK,
	SITE_NAME,
	SITE_ABRV,
	BATTLE_NAME,
	BATTLE_ID,
	BATTLE_TYPE,
	BATTLE_SUBTYPE,
	BATTLE_FORMATS,
	BATTLE_HOST_ID,
	BATTLE_HOST_NAME,
	BATTLE_START_DATE,
}

export const APIDomain = "https://battleofthebits.com/";
export const APIBase = `${APIDomain}api/v1/`;
export const APIBattleURL = (id: number) => `${APIBase}battle/load/${id}`;
export const APICurrentBattlesURL = () => `${APIBase}battle/current`;
export const APIUserURL = (id: number) => `${APIBase}botbr/load/${id}`;
export const getAvatarURL = (avatarURL: string) => `${APIDomain}${avatarURL}`;
export const getUserProfileURL = (username: string) =>
	`${APIDomain}barracks/Profile/${username}`;

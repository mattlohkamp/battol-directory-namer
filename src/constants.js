//	double-dipping these feels hacky, I miss typescript enums

export const BATTLE_TYPE = {
	MAJOR: 0,
	CAMPAIGN: 1,
	UNKNOWN_2: 2,
	XHB: 3,
	UNKNOWN_4: 4,
};

export const APIBattleTypeLabels = [
	//	TODO: test + verify values
	"MAJOR",
	"CAMPAIGN",
	"UNKNOWN_2",
	"XHB",
	"UNKNOWN_4",
];

export const APIDomain = "https://battleofthebits.com/";
export const APIBase = `${APIDomain}api/v1/`;
export const APIBattleURL = (id) => `${APIBase}battle/load/${id}`;
export const APICurrentBattlesURL = () => `${APIBase}battle/current`;
export const APIUserURL = (id) => `${APIBase}botbr/load/${id}`;
export const getAvatarURL = (avatarURL) => `${APIDomain}${avatarURL}`;

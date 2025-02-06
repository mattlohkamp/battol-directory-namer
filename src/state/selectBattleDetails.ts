import { createSelector } from "reselect";
import { BATTLE_TYPE, SITE_ABRV, SITE_NAME } from "../constants";
import { selectBattleData } from "./battleDataSlice";
import { selectUserData } from "./hostDataSlice";
import getXHBSubtypeByDate from "../getXHBSubtypeByDate";
import { SQLDatetimeStringToDate } from "../utils";

export type BattleDetails = {
	siteName: string;
	siteAbreviation: string;
	battleType: BATTLE_TYPE;
	battleFormats: string[];
	battleCoverSrc: string;
	hostName: string;
	hostID: number; // uint
	hostAvatarSrc: string;
	hostURL: string;
	battleName: string;
	battleID: number; // uint
	battleURL: string;
	battleStartDate: Date;
	battleEndDate: Date;
	battleSubtype: string | null; // null means unable to be determined
};

export const selectBattleDetails = createSelector(
	selectBattleData,
	selectUserData,
	(battleData, userData): BattleDetails | null => {
		if (!battleData || !userData) {
			return null; //	TODO: maybe consider throwing an informative error if data isn't yet available?
		}
		return {
			siteName: SITE_NAME,
			siteAbreviation: SITE_ABRV,
			battleType: Number(battleData.type),
			battleFormats: battleData.format_tokens, //	array of strings
			battleCoverSrc: battleData.cover_art_url,
			hostName: battleData.hosts_names,
			hostID: parseInt(battleData.botbr_id),
			hostAvatarSrc: userData.avatar_url,
			hostURL: userData.profile_url,
			battleName: battleData.title,
			battleID: parseInt(battleData.id),
			battleURL: battleData.url,
			battleStartDate: SQLDatetimeStringToDate(battleData.start),
			battleEndDate: SQLDatetimeStringToDate(battleData.end),
			battleSubtype:
				Number(battleData.type) === BATTLE_TYPE.XHB
					? getXHBSubtypeByDate(battleData.start, battleData.end)
					: null, //	TODO: eventually this should include a guess at what subtype of major - seasonal etc (advent, winter/summer chip, spooky, etc)),
		};
	}
);
export default selectBattleDetails;

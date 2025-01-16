import { createSelector } from "reselect";
import { BATTLE_TYPE, SITE_ABRV, SITE_NAME } from "../constants.js";
import { getXHBSubtypeByDate } from "../utils.js";
import { selectBattleData } from "./battleDataSlice.js";
import { selectUserData } from "./hostDataSlice.js";

export const selectBattleDetails = createSelector(
	selectBattleData,
	selectUserData,
	(battleData, userData) => {
		if (!battleData || !userData) {
			return null; //	TODO: maybe consider throwing an informative error if data isn't yet available?
		}
		const details = {
			siteName: SITE_NAME,
			siteAbreviation: SITE_ABRV,
			battleType: Number(battleData.type),
			battleFormats: battleData.format_tokens, //	array of strings
			battleCoverSrc: battleData.cover_art_url,
			hostName: battleData.hosts_names,
			hostID: battleData.botbr_id,
			hostAvatarSrc: userData.avatar_url,
			hostURL: userData.profile_url,
			battleName: battleData.title,
			battleID: battleData.id,
			battleURL: battleData.url,
			battleStartDate: new Date(battleData.start),
			battleEndDate: new Date(battleData.end),
		};
		details.battleSubtype =
			battleData.type === BATTLE_TYPE.XHB
				? getXHBSubtypeByDate(battleData.start, battleData.end)
				: null; //	TODO: eventually this should include a guess at what subtype of major - seasonal etc (advent, winter/summer chip, spooky, etc)
		return details;
	}
);
export default selectBattleDetails;

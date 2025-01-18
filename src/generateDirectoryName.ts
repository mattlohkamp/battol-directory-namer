import { TOKEN_OPTION } from "./constants";
import { DirectoryNameTokensState } from "./state/directoryNameTokensSlice";
import { OptionsState } from "./state/optionsSlice";
import { BattleDetails } from "./state/selectBattleDetails";
import {
	replaceSpacesWithUnderscore,
	stripEmoji,
	stripNonAlphaNumerics,
} from "./utils";

//	TODO: unit test
export default function generateDirectoryName(
	battleDetails: BattleDetails,
	directoryNameTokens: DirectoryNameTokensState,
	options: OptionsState
) {
	let directoryName = "";
	const preID = options.includePoundBeforeID ? "#" : "";

	directoryNameTokens.forEach((directoryNameToken) => {
		switch (directoryNameToken) {
			case TOKEN_OPTION.BLANK:
				directoryName += ` `;
				break;
			case TOKEN_OPTION.BATTLE_HOST_ID:
				directoryName += ` ${preID}${battleDetails.hostID}`;
				break;
			case TOKEN_OPTION.BATTLE_HOST_NAME:
				directoryName += ` ${battleDetails.hostName}`;
				break;
			case TOKEN_OPTION.BATTLE_START_DATE:
				directoryName += ` ${
					options.useUnixTimestamps
						? Date.parse(battleDetails.battleStartDate.toString())
						: battleDetails.battleStartDate
				}`;
				break;
			case TOKEN_OPTION.SITE_NAME:
				directoryName += battleDetails.siteName;
				break;
			case TOKEN_OPTION.SITE_ABRV:
				directoryName += battleDetails.siteAbreviation;
				break;
			case TOKEN_OPTION.BATTLE_ID:
				directoryName += ` ${preID}${battleDetails.battleID}`;
				break;
			case TOKEN_OPTION.BATTLE_TYPE: //	FIXME: needs to be run through the battle type map
				directoryName += battleDetails.battleType
					? ` ${battleDetails.battleType}`
					: "";
				break;
			case TOKEN_OPTION.BATTLE_SUBTYPE:
				directoryName += battleDetails.battleSubtype
					? ` ${battleDetails.battleSubtype}`
					: "";
				break;
			case TOKEN_OPTION.BATTLE_NAME:
				directoryName += ` ${battleDetails.battleName}`;
				break;
			case TOKEN_OPTION.BATTLE_FORMATS:
				directoryName +=
					options.hideMultipleFormats === true &&
					battleDetails.battleFormats.length > 1
						? ""
						: ` (${battleDetails.battleFormats.join(", ")})`;
				break;
			default:
				console.warn(`Unknown token: ${directoryNameToken}`);
				break;
		}
	});

	if (options.allowEmoji === false) {
		directoryName = stripEmoji(directoryName);
	}
	if (options.convertSpacesToUnderscores === true) {
		directoryName = replaceSpacesWithUnderscore(directoryName);
	}
	if (options.stripNonAlphanumerics === true) {
		directoryName = stripNonAlphaNumerics(directoryName);
	}

	directoryName = directoryName.trim();

	return directoryName;
}

import { SITE_ABRV, SITE_NAME, TokenOptionKeys } from "./constants";
import {
	replaceSpacesWithUnderscore,
	stripEmoji,
	stripNonAlphaNumerics,
} from "./utils.js";

//	TODO: unit test
export default function generateDirectoryName(
	battleDetails,
	directoryNameTokens,
	options
) {
	let directoryName = "";
	const preID = options.includePoundBeforeID ? "#" : "";

	directoryNameTokens.forEach((directoryNameToken) => {
		switch (directoryNameToken) {
			case TokenOptionKeys.BLANK:
				directoryName += ` `;
				break;
			case TokenOptionKeys.BATTLE_HOST_ID:
				directoryName += ` ${preID}${battleDetails.hostID}`;
				break;
			case TokenOptionKeys.BATTLE_HOST_NAME:
				directoryName += ` ${battleDetails.hostName}`;
				break;
			case TokenOptionKeys.BATTLE_START_DATE:
				directoryName += ` ${
					options.useUnixTimestamps
						? Date.parse(battleDetails.battleStartDate)
						: battleDetails.battleStartDate
				}`;
				break;
			case TokenOptionKeys.SITE_NAME:
				directoryName += battleDetails.siteName;
				break;
			case TokenOptionKeys.SITE_ABRV:
				directoryName += battleDetails.siteAbreviation;
				break;
			case TokenOptionKeys.BATTLE_ID:
				directoryName += ` ${preID}${battleDetails.battleID}`;
				break;
			case TokenOptionKeys.BATTLE_TYPE: //	FIXME: needs to be run through the battle type map
				directoryName += battleDetails.battleType
					? ` ${battleDetails.battleType}`
					: "";
				break;
			case TokenOptionKeys.BATTLE_SUBTYPE:
				directoryName += battleDetails.battleSubtype
					? ` ${battleDetails.battleSubtype}`
					: "";
				break;
			case TokenOptionKeys.BATTLE_NAME:
				directoryName += ` ${battleDetails.battleName}`;
				break;
			case TokenOptionKeys.BATTLE_FORMATS:
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

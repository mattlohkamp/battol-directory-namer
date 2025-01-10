import { TokenOptionKeys } from "./constants";
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
	//	TODO:	implement useUnixTimestamps for date content

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
						? Date.parse(battleDetails.start)
						: battleDetails.start
				}`;
				break;
			case TokenOptionKeys.SITE_NAME:
				directoryName += ` BotB`;
				break;
			case TokenOptionKeys.BATTLE_ID:
				directoryName += ` ${preID}${battleDetails.battleID}`;
				break;
			case TokenOptionKeys.BATTLE_TYPE:
				directoryName += battleDetails.type ? ` ${battleDetails.type}` : "";
				break;
			case TokenOptionKeys.BATTLE_SUBTYPE:
				directoryName += battleDetails.subtype
					? ` ${battleDetails.subtype}`
					: "";
				break;
			case TokenOptionKeys.BATTLE_NAME:
				directoryName += ` ${battleDetails.title}`;
				break;
			case TokenOptionKeys.BATTLE_FORMATS:
				directoryName +=
					options.hideMultipleFormats === true &&
					battleDetails.formats.length > 1
						? ""
						: ` (${battleDetails.formats.join(", ")})`;
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

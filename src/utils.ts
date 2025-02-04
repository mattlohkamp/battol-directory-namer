import ms from "ms";
import { APIBattleCurrent } from "./types/api";

/**
 * @constant {RegExp} battleIdFromBattleURL - takes a valid battle URL and extracts the battle ID
 */
export const MatchBattleIdFromBattleURL = /\/Battle\/(\d+)/;

export const matchEmoji = /\p{RGI_Emoji}/gv; //	TODO: double check this works cross browser / platform
export function stripEmoji(string: string) {
	return string.replaceAll(matchEmoji, "");
}

export function replaceSpacesWithUnderscore(string: string) {
	return string.replaceAll(" ", "_");
}

export const matchNonAlphaNumerics = /[^0-9a-zA-Z_]/g;

export function stripNonAlphaNumerics(string: string) {
	return string.replaceAll(matchNonAlphaNumerics, "");
}

//	TODO:	guess at major type by time period - distinguish monthlies from quarterlies, and possibly other special cases like advent calendar, halloween, etc

export type GetXHBSubtypeByDateDefaultOptions = {
	useOfor1: boolean;
	currentDate?: Date;
};
const getXHBSubtypeByDateDefaultOptions: GetXHBSubtypeByDateDefaultOptions = {
	useOfor1: true,
};
//	TODO: address case where duration is somehow unable to be determined, and return 'XHB' in that case
export const getXHBSubtypeByDate = (
	start: APIBattleCurrent["start"],
	end: APIBattleCurrent["end"],
	options: GetXHBSubtypeByDateDefaultOptions = {
		...getXHBSubtypeByDateDefaultOptions,
	}
) => {
	options = {
		...getXHBSubtypeByDateDefaultOptions,
		...options,
	};
	if (!options.currentDate) {
		options.currentDate = new Date();
	}
	if (parseInt(end) < options.currentDate.getTime()) {
		//	FIXME:	what are these datatypes? how was this ever working??
		return "XHB";
		/*
				So - for future battles, start is a precise value, but end is an estimate - and once the battle has been completed, end is set to the precise value.
				
				Which means a future battle can use the formula (duration - 24 hours) to find the time for entries.
				
				A past battle could estimate based on closest XHB value - if the precise duration is 1 hour, 37 minutes, we can reasonably assume it was an OHB with 37 minutes to vote and complete.
				
				However, what if a battle has lots of entries - an OHB with a 1.5 hour voting period would be 2.5 hours long in total - which looks exactly the same as a 2HB with a 30 minute voting period. Indistinguishable.
				
				We could try to differenciate by considering entry count - in the example above, a battle with 15 entries is more likely to be an OHB that ran long, whereas a battle with 5 entries is more likely to be an average 2HB.
				
				But that's not reliable - hosts can disable late penalites, effectively increasing entry time by any arbitrary amount. Hosts can also delay closeing a battle, so even an OHB that took 15 minutes to slug, might not have been closed for another three hours afterwards - making it appear to be 4 hours and fifteen minutes, pointing to a 4HB, etc.
				
				So sounds like we just can't know the precise duration of past battles, for now.
			*/
	}
	//	we only care about the time the battle is open to entries; by default, the battle length includes 24 hours of voting time.
	//	so an OHB would have a duration of 25 hours: 1 hour of entries, 24 hours of voting.
	const durationMs = parseInt(end) - parseInt(start) - ms("1d");

	if (durationMs === 1 * ms("1h")) {
		return `${options.useOfor1 ? "O" : "1"}HB`;
	} else {
		return `${durationMs / Number(ms("1h"))}`; //	FIXME: how does this make any sense?
	}
};

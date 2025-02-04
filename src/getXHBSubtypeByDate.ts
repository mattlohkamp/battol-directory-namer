//	TODO:	guess at major type by time period? distinguish monthlies from quarterlies, and possibly other special cases like advent calendar, halloween, etc

import ms from "ms";
import { APIBattleCurrent } from "./types/api";
import { DEFAULT_VOTING_DURATION_MS, XHB_LABELS } from "./constants";
import { isValidSQLDatetimeString, SQLDatetimeStringToDate } from "./utils";

export type GetXHBSubtypeByDateDefaultOptions = {
	useOfor1: boolean;
	currentDate?: Date;
};
const getXHBSubtypeByDateDefaultOptions: GetXHBSubtypeByDateDefaultOptions = {
	useOfor1: true,
};
export const getXHBSubtypeByDate = (
	start: APIBattleCurrent["start"],
	end: APIBattleCurrent["end"],
	options: GetXHBSubtypeByDateDefaultOptions = {
		...getXHBSubtypeByDateDefaultOptions,
		currentDate: new Date(),
	}
) => {
	// Validate start and end as ISO strings
	if (!isValidSQLDatetimeString(start)) {
		throw new Error(
			`Invalid start value "${start}" - must be a SQL datetime string (e.g. "YYYY-MM-DD HH:MM:SS")`
		);
	}
	if (!isValidSQLDatetimeString(end)) {
		throw new Error(
			`Invalid end value "${end}" - must be a SQL datetime string (e.g. "YYYY-MM-DD HH:MM:SS")`
		);
	}

	// init
	options = {
		...getXHBSubtypeByDateDefaultOptions,
		...options,
	};
	if (!options.currentDate) {
		options.currentDate = new Date();
	}
	const startDate = SQLDatetimeStringToDate(start);
	const endDate = SQLDatetimeStringToDate(end);

	// throw an error if the start and end are not in order
	if (startDate > endDate) {
		throw new Error(`Start date "${start}" cannot be after end date "${end}"`);
	} else if (startDate === endDate) {
		throw new Error(
			`Start "${start}" and end "${end}" dates cannot be the same`
		);
	}

	// if this battle already ended in the past - see † EXPLANATION † below
	if (endDate < options.currentDate) {
		return XHB_LABELS.X;
	}

	// we only care about the time the battle is open to entries; by default, the battle length includes 24 hours of voting time.
	// so an upcomming or current OHB would by default have a duration of 25 hours: 1 hour of entries, 24 hours of voting.
	// similarly, a 2HB would have a duration of 26 hours, etc.
	const durationMs =
		endDate.getTime() - startDate.getTime() - DEFAULT_VOTING_DURATION_MS;
	switch (durationMs) {
		case ms("1h"):
			return options.useOfor1 ? XHB_LABELS.O : XHB_LABELS[1];
		case ms("2h"):
			return XHB_LABELS[2];
		case ms("4h"):
			return XHB_LABELS[4];
		default:
			return XHB_LABELS.X;
	}
};
export default getXHBSubtypeByDate;

/*	† EXPLANATION †
	For future battles, start is a precise value, but end is an estimate - and once the battle has been completed, end is set to the precise value.
	
	Which means a future battle can use the formula (duration - 24 hours) to find the time for entries.
	
	A past battle could estimate based on closest XHB value - if the precise duration is 1 hour, 37 minutes, we can reasonably assume it was an OHB with 37 minutes to vote and complete.
	
	However, what if a battle has lots of entries - an OHB with a 1.5 hour voting period would be 2.5 hours long in total - which looks exactly the same as a 2HB with a 30 minute voting period. Indistinguishable.
	
	We could try to differenciate by considering entry count - in the example above, a battle with 15 entries is more likely to be an OHB that ran long, whereas a battle with 5 entries is more likely to be an average 2HB.
	
	But that's not reliable - hosts can disable late penalites, effectively increasing entry time by any arbitrary amount. Hosts can also delay closeing a battle, so even an OHB that took 15 minutes to slug, might not have been closed for another three hours afterwards - making it appear to be 4 hours and fifteen minutes, pointing to a 4HB, etc.
	
	So sounds like we just can't know the precise duration of past battles, for now.
*/

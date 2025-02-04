import { describe, expect, it } from "vitest";
import getXHBSubtypeByDate from "./getXHBSubtypeByDate";
import { APIBattleTypeLabels, BATTLE_TYPE, XHB_LABELS } from "./constants";

const getTomorrowISO = () => {
	const tomorrow = new Date();
	tomorrow.setDate(tomorrow.getDate() + 1);
	return tomorrow.toISOString();
};

describe("getXHBSubtypeByDate", () => {
	//	returns 'XHB' for battles that happened in the past
	it("should return XHB for battles that happened in the past", () => {
		const start = "2001-01-01 00:00:00";
		const end = "2001-01-02 01:00:00";
		const result = getXHBSubtypeByDate(start, end);
		expect(result).toBe(XHB_LABELS.X);
	});
	//	returns 'OHB' or '1HB' for future battles with 1 hour duration
	it("should return OHB or 1HB for future battles with 1 hour duration", () => {
		// start date should be in the future
		const today = new Date();
		const tomorrow = new Date(today);
		tomorrow.setDate(today.getDate() + 1);
		const tomorrowPlus25Hours = new Date(tomorrow);
		tomorrowPlus25Hours.setHours(tomorrow.getHours() + 25);

		const start = tomorrow.toISOString();
		const end = tomorrowPlus25Hours.toISOString();

		const resultO = getXHBSubtypeByDate(start, end, { useOfor1: true });
		expect(resultO).toBe(XHB_LABELS.O);
		const result1 = getXHBSubtypeByDate(start, end, { useOfor1: false });
		expect(result1).toBe(XHB_LABELS[1]);
	});
	//	returns '2HB' for future battles with 2 hour duration
	it("should return 2HB for future battles with 2 hour duration", () => {
		// start date should be in the future
		const today = new Date();
		const tomorrow = new Date(today);
		tomorrow.setDate(today.getDate() + 1);
		const tomorrowPlus26Hours = new Date(tomorrow);
		tomorrowPlus26Hours.setHours(tomorrow.getHours() + 26);

		const start = tomorrow.toISOString();
		const end = tomorrowPlus26Hours.toISOString();

		const result = getXHBSubtypeByDate(start, end);
		expect(result).toBe(XHB_LABELS[2]);
	});
	//	returns '4HB' for future battles with 4 hour duration
	it("should return 4HB for future battles with 4 hour duration", () => {
		// start date should be in the future
		const today = new Date();
		const tomorrow = new Date(today);
		tomorrow.setDate(today.getDate() + 1);
		const tomorrowPlus28Hours = new Date(tomorrow);
		tomorrowPlus28Hours.setHours(tomorrow.getHours() + 28);

		const start = tomorrow.toISOString();
		const end = tomorrowPlus28Hours.toISOString();

		const result = getXHBSubtypeByDate(start, end);
		expect(result).toBe(XHB_LABELS[4]);
	});
});

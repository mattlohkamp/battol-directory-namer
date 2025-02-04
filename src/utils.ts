import ms from "ms";
import { APIBattleCurrent } from "./types/api";

/**
 * @constant {RegExp} battleIdFromBattleURL - takes a valid battle URL and extracts the battle ID
 */
export const MatchBattleIdFromBattleURL = /\/Battle\/(\d+)/;

// Regular expression to match emojis and presentation selectors
const matchEmoji =
	/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE0F}\u{200D}\u{1F1E6}-\u{1F1FF}]/gu;

/**
 * Removes emojis and emoji presentation selectors from a string.
 *
 * @param {string} string - The input string from which emojis should be removed.
 * @returns {string} - The string with emojis and presentation selectors removed.
 */
export function stripEmoji(string: string): string {
	return string.replaceAll(matchEmoji, "");
}

export function replaceSpacesWithUnderscore(string: string) {
	return string.replaceAll(" ", "_");
}

export const matchNonAlphaNumerics = /[^0-9a-zA-Z_]/g;

export function stripNonAlphaNumerics(string: string) {
	return string.replaceAll(matchNonAlphaNumerics, "");
}

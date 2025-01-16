import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { MatchBattleIdFromBattleURL } from "../utils.js";

const battleURLSlice = createSlice({
	name: "battleURLSlice",
	initialState: null,
	reducers: {
		setBattleURL(_, action) {
			return action.payload;
		},
	},
});

export const selectBattleURL = (state) => state.battleURL;

export const selectBattleID = createSelector(selectBattleURL, (battleURL) => {
	return battleURL.match(MatchBattleIdFromBattleURL)[1];
});

export const { setBattleURL } = battleURLSlice.actions;
export default battleURLSlice.reducer;

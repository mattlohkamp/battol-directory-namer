import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { MatchBattleIdFromBattleURL } from "../utils";
import store from "./store";

export type BattleURLState = string | null;
const initialState: string | null = null as BattleURLState;
const battleURLSlice = createSlice({
	name: "battleURLSlice",
	initialState,
	reducers: {
		setBattleURL(_, action: PayloadAction<BattleURLState>) {
			return action.payload;
		},
	},
});

export const selectBattleURL = (state: ReturnType<typeof store.getState>) =>
	state.battleURL;

export const selectBattleID = createSelector(selectBattleURL, (battleURL) => {
	return battleURL?.match(MatchBattleIdFromBattleURL)?.[1] ?? null;
});

export const { setBattleURL } = battleURLSlice.actions;
export default battleURLSlice.reducer;

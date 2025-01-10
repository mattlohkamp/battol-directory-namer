import { createSlice } from "@reduxjs/toolkit";
import { TokenOptionKeys } from "../constants.js";

const initialState = [
	TokenOptionKeys.SITE_NAME,
	TokenOptionKeys.BATTLE_ID,
	TokenOptionKeys.BATTLE_SUBTYPE,
	TokenOptionKeys.BATTLE_NAME,
	TokenOptionKeys.BATTLE_FORMATS,
];

const directoryNameTokensSlice = createSlice({
	name: "directoryNameTokens",
	initialState,
	reducers: {
		setDirectoryNameTokens(_, action) {
			return action.payload;
		},
	},
});

export const selectDirectoryNameTokens = (state) => state.directoryNameTokens;

export const { setDirectoryNameTokens } = directoryNameTokensSlice.actions;

export default directoryNameTokensSlice.reducer;

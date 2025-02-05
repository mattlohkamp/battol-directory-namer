import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TOKEN_OPTION } from "../constants";
import store from "./store";

export type DirectoryNameTokensState = TOKEN_OPTION[];
export const initialState: DirectoryNameTokensState = [
	TOKEN_OPTION.SITE_ABRV,
	TOKEN_OPTION.BATTLE_ID,
	TOKEN_OPTION.BATTLE_SUBTYPE,
	TOKEN_OPTION.BATTLE_NAME,
	TOKEN_OPTION.BATTLE_FORMATS,
] as DirectoryNameTokensState;

const directoryNameTokensSlice = createSlice({
	name: "directoryNameTokens",
	initialState,
	reducers: {
		setDirectoryNameTokens(_, action: PayloadAction<DirectoryNameTokensState>) {
			return action.payload;
		},
	},
});

export const selectDirectoryNameTokens = (
	state: ReturnType<typeof store.getState>
) => state.directoryNameTokens;

export const { setDirectoryNameTokens } = directoryNameTokensSlice.actions;

export default directoryNameTokensSlice.reducer;

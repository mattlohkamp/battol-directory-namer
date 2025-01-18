import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import store from "./store";

export type OptionsState = {
	allowEmoji: boolean;
	convertSpacesToUnderscores: boolean;
	stripNonAlphanumerics: boolean;
	hideMultipleFormats: boolean;
	useUnixTimestamps: boolean;
	includePoundBeforeID: boolean;
};
const initialState: OptionsState = {
	allowEmoji: true,
	convertSpacesToUnderscores: false,
	stripNonAlphanumerics: false,
	hideMultipleFormats: true,
	useUnixTimestamps: true,
	includePoundBeforeID: true,
} as OptionsState;

const optionsSlice = createSlice({
	name: "optionsSlice",
	initialState,
	reducers: {
		setOptions(state, action: PayloadAction<Partial<OptionsState>>) {
			Object.entries(action.payload).forEach(([key, value]) => {
				if (key in state) {
					state[key as keyof OptionsState] = value as boolean; //	TODO: is this too much 'as'?
				} else {
					console.warn(
						`setOptions: key "${key}" is not in the state and will be ignored.`
					);
				}
			});
		},
	},
});

export const selectOptions = (state: ReturnType<typeof store.getState>) =>
	state.options;

export const { setOptions } = optionsSlice.actions;
export default optionsSlice.reducer;

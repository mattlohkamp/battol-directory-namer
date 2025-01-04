import { createSlice } from "@reduxjs/toolkit";

export const defaultOptions = {
	allowEmoji: true,
	convertSpacesToUnderscores: false,
	stripNonAlphanumerics: false,
	hideMultipleFormats: true,
	useUnixTimestamps: true,
};

const optionsSlice = createSlice({
	name: "optionsSlice",
	initialState: defaultOptions,
	reducers: {
		setOptions(state, action) {
			Object.entries(action.payload).forEach(([key, value]) => {
				if (key in state) {
					state[key] = value;
				} else {
					console.warn(
						`setOptions: key "${key}" is not in the state and will be ignored.`
					);
				}
			});
		},
	},
});

export const selectOptions = (state) => state.options;

export const { setOptions } = optionsSlice.actions;
export default optionsSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";
import battleURLSlice from "./battleURLSlice.js";
import battleDataSlice from "./battleDataSlice.js";
import optionsSlice from "./optionsSlice.js";
import directoryNameTokensSlice from "./directoryNameTokensSlice.js";

const store = configureStore({
	reducer: {
		battleURL: battleURLSlice,
		battleData: battleDataSlice,
		options: optionsSlice,
		directoryNameTokens: directoryNameTokensSlice,
	},
});

export default store;

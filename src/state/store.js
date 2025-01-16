import { configureStore } from "@reduxjs/toolkit";
import battleURLSlice from "./battleURLSlice.js";
import battleDataSlice from "./battleDataSlice.js";
import optionsSlice from "./optionsSlice.js";
import directoryNameTokensSlice from "./directoryNameTokensSlice.js";
import hostDataSlice from "./hostDataSlice.js";

const store = configureStore({
	reducer: {
		battleURL: battleURLSlice,
		battleData: battleDataSlice,
		hostData: hostDataSlice,
		options: optionsSlice,
		directoryNameTokens: directoryNameTokensSlice,
	},
});

export default store;

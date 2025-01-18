import { configureStore } from "@reduxjs/toolkit";
import battleURLSliceReducer from "./battleURLSlice";
import battleDataSliceReducer from "./battleDataSlice";
import optionsSliceReducer from "./optionsSlice";
import directoryNameTokensSliceReducer from "./directoryNameTokensSlice";
import hostDataSliceReducer from "./hostDataSlice";

const store = configureStore({
	reducer: {
		battleURL: battleURLSliceReducer,
		battleData: battleDataSliceReducer,
		hostData: hostDataSliceReducer,
		options: optionsSliceReducer,
		directoryNameTokens: directoryNameTokensSliceReducer,
	},
});

export default store;

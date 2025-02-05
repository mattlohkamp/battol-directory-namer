import { configureStore } from "@reduxjs/toolkit";
import battleURLSliceReducer from "./battleURLSlice";
import battleDataSliceReducer from "./battleDataSlice";
import optionsSliceReducer from "./optionsSlice";
import directoryNameTokensSliceReducer from "./directoryNameTokensSlice";
import hostDataSliceReducer from "./hostDataSlice";
import { name as appNameSlug } from "../../package.json";
import { load, save } from "redux-localstorage-simple";

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

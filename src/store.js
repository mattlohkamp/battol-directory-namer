import { configureStore } from "@reduxjs/toolkit";
import battleURLSlice from "./components/battleURLSlice.js";
import battleDataSlice from "./components/battleDataSlice.js";

const store = configureStore({
	reducer: {
		battleURL: battleURLSlice,
		//	battleData: battleDataSlice,
	},
});

export default store;

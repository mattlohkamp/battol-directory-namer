import { configureStore } from "@reduxjs/toolkit";
import battleURLSlice from "./battleURLSlice.js";
import battleDataSlice from "./battleDataSlice.js";

const store = configureStore({
	reducer: {
		battleURL: battleURLSlice,
		battleData: battleDataSlice,
	},
});

export default store;

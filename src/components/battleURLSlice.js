import { createSlice } from "@reduxjs/toolkit";

const battleURLSlice = createSlice({
	name: "battleURLSlice",
	initialState: "",
	reducers: {
		setBattleURL(_, action) {
			return action.payload;
		},
	},
});

export const { setBattleURL } = battleURLSlice.actions;
export default battleURLSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { APIBattleURL } from "../constants.js";

export const fetchBattleData = createAsyncThunk(
	"battleData/fetchBattleData",
	async (battleId, { rejectWithValue }) => {
		try {
			const response = await fetch(APIBattleURL(battleId));
			const data = await response.json();
			setBattleData(data);
			return data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

const battleDataSlice = createSlice({
	name: "battleData",
	initialState: {
		data: null,
		loading: "idle",
		error: null,
	},
	reducers: {
		setBattleData(_, action) {
			return action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchBattleData.pending, (state) => {
				state.loading = "loading";
			})
			.addCase(fetchBattleData.fulfilled, (state, action) => {
				state.loading = "idle";
				state.data = action.payload;
			})
			.addCase(fetchBattleData.rejected, (state, action) => {
				state.loading = "idle";
				state.error = action.payload;
			});
	},
});

export const { setBattleData } = battleDataSlice.actions;
export default battleDataSlice.reducer;

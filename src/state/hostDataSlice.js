import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { APIUserURL } from "../constants.js";

export const fetchHostData = createAsyncThunk(
	"hostData/fetchHostData",
	async (userID, { rejectWithValue }) => {
		try {
			const response = await fetch(APIUserURL(userID));
			const data = await response.json();
			setHostData(data);
			return data;
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const selectUserData = (state) => state.hostData.data;

const hostDataSlice = createSlice({
	name: "userData",
	initialState: {
		data: null,
		loading: "idle",
		error: null,
	},
	reducers: {
		setHostData(_, action) {
			return action.payload;
		},
	},
	extraReducers: (builder) => {
		//	TODO: maybe we don't need to handle all this, they're not really being used - or else we need to use them I guess
		builder
			.addCase(fetchHostData.pending, (state) => {
				state.loading = "loading";
			})
			.addCase(fetchHostData.fulfilled, (state, action) => {
				state.loading = "idle";
				state.data = action.payload;
			})
			.addCase(fetchHostData.rejected, (state, action) => {
				state.loading = "idle";
				state.error = action.payload;
			});
	},
});

export const { setHostData } = hostDataSlice.actions;
export default hostDataSlice.reducer;

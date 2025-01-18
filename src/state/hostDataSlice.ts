import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { APIUserURL } from "../constants";
import store from "./store";
import { APIBotbrLoad } from "../types/api";

export const fetchHostData = createAsyncThunk(
	"hostData/fetchHostData",
	async (userID: number, {}) => {
		try {
			const response = await fetch(APIUserURL(userID));
			const data = (await response.json()) as HostDataState;
			setHostData(data);
			return data;
		} catch (err) {}
	}
);

export const selectUserData = (state: ReturnType<typeof store.getState>) =>
	state.hostData;

type HostDataState = APIBotbrLoad | null;

const initialState: HostDataState = null as HostDataState;
const hostDataSlice = createSlice({
	name: "hostData",
	initialState,
	reducers: {
		setHostData(_, action: PayloadAction<HostDataState>) {
			return action.payload;
		},
	},
});

export const { setHostData } = hostDataSlice.actions;
export default hostDataSlice.reducer;

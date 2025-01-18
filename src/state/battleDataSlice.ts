import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { APIBattleURL } from "../constants";
import { fetchHostData } from "./hostDataSlice";
import store from "./store";
import { APIBattleLoad } from "../types/api";

export const fetchBattleData = createAsyncThunk(
	"battleData/fetchBattleData",
	async (battleId: number, { dispatch }) => {
		try {
			const response = await fetch(APIBattleURL(battleId));
			const data = (await response.json()) as BattleDataState;
			setBattleData(data);
			if (data !== null) {
				dispatch(fetchHostData(parseInt(data.botbr_id)));
			}
			return data;
		} catch (err) {}
	}
);

export const selectBattleData = (state: ReturnType<typeof store.getState>) =>
	state.battleData;
export type BattleDataState = APIBattleLoad | null;
const initialState = null as BattleDataState;
const battleDataSlice = createSlice({
	name: "battleData",
	initialState,
	reducers: {
		setBattleData(_, action: PayloadAction<BattleDataState>) {
			return action.payload;
		},
	},
});

export const { setBattleData } = battleDataSlice.actions;
export default battleDataSlice.reducer;

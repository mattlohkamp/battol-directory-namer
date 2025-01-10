import {
	createSlice,
	createAsyncThunk,
	createSelector,
} from "@reduxjs/toolkit";
import { APIBattleURL, BATTLE_TYPE } from "../constants.js";
import { getXHBSubtypeByDate } from "../utils.js";

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

export const selectBattleData = (state) => state.battleData.data;

export const selectBattleDetails = createSelector(
	selectBattleData,
	(battle) => {
		if (!battle) {
			return undefined;
		}
		const details = {
			type: Number(battle.type),
			formats: battle.format_tokens, //	array of strings
			coverArt: battle.cover_art_url,
			host: battle.hosts_names,
			hostID: battle.botbr_id,
			battleID: battle.id,
			title: battle.title,
			start: new Date(battle.start),
			end: new Date(battle.end),
			url: battle.url,
		};
		details.subtype =
			battle.type === BATTLE_TYPE.XHB
				? getXHBSubtypeByDate(details.start, details.end)
				: null; //	null means we don't know? or n/a?
		return details;
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

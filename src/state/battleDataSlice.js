import {
	createSlice,
	createAsyncThunk,
	createSelector,
} from "@reduxjs/toolkit";
import { APIBattleURL, BATTLE_TYPE } from "../constants.js";
import { generateFolderName, getXHBSubtypeByDate } from "../utils.js";

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
			//	TODO: multiple hosts?
			hostID: battle.botbr_id,
			title: battle.title,
			start: new Date(battle.start),
			end: new Date(battle.end),
		};
		details.subtype =
			battle.type === BATTLE_TYPE.XHB
				? getXHBSubtypeByDate(details.start, details.end)
				: null; //	null means we don't know? or n/a?
		//	await fetchUserById(responseJSON.botbr_id); //	TODO: too much chain of async callbacks
		return details;
	}
);

export const selectDirectoryName = createSelector(
	selectBattleDetails,
	(details) => {
		return details
			? generateFolderName({
					title: details.title,
					site: "BotB",
					id: details.hostID,
					subtype: details.subtype,
					formats: details.formats,
					options: {
						allowEmoji: true,
						convertSpacesToUnderscores: true,
						stripNonAlphaNumerics: true,
						hideMultipleFormats: true,
						useUnixTimestamps: true,
					},
			  })
			: null;
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

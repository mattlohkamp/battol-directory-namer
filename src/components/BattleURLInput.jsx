import { useDispatch, useSelector } from "react-redux"; // Example: if using Redux for global state
import { setBattleURL } from "../state/battleURLSlice.js";
import { fetchBattleData } from "../state/battleDataSlice.js";
import { battleIdFromBattleURL } from "../utils.js";
import { APIDomain } from "../constants.js";

// TODO: pattern={battleIdFromBattleURL.source}

export default function BattleURLInput() {
	const dispatch = useDispatch();

	const battleURL = useSelector(
		/**
		 * @param {{battleURL: string}} state
		 */ (state) => state.battleURL
	);
	return (
		<form
			onSubmitCapture={(e) => {
				const battleId = (battleURL.match(battleIdFromBattleURL) ?? []).pop();
				dispatch(fetchBattleData(battleId));
				e.preventDefault();
			}}>
			<label>
				<span>Posit Battol URL: </span>
				<input
					type="url"
					placeholder={`${APIDomain}arena/Battle/1234/MainScreen/EXAMPLE`}
					size={100}
					autoFocus
					value={battleURL}
					onChange={(e) => {
						dispatch(setBattleURL(e.target.value));
					}}
				/>
			</label>
			{battleURL ? (
				<button type="submit">Supplicate Server</button>
			) : (
				<button type="submit" disabled>
					Supplicate Server
				</button>
			)}
		</form>
	);
}

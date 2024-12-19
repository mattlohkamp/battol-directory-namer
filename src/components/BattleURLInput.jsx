import { useDispatch, useSelector } from "react-redux"; // Example: if using Redux for global state
import { setBattleURL } from "./battleURLSlice.js";
import { fetchBattleData } from "./battleDataSlice.js";
import { battleIdFromBattleURL } from "../utils.js";

//	urlInputEl.pattern = matchBattleId;	//	TODO: test html input pattern stuff more?

export default function BattleURLInput() {
	const dispatch = useDispatch();
	const battleURL = useSelector(
		/**
		 * @param {{ battleURL: string }} state
		 */
		(state) => state.battleURL
	);
	return (
		<form
			onSubmitCapture={(e) => {
				const battleId = (battleURL.match(battleIdFromBattleURL) ?? []).pop();
				//	dispatch(fetchBattleData(battleId));
			}}>
			<label>
				<span>Posit Battol URL: </span>
				<input
					type="url"
					placeholder="https://battleofthebits.com/arena/Battle/1234/MainScreen/EXAMPLE"
					size={100}
					autoFocus
					value={battleURL}
					onChange={(e) => {
						dispatch(setBattleURL(e.target.value));
					}}
				/>
			</label>
			<p id="error-message"></p>
			<button type="submit">Fetch</button>
		</form>
	);
}

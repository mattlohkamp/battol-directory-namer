import { useDispatch, useSelector } from "react-redux"; // Example: if using Redux for global state
import { selectBattleURL, setBattleURL } from "../state/battleURLSlice.js";
import { fetchBattleData } from "../state/battleDataSlice.js";
import { MatchBattleIdFromBattleURL } from "../utils.js";
import { APIDomain } from "../constants.js";

export default function BattleURLInput() {
	const dispatch = useDispatch();
	const battleURL = useSelector(selectBattleURL);
	return (
		<form
			onSubmitCapture={(e) => {
				const battleId = (
					battleURL.match(MatchBattleIdFromBattleURL) ?? []
				).pop();
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
					value={battleURL ?? ""}
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

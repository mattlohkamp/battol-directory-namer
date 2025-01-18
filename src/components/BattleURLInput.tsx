import { useDispatch, useSelector } from "react-redux"; // Example: if using Redux for global state
import { selectBattleURL, setBattleURL } from "../state/battleURLSlice";
import { fetchBattleData } from "../state/battleDataSlice";
import { MatchBattleIdFromBattleURL } from "../utils";
import { APIDomain } from "../constants";
import store from "../state/store";

export default function BattleURLInput() {
	const dispatch: typeof store.dispatch = useDispatch();
	const battleURL = useSelector(selectBattleURL);
	return (
		<form
			onSubmitCapture={(e) => {
				if (battleURL !== null) {
					const battleId = (
						battleURL.match(MatchBattleIdFromBattleURL) ?? []
					).pop();
					if (battleId !== undefined) {
						dispatch(fetchBattleData(parseInt(battleId)));
					}
				}
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

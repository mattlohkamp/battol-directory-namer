import { useEffect, useRef, useState } from "react";
import {
	APIBattleTypeLabels,
	APICurrentBattlesURL,
	BATTLE_TYPE,
} from "../constants";
import { selectBattleID, setBattleURL } from "../state/battleURLSlice";
import { useDispatch } from "react-redux";
import { fetchBattleData } from "../state/battleDataSlice";
import { getXHBSubtypeByDate } from "../utils";
import store from "./../state/store";
import { APIBattleCurrent } from "../types/api";

type BattleOption = {
	id: number;
	url: string;
	label: string;
};

const mapAPIBattleCurrentToBattleOption = (
	battle: APIBattleCurrent
): BattleOption => ({
	id: parseInt(battle.id),
	url: battle.profile_url,
	label: `${
		battle.type === BATTLE_TYPE.XHB
			? getXHBSubtypeByDate(battle.start, battle.end)
			: APIBattleTypeLabels[battle.type]
	} #${battle.id} ${battle.title}`,
});

export default function CurrentBattlesContainer() {
	const [battleOptions, setBattleOptions] = useState<BattleOption[]>([]);
	const dispatch: typeof store.dispatch = useDispatch();

	const fetchItems = async () => {
		try {
			const response = await fetch(APICurrentBattlesURL());
			if (!response.ok) {
				throw new Error("Failed to fetch items");
			}
			setBattleOptions(
				Array.from((await response.json()) as APIBattleCurrent[]).map(
					mapAPIBattleCurrentToBattleOption
				) as BattleOption[]
			);
		} catch (err) {} //	TODO: handle API call / response / parse error state
	};

	let battlesAPICallInitialized = useRef(false); //	TODO: this feels unwieldy, maybe use a custom hook or just move the api call up to global state?
	useEffect(() => {
		if (!battlesAPICallInitialized.current) {
			fetchItems();
			battlesAPICallInitialized.current = true;
		}
	}, []);

	return (
		<div id="current-battles-container">
			<h2>Current &amp; Upcomming Battles:</h2>
			<button type="button" id="refresh-battles" onClick={fetchItems}>
				Refresh 🔃
			</button>
			<ol id="current-battles-list">
				{battleOptions.map((battleOption) => (
					<li key={battleOption.id}>
						<button
							type="button"
							onClick={() => {
								dispatch(setBattleURL(battleOption.url));
								const battleID = selectBattleID(store.getState());
								if (battleID !== null) {
									dispatch(fetchBattleData(parseInt(battleID)));
								}
							}}>
							{battleOption.label}
						</button>
					</li>
				))}
			</ol>
		</div>
	);
}

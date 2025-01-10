import { useEffect, useState } from "react";
import {
	APIBattleTypeLabels,
	APICurrentBattlesURL,
	BATTLE_TYPE,
} from "../constants.js";
import { setBattleURL } from "../state/battleURLSlice.js";
import { useDispatch } from "react-redux";
import { fetchBattleData } from "../state/battleDataSlice.js";
import { getXHBSubtypeByDate } from "../utils.js";

export default function CurrentBattlesContainer() {
	const [battles, setBattles] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const dispatch = useDispatch();

	const fetchItems = async () => {
		setLoading(true);
		try {
			const response = await fetch(APICurrentBattlesURL());
			if (!response.ok) {
				throw new Error("Failed to fetch items");
			}
			const data = Array.from(await response.json()).map((battle) => ({
				id: battle.id,
				url: battle.profile_url,
				label: `${
					APIBattleTypeLabels[
						battle.type === BATTLE_TYPE.XHB
							? getXHBSubtypeByDate(battle.start, battle.end)
							: battle.type
					]
				} #${battle.id} ${battle.title}`,
			}));
			setBattles(data);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchItems();
	}, []);

	//	TODO: if empty?
	//	TODO: if error?
	return (
		<div id="current-battles-container">
			<h2>Current &amp; Upcomming Battles:</h2>
			{loading ? (
				<p>Loading...</p>
			) : (
				<>
					<button type="button" id="refresh-battles" onClick={fetchItems}>
						Refresh 🔃
					</button>
					<ol id="current-battles-list">
						{battles.map((battle) => (
							<li key={battle.id}>
								<button
									type="button"
									onClick={() => {
										dispatch(setBattleURL(battle.url));
										const battleId = battle.url.match(/Battle\/(\d+)/)[1];
										dispatch(fetchBattleData(battleId));
									}}>
									{battle.label}
								</button>
							</li>
						))}
					</ol>
				</>
			)}
		</div>
	);
}

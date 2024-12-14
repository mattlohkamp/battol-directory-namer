import CurrentBattlesContainer from "./components/CurrentBattlesContainer.jsx";
import BattleURLInput from "./components/BattleURLInput.jsx";
import BattleDetails from "./components/BattleDetails.jsx";
import FolderNameOptions from "./components/FolderNameOptions.jsx";
import FolderNameResults from "./components/FolderNameResults.jsx";

export default function App() {
	return (
		<>
			<CurrentBattlesContainer />
			<BattleURLInput />
			<BattleDetails />
			<FolderNameOptions />
			<FolderNameResults />
		</>
	);
}

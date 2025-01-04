import CurrentBattlesContainer from "./components/CurrentBattlesContainer.jsx";
import BattleURLInput from "./components/BattleURLInput.jsx";
import BattleDetails from "./components/BattleDetails.jsx";
import DirectoryNameOptions from "./components/DirectoryNameOptions.jsx";
import DirectoryNameResults from "./components/DirectoryNameResults.jsx";

export default function App() {
	return (
		<>
			<CurrentBattlesContainer />
			<BattleURLInput />
			<BattleDetails />
			<DirectoryNameOptions />
			<DirectoryNameResults />
		</>
	);
}

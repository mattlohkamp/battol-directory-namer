import CurrentBattlesContainer from "./components/CurrentBattlesContainer";
import BattleURLInput from "./components/BattleURLInput";
import BattleDetails from "./components/BattleDetails";
import DirectoryNameOptions from "./components/DirectoryNameOptions";
import DirectoryNameResults from "./components/DirectoryNameResults";
import DirectoryNameTemplate from "./components/DirectoryNameTemplate";

export default function App() {
	return (
		<>
			<CurrentBattlesContainer />
			<BattleURLInput />
			<BattleDetails />
			<DirectoryNameOptions />
			<DirectoryNameTemplate />
			<DirectoryNameResults />
		</>
	);
}

import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { selectOptions } from "../state/optionsSlice";
import { selectDirectoryNameTokens } from "../state/directoryNameTokensSlice";
import generateDirectoryName from "../generateDirectoryName";
import selectBattleDetails from "../state/selectBattleDetails";

const selectDirectoryName = createSelector(
	selectBattleDetails,
	selectDirectoryNameTokens,
	selectOptions,
	(battleDetails, directoryNameTokens, options) => {
		return battleDetails && directoryNameTokens.length > 0 && options
			? generateDirectoryName(battleDetails, directoryNameTokens, options)
			: null;
	}
);

export default function DirectoryNameResults() {
	const directoryName = useSelector(selectDirectoryName); //	null if battle details unavailable
	return (
		<label>
			<span>Directory Name: </span>
			<input
				type="text"
				id="directory-name"
				readOnly={true}
				size={50}
				placeholder="no battle data loaded..."
				value={
					directoryName ??
					"" /* input value wants empty string instead of null */
				}
			/>
		</label>
	);
}

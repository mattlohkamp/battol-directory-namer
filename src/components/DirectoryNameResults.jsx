import { useSelector } from "react-redux";
import { selectDirectoryName } from "../state/battleDataSlice.js";

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

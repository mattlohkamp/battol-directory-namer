import { useSelector } from "react-redux";
import { selectDirectoryName } from "../state/battleDataSlice.js";

export default function FolderNameResults() {
	const folderName = useSelector(selectDirectoryName);
	return (
		<label>
			<span>Folder Name: </span>
			<input
				type="text"
				id="folder-name"
				readOnly={true}
				size={50}
				placeholder="no battle data loaded..."
				value={folderName}
			/>
		</label>
	);
}

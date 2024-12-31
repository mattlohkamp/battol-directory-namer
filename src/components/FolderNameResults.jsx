export default function FolderNameResults() {
	return (
		<label>
			<span>Folder Name: </span>
			<input
				type="text"
				id="folder-name"
				readOnly={true}
				size={50}
				placeholder="no battle data loaded..."
			/>
		</label>
	);
}

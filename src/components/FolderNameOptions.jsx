//	TODO: datestamp formatting options
//	TODO: customize folder name generation scheme
//	https://jqueryui.com/sortable/#default ?

export default function FolderNameOptions() {
	return (
		<>
			<ul id="options">
				<li>
					<label>
						<input type="checkbox" id="option-emoji" checked />
						<span> allow emoji 💯</span>
					</label>
				</li>
				<li>
					<label>
						<input type="checkbox" id="option-underscores" />
						<span> convert spaces to underscores</span>
					</label>
				</li>
				<li>
					<label>
						<input type="checkbox" id="option-alphanumeric" />
						<span> strip non alpha numerics (except underscores)</span>
					</label>
				</li>
			</ul>
			<select id="folder-name-tokens" multiple>
				<option>Site</option>
				<option>Type</option>
				<option>Subtype</option>
				<option>ID</option>
				<option>Host</option>
				<option>Title</option>
				<option>Format(s)</option>
				<option>Start</option>
				<option>End</option>
			</select>
		</>
	);
}

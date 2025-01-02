//	TODO: datestamp formatting options
//	TODO: customize folder name generation scheme
//	https://jqueryui.com/sortable/#default ?

//	TODO: hookup the onchanges

export default function FolderNameOptions() {
	return (
		<>
			<ul id="options">
				<li>
					<label>
						<input
							type="checkbox"
							id="option-allow-emoji"
							checked={true}
							onChange={() => {}}
						/>
						<span>allow emoji 💯</span>
					</label>
				</li>
				<li>
					<label>
						<input
							type="checkbox"
							id="option-convert-spaces-to-underscores"
							onChange={() => {}}
						/>
						<span>convert spaces to underscores</span>
					</label>
				</li>
				<li>
					<label>
						<input
							type="checkbox"
							id="option-stripe-non-alphanumerics"
							onChange={() => {}}
						/>
						<span>strip non alpha numerics (except underscores)</span>
					</label>
				</li>
				<li>
					<label>
						<input
							type="checkbox"
							id="option-hide-multiple-formats"
							checked={true}
							onChange={() => {}}
						/>
						<span>hide multiple formats</span>
					</label>
				</li>
				<li>
					<label>
						<input
							type="checkbox"
							id="option-use-unix-timestamps"
							checked={true}
							onChange={() => {}}
						/>
						<span>use unix timestamps</span>
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

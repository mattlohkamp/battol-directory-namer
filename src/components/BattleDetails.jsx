//	TODO: break out start / end elements into more granular segments?
//	TODO: generate these from a model

export default function BattleDetails() {
	return (
		<>
			<img id="host-avatar" width="150" />
			<img id="battle-cover-art" width="150" />
			<dl>
				<div id="battle-site">
					<dt>Site</dt>
					<dd>BotB</dd>
				</div>
				<div id="battle-type">
					<dt>Type</dt>
					<dd></dd>
				</div>
				<div id="battle-subtype">
					<dt>Subtype</dt>
					<dd></dd>
				</div>
				<div id="battle-id">
					<dt>ID</dt>
					<dd></dd>
				</div>
				<div id="battle-host">
					<dt>Host</dt>
					<dd></dd>
				</div>
				<div id="battle-title">
					<dt>Title</dt>
					<dd></dd>
				</div>
				<div id="battle-formats">
					<dt>Format(s)</dt>
					<dd></dd>
				</div>
				<div id="battle-start">
					<dt>Start</dt>
					<dd></dd>
				</div>
				<div id="battle-end">
					<dt>End</dt>
					<dd></dd>
				</div>
			</dl>
		</>
	);
}

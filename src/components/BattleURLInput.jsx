export default function BattleURLInput() {
	return (
		<>
			<label>
				<span>Posit Battol URL: </span>
				<input
					type="url"
					id="battle-url"
					placeholder="https://battleofthebits.com/arena/Battle/1234/MainScreen/EXAMPLE"
					size="100"
					autofocus
				/>
			</label>
			<p id="error-message"></p>
		</>
	);
}

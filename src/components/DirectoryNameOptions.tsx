import { useDispatch, useSelector } from "react-redux";
import { OptionsState, setOptions } from "../state/optionsSlice";
import store from "../state/store";
import { ChangeEvent } from "react";

export default function DirectoryNameOptions() {
	const dispatch: typeof store.dispatch = useDispatch();
	const allowEmoji = useSelector(
		(state: ReturnType<typeof store.getState>) => state.options.allowEmoji
	);
	const convertSpacesToUnderscores = useSelector(
		(state: ReturnType<typeof store.getState>) =>
			state.options.convertSpacesToUnderscores
	);
	const stripNonAlphanumerics = useSelector(
		(state: ReturnType<typeof store.getState>) =>
			state.options.stripNonAlphanumerics
	);
	const hideMultipleFormats = useSelector(
		(state: ReturnType<typeof store.getState>) =>
			state.options.hideMultipleFormats
	);
	const useUnixTimestamps = useSelector(
		(state: ReturnType<typeof store.getState>) =>
			state.options.useUnixTimestamps
	);
	const includePoundBeforeID = useSelector(
		(state: ReturnType<typeof store.getState>) =>
			state.options.includePoundBeforeID
	);
	const onChangeCheckbox = (key: keyof OptionsState) => (e: ChangeEvent) => {
		dispatch(setOptions({ [key]: (e.target as HTMLInputElement).checked }));
	};

	//	TODO: generate these procedurally based off valid OptionsState props keyed to labels

	return (
		<ul id="options">
			<li>
				<label>
					<input
						type="checkbox"
						id="allowEmoji"
						checked={allowEmoji}
						onChange={onChangeCheckbox("allowEmoji")}
					/>
					<span>allow emoji 💯</span>
				</label>
			</li>
			<li>
				<label>
					<input
						type="checkbox"
						id="convertSpacesToUnderscores"
						onChange={onChangeCheckbox("convertSpacesToUnderscores")}
						checked={convertSpacesToUnderscores}
					/>
					<span>convert spaces to underscores</span>
				</label>
			</li>
			<li>
				<label>
					<input
						type="checkbox"
						id="stripNonAlphanumerics"
						onChange={onChangeCheckbox("stripNonAlphanumerics")}
						checked={stripNonAlphanumerics}
					/>
					<span>strip non alpha numerics (except underscores)</span>
				</label>
			</li>
			<li>
				<label>
					<input
						type="checkbox"
						id="hideMultipleFormats"
						checked={hideMultipleFormats}
						onChange={onChangeCheckbox("hideMultipleFormats")}
					/>
					<span>hide multiple formats</span>
				</label>
			</li>
			<li>
				<label>
					<input
						type="checkbox"
						id="useUnixTimestamps"
						checked={useUnixTimestamps}
						onChange={onChangeCheckbox("useUnixTimestamps")}
					/>
					<span>use unix timestamps</span>
				</label>
			</li>
			<li>
				<label>
					<input
						type="checkbox"
						id="includePoundBeforeID"
						checked={includePoundBeforeID}
						onChange={onChangeCheckbox("includePoundBeforeID")}
					/>
					<span># before IDs</span>
				</label>
			</li>
		</ul>
	);
}

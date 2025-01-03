//	TODO: datestamp formatting options
//	TODO: customize directory name generation scheme
//	https://jqueryui.com/sortable/#default ?

import { useDispatch, useSelector } from "react-redux";
import { setOptions } from "../state/optionsSlice.js";

//	TODO: hookup the onchanges

export default function DirectoryNameOptions() {
	const dispatch = useDispatch();
	const allowEmoji = useSelector(
		/**
		 * @param {{options:{allowEmoji:boolean}}} state
		 */ (state) => state.options.allowEmoji
	);
	const convertSpacesToUnderscores = useSelector(
		/**
		 * @param {{options:{convertSpacesToUnderscores:boolean}}} state
		 */ (state) => state.options.convertSpacesToUnderscores
	);
	const stripNonAlphanumerics = useSelector(
		/**
		 * @param {{options:{stripNonAlphanumerics:boolean}}} state
		 */ (state) => state.options.stripNonAlphanumerics
	);
	const hideMultipleFormats = useSelector(
		/**
		 * @param {{options:{hideMultipleFormats:boolean}}} state
		 */ (state) => state.options.hideMultipleFormats
	);
	const useUnixTimestamps = useSelector(
		/**
		 * @param {{options:{useUnixTimestamps:boolean}}} state
		 */ (state) => state.options.useUnixTimestamps
	);
	const onChangeCheckbox = (key) => (e) => {
		dispatch(setOptions({ [key]: e.target.checked }));
	};

	return (
		<>
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
			</ul>
			<select id="directory-name-tokens" multiple>
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

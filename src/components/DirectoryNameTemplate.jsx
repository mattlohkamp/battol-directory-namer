//	https://jqueryui.com/sortable/#default ?

import { TokenOptionKeys } from "../constants.js";
import { useDispatch, useSelector } from "react-redux";
import { setDirectoryNameTokens } from "../state/directoryNameTokensSlice.js";

/*
	each line item is a select dropdown of tokens
	each line item can be deleted or reselected
	there's an 'add token' button that adds a new line item
	each change to a line item updates the directory name preview
	there's a 'reset' button that resets the directory name preview to the default
*/

const tokenOptions = {
	//	we'll do TokenOptionKeys.BLANK manually in the renderTokenListItem function so we can disable it and use it as a placeholder
	[TokenOptionKeys.SITE_NAME]: "Site Name",
	[TokenOptionKeys.SITE_ABRV]: "Site Abbreviation",
	[TokenOptionKeys.BATTLE_NAME]: "Battle Name",
	[TokenOptionKeys.BATTLE_ID]: "Battle ID",
	[TokenOptionKeys.BATTLE_TYPE]: "Battle Type",
	[TokenOptionKeys.BATTLE_SUBTYPE]: "Battle Subtype",
	[TokenOptionKeys.BATTLE_FORMATS]: "Battle Formats",
	[TokenOptionKeys.BATTLE_HOST_ID]: "Battle Host ID",
	[TokenOptionKeys.BATTLE_HOST_NAME]: "Battle Host Name",
	[TokenOptionKeys.BATTLE_START_DATE]: "Battle Start Date",
};

export default function DirectoryNameTemplate() {
	const dispatch = useDispatch();
	const directoryNameTokens = useSelector(
		/**
		 * @param {{directoryNameTokens:string[]}} state
		 */ (state) => state.directoryNameTokens
	);

	const onClickAddButton = () =>
		dispatch(
			setDirectoryNameTokens([...directoryNameTokens, TokenOptionKeys.BLANK])
		);

	const onChangeTokenListItem = (i) => (e) => {
		const _directoryNameTokens = [...directoryNameTokens];
		_directoryNameTokens[i] = e.target.value;
		dispatch(setDirectoryNameTokens(_directoryNameTokens));
	};

	const onClickRemoveButton = (i) => () => {
		const _directoryNameTokens = [...directoryNameTokens];
		_directoryNameTokens.splice(
			//	remove the item at index i (the index of the entry of the button clicked)
			i,
			1,
			...(_directoryNameTokens.length === 1 ? [TokenOptionKeys.BLANK] : []) //	if we're removing the last item, replace it with a blank item
		);
		dispatch(setDirectoryNameTokens(_directoryNameTokens));
	};

	//	FIXME: unsatisfiable tokens (like subtype) that will return blank string should be marked / disabled?

	const renderTokenListItem = (value, i) => (
		<li key={i}>
			<select value={value} onChange={onChangeTokenListItem(i)}>
				<option value={TokenOptionKeys.BLANK} disabled hidden>
					Select a token
				</option>
				{Object.entries(tokenOptions).map(([value, label]) => (
					<option value={value} key={value}>
						{label}
					</option>
				))}
			</select>
			<button type="button" onClick={onClickRemoveButton(i)}>
				Remove
			</button>
		</li>
	);

	return (
		<form>
			<ol>{directoryNameTokens.map(renderTokenListItem)}</ol>
			<button type="button" name="add" onClick={onClickAddButton}>
				Add Token
			</button>
		</form>
	);
}

//	https://jqueryui.com/sortable/#default ?

import { TOKEN_OPTION } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { setDirectoryNameTokens } from "../state/directoryNameTokensSlice";
import store from "../state/store";
import { ChangeEvent } from "react";

/*
	each line item is a select dropdown of tokens
	each line item can be deleted or reselected
	there's an 'add token' button that adds a new line item
	each change to a line item updates the directory name preview
	there's a 'reset' button that resets the directory name preview to the default
*/

const tokenOptionLabels = {
	//	we'll do TokenOptionKeys.BLANK manually in the renderTokenListItem function so we can disable it and use it as a placeholder
	[TOKEN_OPTION.SITE_NAME]: "Site Name",
	[TOKEN_OPTION.SITE_ABRV]: "Site Abbreviation",
	[TOKEN_OPTION.BATTLE_NAME]: "Battle Name",
	[TOKEN_OPTION.BATTLE_ID]: "Battle ID",
	[TOKEN_OPTION.BATTLE_TYPE]: "Battle Type",
	[TOKEN_OPTION.BATTLE_SUBTYPE]: "Battle Subtype",
	[TOKEN_OPTION.BATTLE_FORMATS]: "Battle Formats",
	[TOKEN_OPTION.BATTLE_HOST_ID]: "Battle Host ID",
	[TOKEN_OPTION.BATTLE_HOST_NAME]: "Battle Host Name",
	[TOKEN_OPTION.BATTLE_START_DATE]: "Battle Start Date",
};

export default function DirectoryNameTemplate() {
	const dispatch: typeof store.dispatch = useDispatch();
	const directoryNameTokens = useSelector(
		(state: ReturnType<typeof store.getState>) => state.directoryNameTokens
	);

	const onClickAddButton = () =>
		dispatch(
			setDirectoryNameTokens([...directoryNameTokens, TOKEN_OPTION.BLANK])
		);

	const onChangeTokenListItem = (index: number) => (e: ChangeEvent) => {
		const _directoryNameTokens = [...directoryNameTokens];
		_directoryNameTokens[index] = (e.target as HTMLSelectElement)
			.value as unknown as TOKEN_OPTION;
		dispatch(setDirectoryNameTokens(_directoryNameTokens));
	};

	const onClickRemoveButton = (index: number) => () => {
		const _directoryNameTokens = [...directoryNameTokens];
		_directoryNameTokens.splice(
			//	remove the item at index i (the index of the entry of the button clicked)
			index,
			1,
			...(_directoryNameTokens.length === 1 ? [TOKEN_OPTION.BLANK] : []) //	if we're removing the last item, replace it with a blank item
		);
		dispatch(setDirectoryNameTokens(_directoryNameTokens));
	};

	//	FIXME: unsatisfiable tokens (like subtype) that will return blank string should be marked / disabled?

	const mapTokenToRenderListItem = (value: TOKEN_OPTION, index: number) => (
		<li key={index}>
			<select value={value} onChange={onChangeTokenListItem(index)}>
				<option value={TOKEN_OPTION.BLANK} disabled hidden>
					Select a token
				</option>
				{Object.entries(tokenOptionLabels).map(([value, label]) => (
					<option value={value} key={value}>
						{label}
					</option>
				))}
			</select>
			<button type="button" onClick={onClickRemoveButton(index)}>
				Remove
			</button>
		</li>
	);

	return (
		<form>
			<ol>{directoryNameTokens.map(mapTokenToRenderListItem)}</ol>
			<button type="button" name="add" onClick={onClickAddButton}>
				Add Token
			</button>
		</form>
	);
}

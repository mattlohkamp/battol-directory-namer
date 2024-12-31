//	TODO: break out start / end elements into more granular segments?
//	TODO: generate these from a model

import { useSelector } from "react-redux";
import { selectBattleDetails } from "./battleDataSlice.js";
import { APIBattleTypeLabels } from "../constants.js";

export default function BattleDetails() {
	const battleDetails = useSelector(selectBattleDetails);
	return battleDetails ? (
		<>
			<img
				id="host-avatar"
				width="150"
				src={battleDetails.hostAvatar}
				alt={battleDetails.host}
			/>
			<img
				id="battle-cover-art"
				width="150"
				src={battleDetails.coverArt}
				alt={`${battleDetails.title} (${
					APIBattleTypeLabels[battleDetails.type]
				})`}
			/>
			<dl>
				<div id="battle-site">
					<dt>Site</dt>
					<dd>BotB</dd>
				</div>
				<div id="battle-type">
					<dt>Type</dt>
					<dd>{APIBattleTypeLabels[battleDetails.type]}</dd>
				</div>
				<div id="battle-subtype">
					<dt>Subtype</dt>
					<dd>{battleDetails.subtype}</dd>
				</div>
				<div id="battle-id">
					<dt>ID</dt>
					<dd>{battleDetails.id}</dd>
				</div>
				<div id="battle-host">
					<dt>Host</dt>
					<dd>{battleDetails.host ?? `BotBr ID#${battleDetails.hostID}`}</dd>
				</div>
				<div id="battle-title">
					<dt>Title</dt>
					<dd>{battleDetails.title}</dd>
				</div>
				<div id="battle-formats">
					<dt>Format(s)</dt>
					<dd>{battleDetails.formats}</dd>
				</div>
				<div id="battle-start">
					<dt>Start</dt>
					<dd>{battleDetails.start.toString()}</dd>
				</div>
				<div id="battle-end">
					<dt>End</dt>
					<dd>{battleDetails.end.toString()}</dd>
				</div>
			</dl>
		</>
	) : undefined; //	TODO: loading / error / empty state
}

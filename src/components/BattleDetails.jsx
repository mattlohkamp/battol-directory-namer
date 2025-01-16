import { useSelector } from "react-redux";
import {
	APIBattleTypeLabels,
	getAvatarURL,
	getUserProfileURL,
} from "../constants.js";
import selectBattleDetails from "../state/selectBattleDetails.js";

export default function BattleDetails() {
	const battleDetails = useSelector(selectBattleDetails);
	return battleDetails ? (
		<>
			<a href={battleDetails.hostURL}>
				<img
					id="host-avatar"
					width="150"
					src={getAvatarURL(battleDetails.hostAvatarSrc)}
					alt={battleDetails.hostName}
				/>
			</a>
			<a href={battleDetails.battleURL}>
				<img
					id="battle-cover-art"
					width="150"
					src={battleDetails.battleCoverSrc}
					alt={`${battleDetails.battleName} (${
						APIBattleTypeLabels[battleDetails.battleType]
					})`}
				/>
			</a>
			<dl>
				<div id="battle-site">
					<dt>Site</dt>
					<dd>{battleDetails.siteName}</dd>
				</div>
				{/*	TODO: link to type and subtype lyceum pages	*/}
				<div id="battle-type">
					<dt>Type</dt>
					<dd>{APIBattleTypeLabels[battleDetails.battleType]}</dd>
				</div>
				<div id="battle-subtype">
					<dt>Subtype</dt>
					<dd>{battleDetails.battleSubtype}</dd>
				</div>
				<div id="battle-id">
					<dt>ID</dt>
					<dd>{battleDetails.battleID}</dd>
				</div>
				<div id="battle-host">
					<dt>Host</dt>
					<dd>
						<a href={battleDetails.hostURL}>{battleDetails.hostName}</a>
					</dd>
				</div>
				<div id="battle-title">
					<dt>Title</dt>
					<dd>{battleDetails.battleName}</dd>
				</div>
				<div id="battle-formats">
					<dt>Format(s)</dt>
					{/*	TODO: include format icons, link to format lyceum pages?	*/}
					<dd>{battleDetails.battleFormats.join(", ")}</dd>
				</div>
				{/*	TODO: break out start / end elements into more granular segments?	*/}
				<div id="battle-start">
					<dt>Start</dt>
					<dd>{battleDetails.battleStartDate.toString()}</dd>
				</div>
				<div id="battle-end">
					<dt>End</dt>
					<dd>{battleDetails.battleEndDate.toString()}</dd>
				</div>
			</dl>
		</>
	) : (
		<p>loading...</p>
	); //	TODO: loading / error / empty state
}

import { useSelector } from "react-redux";
import { selectBattleDetails } from "../state/battleDataSlice.js";
import { APIBattleTypeLabels, getUserProfileURL } from "../constants.js";

export default function BattleDetails() {
	const battleDetails = useSelector(selectBattleDetails);
	return battleDetails ? (
		<>
			<a href={getUserProfileURL(battleDetails.host)}>
				<img
					id="host-avatar"
					width="150"
					src={battleDetails.hostAvatar}
					alt={battleDetails.host}
				/>
			</a>
			<a href={battleDetails.url}>
				<img
					id="battle-cover-art"
					width="150"
					src={battleDetails.coverArt}
					alt={`${battleDetails.title} (${
						APIBattleTypeLabels[battleDetails.type]
					})`}
				/>
			</a>
			<dl>
				<div id="battle-site">
					<dt>Site</dt>
					<dd>BotB</dd>
				</div>
				{/*	TODO: link to type and subtype lyceum pages	*/}
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
					<dd>
						<a href={getUserProfileURL(battleDetails.host)}>
							{battleDetails.host ?? `BotBr ID#${battleDetails.hostID}`}
						</a>
					</dd>
				</div>
				<div id="battle-title">
					<dt>Title</dt>
					<dd>{battleDetails.title}</dd>
				</div>
				<div id="battle-formats">
					<dt>Format(s)</dt>
					{/*	TODO: include format icons, link to format lyceum pages?	*/}
					<dd>{battleDetails.formats.join(", ")}</dd>
				</div>
				{/*	TODO: break out start / end elements into more granular segments?	*/}
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
	) : (
		<p>loading...</p>
	); //	TODO: loading / error / empty state
}

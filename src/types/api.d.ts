import { BATTLE_TYPE } from "../constants";

//	TODO: see if this can be interpolated from API spec or openAPI or something?

//	TODO: deal with all the strigified numbers?

export interface APIBattleCurrent {
	profileURL: string;
	cover_art_url: string;
	botbr_id: string; // uint
	end: string; // yyyy-mm-dd hh:mm:ss
	end_date: string; // yyyy-mm-dd
	end_time_left: string; // yyyy-mm-dd hh:mm:ss
	entry_count: string; // uint
	format_tokens: string[];
	hosts_names: string;
	id: string; // uint
	period: string; //	TODO: enum
	period_end: string; // yyyy-mm-dd hh:mm:ss
	period_end_date: string; // yyyy-mm-dd
	period_end_seconds: number; // uint
	period_end_time_left: string; // 11h 11m 11s
	profile_url: string;
	start: string; // yyyy-mm-dd hh:mm:ss
	title: string;
	type: BATTLE_TYPE; //	stringified uint
	url: string;
}

export type APIBattleLoad = Omit<
	//	period missing from load endpoint for some reason
	APIBattleCurrent,
	| "period"
	| "period_end"
	| "period_end_date"
	| "period_end_seconds"
	| "period_end_time_left"
>;

export type APIBotbrLoad = {
	aura: string; // mystery coords? "00014214",
	aura_color: string; // #rgbhex
	avatar_url: string;
	badge_levels: {
		[key: string]: number;
	};
	boons: string; //	float
	class: string;
	class_icon: string; // escaped HTML tag
	create_date: string; //	yy-mm-dd
	id: string; // uint
	laston_date: string; //	yy-mm-dd
	level: string; //uint
	name: string;
	palette_id: string; // uint
	points: string; //uint
	points_array: {
		[key: string]: string; // uint
	};
	profile_url: string;
};

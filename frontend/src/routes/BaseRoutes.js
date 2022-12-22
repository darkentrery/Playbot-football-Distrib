

const BaseRoutes = {

	get events () {
		return "/events/";
	},

	get main () {
		return "/";
	},

	get statistic () {
		return "/statistic/";
	},

	get faq () {
		return "/faq/";
	},

	get description () {
		return "/events/description/";
	},

	get members () {
		return "/events/members/";
	},

	get chat () {
		return "/events/chat/";
	},

	eventLink (pk) {
		return `/events/event/${pk}/`;
	},

	get event () {
		return `/events/event/:pk/`;
	},

	get allowPolicy () {
		return "/allow-policy/";
	},

	get allowOffer () {
		return "/allow-offer/";
	},

	get eventInfo () {
		return `/events/event/:pk/info/`;
	},

	eventInfoLink (pk) {
		return `/events/event/${pk}/info/`;
	},

	get eventInfoTeams () {
		return `/events/event/:pk/teams/`;
	},

	eventInfoTeamsLink (pk) {
		return `/events/event/${pk}/teams/`;
	},


}
export default BaseRoutes;

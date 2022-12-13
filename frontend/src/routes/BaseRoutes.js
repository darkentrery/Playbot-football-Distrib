

const BaseRoutes = {

	get events () {
		return "events/";
	},

	get main () {
		return "/";
	},

	get description () {
		return "events/description/";
	},

	get members () {
		return "events/members/";
	},

	get chat () {
		return "events/chat/";
	},

	eventLink (pk) {
		return `event/${pk}/`;
	},

	get event () {
		return `events/event/:pk/`;
	},

	get allowPolicy () {
		return "allow-policy/";
	},

	get allowOffer () {
		return "allow-offer/";
	},


}
export default BaseRoutes;

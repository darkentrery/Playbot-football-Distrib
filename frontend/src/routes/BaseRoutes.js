

const BaseRoutes = {

	get events () {
		return "events/";
	},

	get main () {
		return "/"
	},

	get description () {
		return "events/description/"
	},

	get members () {
		return "events/members/"
	},

	get chat () {
		return "events/chat/"
	},

	eventLink (pk) {
		return `event/${pk}/`
	},


}
export default BaseRoutes;
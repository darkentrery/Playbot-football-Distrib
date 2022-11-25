

const BaseRoutes = {
	eventPk: 1,

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

	get event() {
		return `events/event/${this.eventPk}/`
	},

	eventLink (pk) {
		return `events/event/${pk}/`
	},

	set event(pk) {
		this.eventPk = pk;
	},

}
export default BaseRoutes;

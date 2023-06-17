

const BaseRoutes = {
	get events () {return "/events/";},
	get main () {return "/";},
	get statistic () {return "/statistic/";},
	get faq () {return "/faq/";},
	get description () {return "/events/description/";},
	get members () {return "/events/members/";},
	get chat () {return "/events/chat/";},
	eventLink (pk) {return `/events/event/${pk}/`;},
	get event () {return `/events/event/:pk/`;},
	get allowPolicy () {return "/allow-policy/";},
	get allowOffer () {return "/allow-offer/";},
	get eventInfo () {return `/events/event/:pk/info/`;},
	eventInfoLink (pk) {return `/events/event/${pk}/info/`;},
	get eventInfoTeams () {return `/events/event/:pk/teams/`;},
	eventInfoTeamsLink (pk) {return `/events/event/${pk}/teams/`;},
	get eventGamePlayer () {return `/events/event/:pk/player-game/:gameId/`;},
	eventGamePlayerLink (pk, gameId) {return `/events/event/${pk}/player-game/${gameId}/`;},
	get rules () {return `/rules/`;},
	get telegramShare () {return `https://t.me/playbot_community`;},
	get instagramShare () {return `https://instagram.com/playbot.io?igshid=YWJhMjlhZTc=`;},
	get landing () {return `/land/`;},
	get confirmSignUp () {return `/confirm-sign-up/:userSlug/`;},
}
export default BaseRoutes;

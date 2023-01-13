const EventRoutes = {
    get events () {return "/events/";},
    get description () {return "/events/description/";},
	get members () {return "/events/members/";},
	get chat () {return "/events/chat/";},
	eventLink (pk) {return `/events/event/${pk}/`;},
	get event () {return `/events/event/:pk/`;},
    get eventInfo () {return `/events/event/:pk/info/`;},
	eventInfoLink (pk) {return `/events/event/${pk}/info/`;},
	get eventInfoTeams () {return `/events/event/:pk/teams/`;},
	eventInfoTeamsLink (pk) {return `/events/event/${pk}/teams/`;},
	get eventGamePlayer () {return `/events/event/:pk/player-game/:gameId/`;},
	eventGamePlayerLink (pk, gameId) {return `/events/event/${pk}/player-game/${gameId}/`;},
}

export default EventRoutes;
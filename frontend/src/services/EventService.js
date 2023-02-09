import axios from 'axios';
import {csrftoken} from "./CsrfService";


const API_URL = process.env.REACT_APP_API_URL + "events/";


const postRequest = (url, data) => {
	url = `${API_URL}${url}`;
	return axios.post(url, data, {headers: {
		'Content-Type': 'application/json',
		'X-CSRFToken': csrftoken,
		'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
	}})
		.then((response) => {
			return response;
		})
		.catch((error) => {
			return error.response;
		});
}

const getRequest =(url, data=false) => {
	if (data && typeof data === "string") {
		url = `${API_URL}${url}${data}/`;
	} else {
		url = `${API_URL}${url}`;
	}
	return axios.get(url, {headers: {
		'Content-Type': 'application/json',
		'X-CSRFToken': csrftoken,
	}})
		.then((response) => {
			return response;
		})
		.catch((error) => {
			return error.response;
		});
}

export const eventService = {
	createEvent(data) { return postRequest('create/', data); },
	editEvent(data) { return postRequest('edit/', data); },
	cancelEvent(data) { return postRequest('cancel-event/', data); },
	endEvent(data) { return postRequest('end-event/', data); },
	confirmPlayers(data) { return postRequest('confirm-players/', data); },
	toConfirmPlayers(data) { return postRequest('to-confirm-players/', data); },
	confirmTeamPlayers(data) { return postRequest('confirm-team-players/', data); },
	confirmTeams(data) { return postRequest('confirm-teams/', data); },
	beginGamePeriod(data) { return postRequest('begin-game-period/', data); },
	endGamePeriod(data) { return postRequest('end-game-period/', data); },
	beginEventGame(data) { return postRequest('begin-event-game/', data); },
	endGame(data) { return postRequest('end-game/', data); },
	createGoal(data) { return postRequest('create-goal/', data); },
	setRegulation(data) { return postRequest('set-regulation/', data); },
	joinPlayer(data) { return postRequest('join-player/', data); },
	leaveEvent(data) { return postRequest('leave-event/', data); },
	getEvents(data) { return getRequest('get-events/', data); },
	getCancelReasons() { return getRequest('get-cancel-reasons/'); },
	getRegulation(id) { return getRequest('get-regulation/', id.toString()); },
	getEvent(id) { return getRequest('get-event/', id); },
	addToFavorites(data) { return postRequest('add-to-favorites/', data); },
	removeFromFavorites(data) { return postRequest('remove-from-favorites/', data); },
	isFavorite(user, event) {
		let isFavorite = false;
		user.favorite_events.forEach((e) => {
			if (e.id === event.id) isFavorite = true;
		})
		return isFavorite;
	},
}
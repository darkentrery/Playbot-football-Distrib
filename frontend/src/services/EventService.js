import axios from 'axios';
import {csrftoken} from "./CsrfService";
import $ from "jquery";


const API_URL = process.env.REACT_APP_API_URL + "events/";


export default class EventService{

    constructor(){}

    getCreateEvent(){
		const url = `${API_URL}create/`;
		return axios.get(url, {headers: {
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

	// getEvents(city){
	// 	const url = `${API_URL}get-events/`;
	// 	return axios.post(url, {"city": city}, {headers: {
	// 		'Content-Type': 'application/json',
    //         'X-CSRFToken': csrftoken,
	// 	}})
	// 		.then((response) => {
	// 			return response;
	// 		})
	// 		.catch((error) => {
	// 			return error.response;
	// 		});
	// }

	getEvent(id){
		const url = `${API_URL}get-event/${id}/`;
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

	createEvent(event){
		const url = `${API_URL}create/`;
		return axios.post(url, event, {headers: {
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

	editEvent(event){
		const url = `${API_URL}edit/`;
		return axios.post(url, event, {headers: {
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

	cancelEvent(event){
		const url = `${API_URL}cancel-event/`;
		return axios.post(url, event, {headers: {
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

	toConfirmPlayers(event){
		const url = `${API_URL}to-confirm-players/`;
		return axios.post(url, event, {headers: {
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

	confirmPlayers(data){
		const url = `${API_URL}confirm-players/`;
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

	getRegulation(id){
		const url = `${API_URL}get-regulation/${id}/`;
		return axios.get(url,  {headers: {
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

	setRegulation(data){
		const url = `${API_URL}set-regulation/`;
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

	confirmTeamPlayers(data){
		const url = `${API_URL}confirm-team-players/`;
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

	confirmTeams(data){
		const url = `${API_URL}confirm-teams/`;
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

	getCancelReasons(){
		const url = `${API_URL}get-cancel-reasons/`;
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

	joinPlayer(event){
		const url = `${API_URL}join-player/`;
		return axios.post(url, event, {headers: {
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

	leaveEvent(data){
		const url = `${API_URL}leave-event/`;
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

	beginEventGame(data){
		const url = `${API_URL}begin-event-game/`;
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

	endEvent(data){
		const url = `${API_URL}end-event/`;
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

	createEventRequestValidation(name, date, time, address, city, point, notice, refs){
		let errors = [];
		["name", "address", "notice", "date", "time"].forEach(elem => {
			$(refs[elem].current).find('input').removeClass('error');
			$(refs[elem].current).children('span').removeClass('error');
			$(refs[elem].current).children('span').html('');
		});

		if (!name) {
			errors.push("name");
		}
		if (!date) {
			errors.push("date");
		}
		if (!time) {
			errors.push("time");
		}
		if (!address || !city || !point) {
			errors.push("address");
		}

		errors.forEach(error => {
			$(refs[error].current).children('span').addClass('error');
			$(refs[error].current).children('span').html('Заполните поле!');
			$(refs[error].current).find('input').addClass('error');
		})
		return errors;
	}

}

const postRequest =(url, data) => {
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
	confirmPlayers(data) { return postRequest('confirm-players/', data); },
	beginGamePeriod(data) { return postRequest('begin-game-period/', data); },
	endGamePeriod(data) { return postRequest('end-game-period/', data); },
	endGame(data) { return postRequest('end-game/', data); },
	createGoal(data) { return postRequest('create-goal/', data); },
	getEvents(data) { return getRequest('get-events/', data); },
}
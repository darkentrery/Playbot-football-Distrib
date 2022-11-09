import axios from 'axios';


const API_URL = process.env.REACT_APP_API_URL + "events/";


function getCookie(name) {
	let cookieValue = null;
	if (document.cookie && document.cookie !== '') {
		let cookies = document.cookie.split(';');
		for (let i = 0; i < cookies.length; i++) {
			let cookie = cookies[i].trim();
			// Does this cookie string begin with the name we want?
			if (cookie.substring(0, name.length + 1) === (name + '=')) {
				cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
				break;
			}
		}
	}
	return cookieValue;
}
const csrftoken = getCookie('csrftoken');


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
}
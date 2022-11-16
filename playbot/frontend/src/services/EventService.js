import axios from 'axios';
import {csrftoken} from "./CsrfService";


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

}
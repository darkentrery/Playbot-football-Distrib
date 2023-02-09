import axios from "axios";
import {csrftoken} from "./CsrfService";

const API_URL = process.env.REACT_APP_API_URL + "cities/";


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

export const cityService = {
	getCities() { return getRequest('get-cities/'); },
}
import axios from "axios";
import {csrftoken} from "./CsrfService";


const API_URL = process.env.REACT_APP_API_URL + "notices/";

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

export const noticeService = {
	hiddeNotice(data) { return postRequest('hidde-notice/', data); },
}
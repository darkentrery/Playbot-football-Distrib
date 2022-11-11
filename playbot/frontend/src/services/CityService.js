import axios from "axios";
import {csrftoken} from "./CsrfService";

const API_URL = process.env.REACT_APP_API_URL + "cities/";


export default class CityService{

    constructor(){}

	getCities(){
		const url = `${API_URL}get-cities/`;
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
}
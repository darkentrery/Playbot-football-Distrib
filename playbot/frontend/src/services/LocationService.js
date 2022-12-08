import axios from "axios";


export const getLocations = (value) => {
    let url = `https://geocode-maps.yandex.ru/1.x/?apikey=a9f0a35a-be0f-42f8-a5e3-e4eb50216aa5&format=json&geocode=${value}`
    return axios.get(url, {headers: {
			'Content-Type': 'application/json',
		}})
			.then((response) => {
				return response;
			})
			.catch((error) => {
				return error.response;
			});
}
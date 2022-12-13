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

	getEvents(city){
		const url = `${API_URL}get-events/`;
		return axios.post(url, {"city": city}, {headers: {
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

	replaceAt (val, i) {
		val = val.substring(0, i) + '' + val.substring(i + 1);
		return val;
	}

	choiceDate(e, setDate, refDate, setIncorrectDate, incorrectDate){
        if (typeof e == "string") {
            let val = e.replace(/\D/g, '');
            val = val.slice(0, 8);
            if (Number(val.slice(0, 1)) > 3) val = this.replaceAt(val, 0);
            if (Number(val.slice(0, 2)) > 31) val = this.replaceAt(val, 1);
            if (Number(val.slice(2, 3)) > 1) val = this.replaceAt(val, 2);
            if (Number(val.slice(2, 4)) > 12) val = this.replaceAt(val, 3);
            let formatVal = val;
            if (val.length > 2 && val.length < 5) {
                formatVal = `${val.slice(0, 2)}.${val.slice(2, 4)}`;
            } else if (val.length > 4) {
                formatVal = `${val.slice(0, 2)}.${val.slice(2, 4)}.${val.slice(4, 8)}`;
            }
            if (val.length === 8) {
                setDate(formatVal);
            } else {
				setDate(false);
			}
            refDate.current.setState({inputValue: formatVal})
        } else {
			let date = new Date(e.format("YYYY-MM-DD"));
			if (date.setDate(date.getDate() + 1) < Date.now()) {
				refDate.current.setState({open: true});
				setDate(false);
				setIncorrectDate(!incorrectDate);
			} else {
				setDate(e.format("YYYY-MM-DD"));
			}
        }
    }

	choiceTime(e, setTime, refTime){
		if (typeof e == "string") {
			let val = e.replace(/\D/g, '');
            val = val.slice(0, 4);
			if (Number(val.slice(0, 1)) > 2) val = this.replaceAt(val, 0);
			if (Number(val.slice(0, 2)) > 24) val = this.replaceAt(val, 1);
			if (Number(val.slice(2, 3)) > 6) val = this.replaceAt(val, 2);
            if (Number(val.slice(2, 4)) > 60) val = this.replaceAt(val, 3);
			let formatVal = val;
			if (val.length > 2 && val.length < 5) {
                formatVal = `${val.slice(0, 2)}:${val.slice(2, 4)}`;
            }
			if (val.length === 4) {
                setTime(formatVal);
            } else {
				setTime(false);
			}
            refTime.current.setState({inputValue: formatVal})
		} else {
			setTime(e.format("HH:mm"));
		}
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
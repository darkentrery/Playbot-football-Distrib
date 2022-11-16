import axios from 'axios';
import {csrftoken} from "./CsrfService";
import $ from "jquery";
import {isMobile} from "react-device-detect";


const API_URL = process.env.REACT_APP_API_URL;


export default class AuthService{

	constructor(){}

	async login(user){
		const url = `${API_URL}login/`;
		return axios.post(url, user, {headers: {
			'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
			// "Content-Type": "multipart/form-data"
		}})
			.then((response) => {
				localStorage.setItem("access_token" , response.data.access);
                localStorage.setItem("refresh_token" , response.data.refresh);
				localStorage.setItem("date_token", Date.now());
				return response;
			})
			.catch((error) => {
				return error.response;
			});
	}

	signUp(user){
		const url = `${API_URL}sign-up/`;
		return axios.post(url, user, {headers: {
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

	loginRequestValidation(email, password, refEmail, refPassword) {
		$(refEmail.current).children('input').removeClass('error');
		$(refEmail.current).children('span').removeClass('error');
		$(refEmail.current).children('span').html('');
		$(refPassword.current).children('input').removeClass('error');
		$(refPassword.current).children('span').removeClass('error');
		$(refPassword.current).children('span').html('');
		let errors = [];
		if (!email) {
			errors.push("email");
			$(refEmail.current).children('input').addClass('error');
			$(refEmail.current).children('span').addClass('error');
			$(refEmail.current).children('span').html('Заполните поле!');
		}
		if (!password) {
			errors.push("password");
			$(refPassword.current).children('input').addClass('error');
			$(refPassword.current).children('span').addClass('error');
			$(refPassword.current).children('span').html('Заполните поле!');
		}
		return errors;
	}

	loginResponseValidation(response, refEmail, refPassword) {
		let errors = [];
		if (response.status !== 200) {
			console.log(response.data.detail)
			if (response.data.detail === "No exists number!") {
				errors.push("email");
				$(refEmail.current).children('input').addClass('error');
				$(refEmail.current).children('span').addClass('error');
				$(refEmail.current).children('span').html('Пользователь с таким номером не зарегистрирован!');
			} else if (response.data.detail === "No exists email!") {
				errors.push("email");
				$(refEmail.current).children('input').addClass('error');
				$(refEmail.current).children('span').addClass('error');
				$(refEmail.current).children('span').html('Пользователь с таким email не зарегистрирован!');
			} else {
				errors.push("password");
				$(refPassword.current).children('input').addClass('error');
				$(refPassword.current).children('span').addClass('error');
				$(refPassword.current).children('span').html('Неверный пароль!');
			}
		}
		return errors;
	}

	signUpRequestValidation(name, phoneNumber, email, password, passwordConfirm, allowPolicy, allowOffer, refs, refsDict) {
		refs.forEach(ref => {
            $(ref.current).children('input').removeClass('error');
            $(ref.current).children('span').removeClass('error');
            $(ref.current).children('span').html('');
        })
        $(refsDict["allowPolicy"].current).find('.checkbox-div').removeClass('error');
        $(refsDict["allowOffer"].current).find('.checkbox-div').removeClass('error');

		let errors = [];
		if (name && email && password && passwordConfirm && allowPolicy && allowOffer) {
            if (password !== passwordConfirm) errors.push("noMatch");
        } else {
            if (!name) errors.push("username");
            // if (!phoneNumber) errors.set("phoneNumber", "phoneNumber");
            if (!email) errors.push("email");
            if (!password) errors.push("password");
            if (!passwordConfirm) errors.push("passwordConfirm");
            if (!allowPolicy) errors.push("allowPolicy");
            if (!allowOffer) errors.push("allowOffer");
        }

		if (errors.length) {
			errors.forEach(error => {
                if (error === "noMatch") {
                    $(refsDict["password"].current).children('input').addClass('error');
                    $(refsDict["password"].current).children('span').addClass('error');
                    $(refsDict["password"].current).children('span').html('Пароли не совпадают!');
                    $(refsDict["passwordConfirm"].current).children('input').addClass('error');
                    $(refsDict["passwordConfirm"].current).children('span').addClass('error');
                    $(refsDict["passwordConfirm"].current).children('span').html('Пароли не совпадают!');
                } else if (error === "allowPolicy") {
                    $(refsDict["allowPolicy"].current).find('.checkbox-div').addClass('error');
                } else if (error === "allowOffer") {
                    $(refsDict["allowOffer"].current).find('.checkbox-div').addClass('error');
                } else {
                   $(refsDict[error].current).children('input').addClass('error');
                   $(refsDict[error].current).children('span').addClass('error');
                   $(refsDict[error].current).children('span').html('Это поле обязательно для заполнения!');
                }
                console.log(error)
            })
		}

		return errors;
	}

	signUpResponseValidation(response, refsDict) {
		console.log(response)
		let errors = new Map();
		if (response.status !== 201) {
			["username", "phone_number", "email", "password"].forEach(field => {
				if (response.data[field]) errors.set(field, response.data[field]);
			})
			if (response.data["email"]) {
				$(refsDict["email"].current).children('input').addClass('error');
				$(refsDict["email"].current).children('span').addClass('error');
				if (response.data["email"][0] === "User с таким Email Address уже существует.") {
					$(refsDict["email"].current).children('span').html('Пользователь с таким email уже существует!');
				} else if (response.data["email"][0] === "Введите правильный адрес электронной почты.") {
					$(refsDict["email"].current).children('span').html('Введите правильный адрес электронной почты!');
				}
			}
			if (response.data["phone_number"]) {
				$(refsDict["phoneNumber"].current).children('input').addClass('error');
				$(refsDict["phoneNumber"].current).children('span').addClass('error');
				if (response.data["phone_number"] === "User with this phone_number already exists!") {
					$(refsDict["phoneNumber"].current).children('span').html('Пользователь с таким номером уже существует!');
				}
			}
		}
		return errors;
	}

	refreshPassword(user){
		const url = `${API_URL}refresh-password/`;
		return axios.post(url, user, {headers: {
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

	refresh(){
		const url = `${API_URL}token/refresh/`;
		return axios.post(url, {"refresh": localStorage.getItem("refresh_token")}, {headers: {
			'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
		}})
			.then((response) => {
				localStorage.setItem( 'access_token' , response.data.access);
                localStorage.setItem( 'refresh_token' , response.data.refresh);
				return response;
			})
			.catch((error) => {
				return error.response;
			});
	}

	async loginTelegram(user){
		const url = `${API_URL}telegram-login/`;
		return axios.post(url, user, {headers: {
			'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
		}})
			.then((response) => {
				// localStorage.setItem("access_token" , response.data.access);
                // localStorage.setItem("refresh_token" , response.data.refresh);
				// localStorage.setItem("date_token", Date.now());
				return response;
			})
			.catch((error) => {
				return error.response;
			});
	}

	updateCity(data){
		const url = `${API_URL}update-city/`;
		return axios.post(url, data,{headers: {
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

	addSafariBottomMargin(classSelector) {
		if (isMobile && window.screen.width < 743) {
			console.log(navigator.userAgent)
			console.log(navigator.userAgent.indexOf('Safari'))
			console.log(navigator.userAgent.indexOf('Chrome'))
			console.log(classSelector)
			console.log($('.popup-frame'))
			if (navigator.userAgent.indexOf('Chrome') == -1) {
				if ($('.popup-frame').find(classSelector).length) {
					$('.popup-frame').find(classSelector).addClass("safari-margin");
					return true;
				}
			}
			return false
		}
		return true;
	}

	getData(){
		const url = `${API_URL}data/`;
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

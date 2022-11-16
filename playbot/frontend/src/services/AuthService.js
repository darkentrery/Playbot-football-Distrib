import axios from 'axios';
import {csrftoken} from "./CsrfService";
import $ from "jquery";


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
            if (!name) errors.push("name");
            // if (!phoneNumber) errors.set("phoneNumber", "phoneNumber");
            if (!email) errors.push("email");
            if (!password) errors.push("password");
            if (!passwordConfirm) errors.push("passwordConfirm");
            if (!allowPolicy) errors.push("allowPolicy");
            if (!allowOffer) errors.push("allowOffer");
        }

		if (errors.length) {
			errors.forEach(error => {
                if (error == "noMatch") {
                    $(refsDict["password"].current).children('input').addClass('error');
                    $(refsDict["password"].current).children('span').addClass('error');
                    $(refsDict["password"].current).children('span').html('Пароли не совпадают!');
                    $(refsDict["passwordConfirm"].current).children('input').addClass('error');
                    $(refsDict["passwordConfirm"].current).children('span').addClass('error');
                    $(refsDict["passwordConfirm"].current).children('span').html('Пароли не совпадают!');
                } else if (error == "allowPolicy") {
                    $(refsDict["allowPolicy"].current).find('.checkbox-div').addClass('error');
                } else if (error == "allowOffer") {
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
			["name", "phone_number", "email", "password"].forEach(field => {
				if (response.data[field]) errors.set(field, response.data[field]);
			})
			if (response.data["email"]) {
				$(refsDict["email"].current).children('input').addClass('error');
				$(refsDict["email"].current).children('span').addClass('error');
				if (response.data["email"][0] == "User с таким Email Address уже существует.") {
					$(refsDict["email"].current).children('span').html('Пользователь с таким email уже существует!');
				} else if (response.data["email"][0] == "Введите правильный адрес электронной почты.") {
					$(refsDict["email"].current).children('span').html('Введите правильный адрес электронной почты!');
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



	getArticles() {
		const url = `${API_URL}/api/articles/`;
		return axios.get(url).then(response => response.data);
	}
	getArticlesByURL(link){
		const url = `${API_URL}${link}`;
		return axios.get(url).then(response => response.data);
	}
	getArticle(pk) {
		const url = `${API_URL}/api/articles/${pk}`;
		return axios.get(url).then(response => response.data);
	}
	deleteArticle(article){
		const url = `${API_URL}/api/articles/${article.pk}`;
		return axios.delete(url);
	}
	createArticle(article){
		const url = `${API_URL}/api/articles/`;
		return axios.post(url, article, {headers: { "Content-Type": "multipart/form-data" }});
	}
	updateArticle(article){
		const url = `${API_URL}/api/articles/${article.pk}`;
		return axios.put(url,article);
	}
}

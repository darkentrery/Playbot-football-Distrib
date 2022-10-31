import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;

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


export default class AuthService{

	constructor(){}

	login(user){
		const url = `${API_URL}login/`;
		return axios.post(url, user, {headers: {
			'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
			// "Content-Type": "multipart/form-data"
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

	signUp(user){
		const url = `${API_URL}sign-up/`;
		return axios.post(url, user, {headers: {
			'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
			// "Content-Type": "multipart/form-data"
		}})
			.then((response) => {
				return response;
			})
			.catch((error) => {
				return error.response;
			});
	}

	signUpRequestValidation(name, phoneNumber, email, password, passwordConfirm, allowPolicy, allowOffer) {
		let errors = new Map();
		if (name && phoneNumber && email && password && passwordConfirm && allowPolicy && allowOffer) {
            if (password !== passwordConfirm) errors.set("password", "noMatch");

        } else {
            if (!name) errors.set("name", "name");
            if (!phoneNumber) errors.set("phoneNumber", "phoneNumber");
            if (!email) errors.set("email", "email");
            if (!password) errors.set("password", "password");
            if (!passwordConfirm) errors.set("passwordConfirm", "passwordConfirm");
            if (!allowPolicy) errors.set("allowPolicy", true);
            if (!allowOffer) errors.set("allowOffer", true);
        }
		return errors;
	}

	signUpResponseValidation(response) {
		console.log(response)
		let errors = new Map();
		if (response.status !== 201) {
			["name", "phone_number", "email", "password"].forEach(field => {
				if (response.data[field]) errors.set(field, response.data[field]);
			})

		}
		return errors;
	}

	refresh(refreshToken){
		const url = `${API_URL}token/refresh/`;
		return axios.post(url, {"refresh": refreshToken}, {headers: {
			'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
			// "Content-Type": "multipart/form-data"
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


	setUser(user) {
		const url = `${API_URL}/api/articles/`;
		return axios.post(url, user, {headers: { "Content-Type": "multipart/form-data" }});
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

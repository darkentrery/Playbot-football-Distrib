import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;


export default class AuthService{

	constructor(){}

	login(user){
		const url = `${API_URL}login/`;
		return axios.post(url, user, {headers: { "Content-Type": "multipart/form-data" }})
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
		return axios.post(url, user, {headers: { "Content-Type": "multipart/form-data" }})
			.then((response) => {
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

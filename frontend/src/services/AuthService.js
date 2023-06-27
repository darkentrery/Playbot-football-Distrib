import axios from 'axios';
import {csrftoken} from "./CsrfService";
import $ from "jquery";
import {isMobile} from "react-device-detect";
import {noticeService} from "./NoticeService";


const API_URL = process.env.REACT_APP_API_URL;
const MAIN_URL = process.env.REACT_APP_MAIN_URL;


export default class AuthService{

	constructor(){}

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

	loginRequestValidation(email, password, setEmailError, setPasswordError) {
		let errors = [];
		if (!email) {
			errors.push("email");
			setEmailError('Заполните поле!');
		}
		if (!password) {
			errors.push("password");
			setPasswordError('Заполните поле!');
		}
		return errors;
	}

	loginResponseValidation(response, setEmailError, setPasswordError) {
		let errors = [];
		if (response.status !== 200) {
			if (response.data.detail === "No exists number!") {
				errors.push("email");
				setEmailError('Пользователь с таким номером не зарегистрирован!');
			} else if (response.data.detail === "No exists email!") {
				errors.push("email");
				setEmailError('Пользователь с таким email не зарегистрирован!');
			} else if (response.data.detail === "Is not active!") {
				errors.push("email");
				setEmailError('Активируйте ваш аккаунт по ссылке из письма!');
			} else {
				errors.push("password");
				setPasswordError('Неверный пароль!');
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
            })
		}

		return errors;
	}

	signUpResponseValidation(response, refsDict) {
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
			if (response.data["username"]) {
				$(refsDict["username"].current).children('input').addClass('error');
				$(refsDict["username"].current).children('span').addClass('error');
				if (response.data["username"][0] === "User с таким Имя пользователя уже существует.") {
					$(refsDict["username"].current).children('span').html('Пользователь с username уже существует!');
				}
			}
		}
		return errors;
	}

	addIPhoneBottomMargin(classSelector) {
		console.log("Is Iphone", this.isIPhone())
		console.log("Is PWA", this.isPWA())

		if (isMobile && window.screen.width < 743 && this.isIPhone() && !this.isPWA()) {
			console.log(classSelector)
			if ($('.popup-frame').find(classSelector).length) {
				$('.popup-frame').find(classSelector).addClass("safari-margin");
				return true;
			}
			return false
		}
		return true;
	}


	searchCountry(event, refCountryBody, countryTag, setCountryTag, setPhoneCode){
        let children = refCountryBody.current.children;
        let val = event.target.value;
        let newCountry = [];
        let allCountries = [];

        if (countryTag.length < children.length) {
            for (let i=0; i<children.length; i++) {
                allCountries.push(children[i])
            }
            setCountryTag(allCountries);
        }
        countryTag.forEach(elem => {
            $(elem).attr('class', 'dropdown-elem');
        })
        setPhoneCode(false);
        if (countryTag.length) {
            countryTag.forEach(elem => {
                if ($(elem).html().toLowerCase().includes(val.toLowerCase())) newCountry.push(elem);
            })
        } else {
            for (let i=0; i<children.length; i++) {
                if ($(children[i]).html().toLowerCase().includes(val.toLowerCase())) newCountry.push(children[i]);
            }
        }

        $(refCountryBody.current).html('');
        newCountry.forEach(elem => {
            $(refCountryBody.current).append(elem);
        })
    }

	getCountries(setBanner){
		const url = `https://restcountries.com/v3.1/all`;
		return axios.get(url, {headers: {
			'Content-Type': 'application/json',
		}})
			.then((response) => {
				let newList = [];
				for (let i in response.data) {
                    let country = response.data[i];
					if (country.translations["rus"]["common"] && country.idd.root && country.flags.png
						&& country.translations["rus"]["common"] !== "Центральноафриканская Республика") {
						newList.push([country.translations["rus"]["common"], country.idd.root, country.flags.png]);
						if (country.translations["rus"]["common"] === "Россия") setBanner(country.flags.png);
					}
                }
				return newList;
			})
			.catch((error) => {
				return error.response;
			});
	}
}

const postRequest = (url, data, contentType='application/json') => {
	url = `${API_URL}${url}`;
	let headers = {
		'Content-Type': contentType,
		'X-CSRFToken': csrftoken,
		// 'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
	}
	if (localStorage.getItem("access_token")) {
		headers.Authorization = `Bearer ${localStorage.getItem("access_token")}`;
	}
	return axios.post(url, data, {headers: headers})
		.then((response) => {
			return response;
		})
		.catch((error) => {
			return error.response;
		});
}

const getRequest = (url, data=false) => {
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

export const authService = {
	saveLoginCredentials(response) {
		if (response.status === 200) {
			localStorage.setItem("access_token", response.data.access);
			localStorage.setItem("refresh_token", response.data.refresh);
			localStorage.setItem("date_token", Date.now());
			noticeService.registerSw();
		}
		return response;
	},
	getUsers() { return getRequest('get-users/'); },
	getTop10Users() { return getRequest('get-top-10-users/'); },
	getUser(pk) { return getRequest('get-user/', pk); },
	updateUser(data) { return postRequest('update-user/', data, "multipart/form-data"); },
	checkUserPhoto(data) { return postRequest('check-user-photo/', data, "multipart/form-data"); },
	confirmUserPhoto(data) { return postRequest('confirm-user-photo/', data); },
	cancelUserPhoto() { return postRequest('cancel-user-photo/', {}); },
	updatePhotoUsername(data) { return postRequest('update-photo-username/', data, "multipart/form-data"); },
	updateAddress(data) { return postRequest('update-address/', data); },
	firstLogin() { return postRequest('first-login/', {}); },
	updatePassword(data) { return postRequest('update-password/', data); },
	refreshPassword(data) { return postRequest('refresh-password/', data); },
	deleteUser(data) { return postRequest('delete-user/', data); },
	login(user) { return postRequest('login/', user).then(this.saveLoginCredentials); },
	logout() {
		localStorage.removeItem("access_token");
		localStorage.removeItem("refresh_token");
		window.location.href = `${process.env.REACT_APP_MAIN_URL}`;
	},
	confirmSignUp(pathName) { return postRequest(`${pathName.slice(1,)}`).then(this.saveLoginCredentials); },
	isAuth(data) { return postRequest('is-auth/', data); },
	isIPhone() {
		if (navigator.appVersion.includes("iPhone") && navigator.userAgent.includes("iPhone")) {
			return true;
		}
		return false;
	},
	isPWA() {
		if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator.standalone)) {
			return true;
		}
		return false;
	},
	isSafari() {
		if (/safari/.test(navigator.userAgent.toLowerCase())) {
			return true;
		}
		return false;
	},
	deviceDetect() {
		console.log("Is Iphone", this.isIPhone())
		console.log("Is PWA", this.isPWA())
		console.log("Is Safari", this.isSafari())
		if (isMobile && window.screen.width < 743 && this.isIPhone() && !this.isPWA() && this.isSafari()) {
			return true
		}
		return false;
	},
	appleLogin(data) { return postRequest('apple-login/', data).then(this.saveLoginCredentials); },
	appleSignUp(data) { return postRequest('apple-sign-up/', data).then(this.saveLoginCredentials); },
	refresh(){ return postRequest('token/refresh/', {"refresh": localStorage.getItem("refresh_token")}).then(this.saveLoginCredentials); },
	telegramLogin(data) { return postRequest('telegram-login/', data).then(this.saveLoginCredentials); },
	telegramAppLogin(data) { return postRequest('telegram-app-login/', data).then(this.saveLoginCredentials); },
	catchError(data) { return postRequest('catch-error/', data); },
}

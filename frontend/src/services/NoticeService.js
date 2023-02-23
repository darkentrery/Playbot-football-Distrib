import axios from "axios";
import {csrftoken} from "./CsrfService";


const API_URL = process.env.REACT_APP_API_URL + "notices/";
const VAPID_PUBLIC_KEY = process.env.REACT_APP_VAPID_PUBLIC_KEY;
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const postRequest = (url, data) => {
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

export const noticeService = {
	hiddeNotice(data) { return postRequest('hidde-notice/', data); },

	async sendSubData(subscription) {
		const browser = navigator.userAgent.match(/(firefox|msie|chrome|safari|trident)/ig)[0].toLowerCase();
		const data = {
			status_type: 'subscribe',
			subscription: subscription.toJSON(),
			browser: browser,
		};

		const res = await fetch(`${API_URL}create-subscription/`, {
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'content-type': 'application/json',
				'X-CSRFToken': csrftoken,
				'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
			},
			credentials: "include"
		});

		this.handleResponse(res);
	},

	handleResponse(res) {
		console.log(res);
	},

	urlB64ToUint8Array(base64String) {
		const padding = '='.repeat((4 - base64String.length % 4) % 4);
		const base64 = (base64String + padding)
			.replace(/\-/g, '+')
			.replace(/_/g, '/');

		const rawData = window.atob(base64);
		const outputArray = new Uint8Array(rawData.length);
		const outputData = outputArray.map((output, index) => rawData.charCodeAt(index));

		return outputData;
	},

	async subscribe(reg) {
		const subscription = await reg.pushManager.getSubscription();
		if (subscription) {
			console.log(subscription)
			await this.sendSubData(subscription);
			return;
		}
		const options = {
			userVisibleOnly: true,
			...(VAPID_PUBLIC_KEY && {applicationServerKey: this.urlB64ToUint8Array(VAPID_PUBLIC_KEY)})
		};
		const sub = await reg.pushManager.subscribe(options);
		console.log(sub)
		await this.sendSubData(sub);
	},

	initialiseState(reg) {
		if (!reg.showNotification) {
			this.showNotAllowed('Showing notifications isn\'t supported ☹️😢');
			return
		}
		if (Notification.permission === 'denied') {
			this.showNotAllowed('You prevented us from showing notifications ☹️🤔');
			return
		}
		if (!'PushManager' in window) {
			this.showNotAllowed("Push isn't allowed in your browser 🤔");
			return
		}
		this.subscribe(reg);
	},

	showNotAllowed(message) {
		console.log(message)
		const button = document.querySelector('form>button');
		button.innerHTML = `${message}`;
		button.setAttribute('disabled', 'true');
	},

	async registerSw() {
		if ('serviceWorker' in navigator) {
		   const reg = await navigator.serviceWorker.register(`${SERVER_URL}/sw.js`, { scope: '/' });
			this.initialiseState(reg);
		} else {
		   this.showNotAllowed("You can't send push notifications ☹️😢");
	   }
	},
}
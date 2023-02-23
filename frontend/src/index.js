import React from 'react';
import ReactDOM from 'react-dom/client';
import {createStore} from 'redux';
import './assets/css/index.scss';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";
import {rootReducer} from "./redux/reducers/reducers";
import VisibleApp from "./redux/containers/VisibleApp";
import {noticeService} from "./services/NoticeService";

const store = createStore(rootReducer);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <VisibleApp/>
        </Provider>
    </React.StrictMode>
);

// const VAPID_PUBLIC_KEY = process.env.REACT_APP_VAPID_PUBLIC_KEY;
// const SERVER_URL = process.env.REACT_APP_SERVER_URL;
// const API_URL = process.env.REACT_APP_API_URL;
//
// const sendSubData = async (subscription) => {
//     const browser = navigator.userAgent.match(/(firefox|msie|chrome|safari|trident)/ig)[0].toLowerCase();
//     const data = {
//         status_type: 'subscribe',
//         subscription: subscription.toJSON(),
//         browser: browser,
//     };
//
//     const res = await fetch(`${API_URL}notices/create-subscription/`, {
//         method: 'POST',
//         body: JSON.stringify(data),
//         headers: {
//             'content-type': 'application/json',
//             'X-CSRFToken': csrftoken,
// 		    'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
//         },
//         credentials: "include"
//     });
//
//     handleResponse(res);
// };
//
// const handleResponse = (res) => {
//     console.log(res);
// };
//
// function urlB64ToUint8Array(base64String) {
//     const padding = '='.repeat((4 - base64String.length % 4) % 4);
//     const base64 = (base64String + padding)
//         .replace(/\-/g, '+')
//         .replace(/_/g, '/');
//
//     const rawData = window.atob(base64);
//     const outputArray = new Uint8Array(rawData.length);
//     const outputData = outputArray.map((output, index) => rawData.charCodeAt(index));
//
//     return outputData;
// }
//
// const subscribe = async (reg) => {
//     const subscription = await reg.pushManager.getSubscription();
//     if (subscription) {
//         console.log(subscription)
//         await sendSubData(subscription);
//         return;
//     }
//     const options = {
//         userVisibleOnly: true,
//         ...(VAPID_PUBLIC_KEY && {applicationServerKey: urlB64ToUint8Array(VAPID_PUBLIC_KEY)})
//     };
//     const sub = await reg.pushManager.subscribe(options);
//     console.log(sub)
//     await sendSubData(sub);
// };
//
// const initialiseState = (reg) => {
//     if (!reg.showNotification) {
//         showNotAllowed('Showing notifications isn\'t supported ☹️😢');
//         return
//     }
//     if (Notification.permission === 'denied') {
//         showNotAllowed('You prevented us from showing notifications ☹️🤔');
//         return
//     }
//     if (!'PushManager' in window) {
//         showNotAllowed("Push isn't allowed in your browser 🤔");
//         return
//     }
//     subscribe(reg);
// }
//
// const showNotAllowed = (message) => {
//     console.log(message)
//     const button = document.querySelector('form>button');
//     button.innerHTML = `${message}`;
//     button.setAttribute('disabled', 'true');
// };
//
// const registerSw = async () => {
//     if ('serviceWorker' in navigator) {
//        const reg = await navigator.serviceWorker.register(`${SERVER_URL}/sw.js`, { scope: '/' });
//         initialiseState(reg);
//     } else {
//        showNotAllowed("You can't send push notifications ☹️😢");
//    }
// }

noticeService.registerSw();

reportWebVitals();

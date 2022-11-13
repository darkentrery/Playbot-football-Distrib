import {useEffect, useRef} from "react";


export default function TelegramLoginComponent () {

    const ref = useRef();
    function n(e) {
        const API_URL = process.env.REACT_APP_API_URL;
        async function loginTelegram(user){
            const url = `${API_URL}telegram-login/`;
            return window.axios.post(url, user, {headers: {
                'Content-Type': 'application/json',
                // 'X-CSRFToken': csrftoken,
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
        console.log(e)
        loginTelegram(e).then((response) => {
            console.log(response)
        })
    }

    useEffect(() => {
        const script = document.createElement('script');
        const func = document.createElement('script');
        const axios = document.createElement('script');

        // ax.src = "https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"
        axios.src = "https://cdn.jsdelivr.net/npm/axios@1.1.2/dist/axios.min.js";
        func.innerHTML = n;

        script.src = "https://test.korobkaplay.ru/static/js/telegram.js"
        script.async = true;
        script.setAttribute('data-telegram-login', 'PlaybotTestBot');
        script.setAttribute('data-size', 'large');
        script.setAttribute('data-request-access', 'write');
        script.setAttribute('data-userpic', 'false');
        script.setAttribute('data-onauth', `${n.name}(e)`);
        ref.current.appendChild(script);
        ref.current.appendChild(axios);
        ref.current.appendChild(func);

        return () => {
            // ref.current.removeChild(script);
            // ref.current.removeChild(func);
        }
      }, []);

    return(
        <div ref={ref}></div>
    )
}


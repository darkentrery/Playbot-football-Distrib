import {useEffect, useRef} from "react";
import $ from "jquery";


export default function TelegramLoginComponent () {

    const ref = useRef();
    function n(e) {
        const url = `${process.env.REACT_APP_API_URL}telegram-login/`;
        return window.axios.post(url, e, {headers: {
            'Content-Type': 'application/json',
        }})
            .then((response) => {
                localStorage.setItem("access_token" , response.data.access);
                localStorage.setItem("refresh_token" , response.data.refresh);
                localStorage.setItem("date_token", Date.now());
                console.log(response);
                // return response;
            })
            .catch((error) => {
                console.log(error.response)
                // return error.response;
            });
        console.log(e)
    }

    useEffect(() => {
        if (!$(ref.current).children('#id-axios').left) {
            const axios = document.createElement('script');
            axios.src = "https://cdn.jsdelivr.net/npm/axios@1.1.2/dist/axios.min.js";
            axios.id = "id-axios";
            ref.current.appendChild(axios);
        }
        if (!$(ref.current).children('#id-func').left) {
            const func = document.createElement('script');
            func.innerHTML = n;
            func.id = "id-func";
            ref.current.appendChild(func);
        }
        if (!$(ref.current).children('#id-script').left) {
            const script = document.createElement('script');
            script.src = "https://test.korobkaplay.ru/static/js/telegram.js"
            script.async = true;
            script.setAttribute('data-telegram-login', 'PlaybotTestBot');
            script.setAttribute('data-size', 'large');
            script.setAttribute('data-request-access', 'write');
            script.setAttribute('data-userpic', 'false');
            script.setAttribute('data-onauth', `${n.name}(e)`);
            script.id = "id-script";
            ref.current.appendChild(script);
        }

        // ax.src = "https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"

        return () => {
            // ref.current.removeChild(script);
            // ref.current.removeChild(func);
        }
      }, []);

    return(
        <div ref={ref}></div>
    )
}


import {useEffect, useRef} from "react";
import $ from "jquery";


export default function TelegramLoginComponent () {
    localStorage.setItem("telegramLogin", false);

    const ref = useRef();
    function n(e) {
        // e.city = "T'bilisi";
        const login = (e) => {
            return window.axios.post(url, e, {headers: {
                'Content-Type': 'application/json',
            }})
                .then((response) => {
                    localStorage.setItem("access_token" , response.data.access);
                    localStorage.setItem("refresh_token" , response.data.refresh);
                    localStorage.setItem("date_token", Date.now());
                    localStorage.setItem("telegramLogin", true);
                    console.log(response);
                    window.location.href = `${process.env.REACT_APP_MAIN_URL}`;
                })
                .catch((error) => {
                    console.log(error.response)
                    localStorage.setItem("telegramLogin", "username");
                    window.location.href = `${process.env.REACT_APP_MAIN_URL}`;
                });
            console.log(e)
        }

        console.log(e)
        const url = `${process.env.REACT_APP_API_URL}telegram-login/`;
        login(e);
        // navigator.geolocation.getCurrentPosition((response) => {
        //     let coords = [response.coords.latitude, response.coords.longitude];
        //     let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords[0]},${coords[1]}&key=${process.env.REACT_APP_GOOGLE_MAP_KEY}`;
        //     return window.axios.get(url, {headers: {
        //             'Content-Type': 'application/json',
        //     }})
        //         .then((response) => {
        //             let geoObjects = response.data.results;
        //             let address = {
        //                 country: '',
        //                 region: '',
        //                 city: '',
        //                 street: '',
        //                 house_number: '',
        //                 lat: '',
        //                 lng: '',
        //                 formatted: '',
        //             }
        //             geoObjects[0].address_components.forEach((component) => {
        //                 if (component.types.includes('country')) address.country = component.long_name;
        //                 if (component.types.includes('administrative_area_level_1')) address.region = component.long_name;
        //                 if (component.types.includes('locality')) address.city = component.short_name.replace('г. ', '');
        //                 if (component.types.includes('route')) address.street = component.short_name;
        //                 if (component.types.includes('street_number')) address.house_number = component.long_name;
        //             })
        //             if (geoObjects[0].geometry && geoObjects[0].geometry.location) {
        //                 address.lat = geoObjects[0].geometry.location.lat;
        //                 address.lng = geoObjects[0].geometry.location.lng;
        //             }
        //             address.formatted = geoObjects[0].formatted_address;
        //             console.log(address)
        //             if (address.city) {
        //                 e.address = address;
        //             }
        //             login(e);
        //         })
        //         .catch((error) => {
        //             login(e);
        //             console.log(error.response)
        //         });
        //     }, (error) => {
        //         console.log(error)
        //         login(e);
        //     });
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

        return () => {}
      }, []);

    return(
        <div ref={ref}></div>
    )
}


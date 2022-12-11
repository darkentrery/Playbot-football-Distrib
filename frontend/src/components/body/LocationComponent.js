import React, {useEffect, useRef, useState} from "react";
import {authDecoratorWithoutLogin} from "../../services/AuthDecorator";
import AuthService from "../../services/AuthService";


export default function LocationComponent ({state, funcs}) {
    const authService = new AuthService();
    const [isOpen, setIsOpen] = useState(false);
    const [city, setCity] = useState(false);
    let user = state.user;
    let location = state.location;
    const refCity = useRef();
    const closeConfirmCity = () => {
        setIsOpen(false);
    }
    const openConfirmCity = () => {
        setIsOpen(true);
    }
    const confirm = () => {
        closeConfirmCity();
        if (user.isAuth) {
            let data = new FormData();
            data.append('city', refCity.current.innerHTML);
            funcs.setCity(refCity.current.innerHTML);
            authDecoratorWithoutLogin(authService.updateCity, data).then((response) => {
                console.log(response)
                funcs.setAuth(true, response.data);
            })
        } else {
            funcs.setCity(refCity.current.innerHTML);
        }
    }
    const choiceCity = () => {
        closeConfirmCity();
        funcs.openChoiceCity();
    }
    useEffect(() => {
        if (location.city) setCity(location.city);
    }, [location.city])

    return (
        <div className={"location-component"}>
            <span className={"elem country"}>Россия</span>
            <span className={"elem city"} onClick={openConfirmCity} ref={refCity}>{user.isAuth && user.user.city ? user.user.city : city}</span>
            <div className={`confirm-city ${isOpen ? 'open' : ''}`}>
                <div className={"corner"}></div>
                <div className={"confirm-city-frame"}>
                    <div className={"elem-1"}>
                        <span className={"black-600-18"}>Это ваш город?</span>
                        <div onClick={closeConfirmCity} className={"btn-close"}></div>
                    </div>
                    <div className={"elem-2"}>
                        <button className={"btn white-500-12"} onClick={confirm}>Да</button>
                        <button className={"btn-second black-500-12"} onClick={choiceCity}>Выбрать другой</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
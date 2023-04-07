import React, {useRef, useState} from "react";
import {authDecoratorWithoutLogin} from "../../services/AuthDecorator";
import {SearchCityComponent} from "../searchCityComponent/SearchCityComponent";
import {authService} from "../../services/AuthService";


export default function LocationComponent ({state, funcs}) {
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenSearchCity, setIsOpenSearchCity] = useState(false);
    let user = state.user;
    let location = state.location;
    const refCity = useRef();

    const closeConfirmCity = () => {
        setIsOpen(false);
    }
    const openConfirmCity = () => {
        // setIsOpen(true);
        setIsOpenSearchCity(!isOpenSearchCity);
    }
    const confirm = () => {
        closeConfirmCity();
        let item = refCity.current.querySelector('span').innerHTML;
        funcs.setCity(item);
        if (user.isAuth) {
            authDecoratorWithoutLogin(authService.updateAddress, {"city": item}).then((response) => {
                console.log(response)
                funcs.setAuth(true, response.data);
            })
        }
    }
    const choiceCity = () => {
        closeConfirmCity();
        funcs.openChoiceCity();
    }

    return (
        <div className={"location-component"}>
            <div className={"elem country"}>
                <span className={"white-600-14"}>{user.isAuth && user.user.address ? user.user.address.country : location.country}</span>
                {/*<div className={`icon white-down-arrow-icon`}></div>*/}
            </div>
            <div className={"elem city"} onClick={openConfirmCity} ref={refCity}>
                <span className={"middle-gray-400-14"}>{user.isAuth && user.user.address ? user.user.address.city : location.city}</span>
                <div className={`icon gray-down-arrow-icon`}></div>
            </div>
            {/*<span className={"elem city"} onClick={openConfirmCity} ref={refCity}>{user.isAuth && user.user.city ? user.user.city : city}</span>*/}
            <SearchCityComponent
                className={`search-city`} isOpen={isOpenSearchCity} setIsOpen={setIsOpenSearchCity} setCity={funcs.setCity}
                setCountry={funcs.setCountry} setAuth={funcs.setAuth} parent={refCity} isAuth={state.user.isAuth}
            />
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
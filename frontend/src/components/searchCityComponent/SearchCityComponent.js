import {SearchComponent} from "../searchComponent/SearchComponent";
import React, {useEffect, useRef, useState} from "react";
import AuthService from "../../services/AuthService";
import CityService from "../../services/CityService";
import {authDecoratorWithoutLogin} from "../../services/AuthDecorator";


export const SearchCityComponent = ({
    className='',
    isOpen=false,
    setIsOpen = () => {},
    setCity,
    setAuth,
    parent=false,
    isAuth=false,
}) => {
    const authService = new AuthService();
    const cityService = new CityService();
    const [cities, setCities] = useState([]);
    const [citiesView, setCitiesView] = useState([]);
    const citiesRef = useRef();

    useEffect(() => {
        let isSubscribe = true;
        if (isOpen) {
            cityService.getCities().then((response) => {
                if (response.status === 200) {
                    setCities(response.data.cities);
                    setCitiesView(response.data.cities);
                }
            })
        }
        return () => isSubscribe = false;
    }, [isOpen])

    const choiceCity = async (e) => {
        setCity(e.target.innerHTML);
        setIsOpen(false);
        if (isAuth) {
            authDecoratorWithoutLogin(authService.updateCity, {'city': e.target.innerHTML}).then((response) => {
                if (response.status === 200) {
                    setAuth(true, response.data);
                }
            })
        } else {
            setAuth(false, false);
        }
    }

    document.addEventListener('click', (e) => {
        if (isOpen) {
            if (!e.target.closest('.search-city-component') && parent && e.target !== parent.current && e.target.closest('.elem.city') !== parent.current) {
                setIsOpen(false);
            }
        }
    })

    return (
        <div className={`search-city-component ${className} ${isOpen ? '' : 'hidden'}`}>
            <SearchComponent className={""} arrayFirst={cities} setArraySecond={setCitiesView}/>
            <div className={"search-list scroll"} ref={citiesRef}>
                {citiesView && citiesView.map((item, key) => (
                    <div className={"scroll-elem black-400-16"} onClick={choiceCity} key={key}>{item}</div>
                ))}
            </div>
        </div>
    )
}
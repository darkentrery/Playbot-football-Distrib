import {SearchComponent} from "../searchComponent/SearchComponent";
import React, {useEffect, useRef, useState} from "react";
import {authDecoratorWithoutLogin} from "../../services/AuthDecorator";
import {cityService} from "../../services/CityService";
import {authService} from "../../services/AuthService";


export const SearchCityComponent = ({
    className='',
    isOpen=false,
    setIsOpen = () => {},
    setCity,
    setCountry,
    setAuth,
    parent=false,
    isAuth=false,
}) => {
    const [cities, setCities] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [citiesView, setCitiesView] = useState([]);
    const citiesRef = useRef();

    useEffect(() => {
        if (isOpen) {
            cityService.getAddresses().then((response) => {
                if (response.status === 200) {
                    let arr = response.data.map((address) => {
                        return address.city;
                    })
                    setCities(arr);
                    setCitiesView(arr);
                    setAddresses(response.data);
                }
            })
        }
    }, [isOpen])

    const choiceCity = async (e) => {
        setCity(e.target.innerHTML);
        for (let address of addresses) {
            if (address.city === e.target.innerHTML) {
                setCountry(address.country);
                break;
            }
        }
        setIsOpen(false);
        if (isAuth) {
            authDecoratorWithoutLogin(authService.updateAddress, {'city': e.target.innerHTML}).then((response) => {
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
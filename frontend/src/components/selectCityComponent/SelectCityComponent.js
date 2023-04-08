import React, {useEffect, useRef, useState} from "react";
import {SearchComponent} from "../searchComponent/SearchComponent";
import {cityService} from "../../services/CityService";
import $ from "jquery";


export const SelectCityComponent = ({
    value=false,
    setValue,
    className='',
    rightFirstIcon='down-arrow-icon',
    rightSecondIcon='up-arrow-icon',
    leftIcon='map-point-icon',
    errorText=false,
    setErrorText = () => {},
    placeholder=null,
}) => {
    const [isDropdown, setIsDropdown] = useState(false);
    const [cities, setCities] = useState([]);
    const [citiesView, setCitiesView] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const refLabel = useRef();
    const refRightIcon = useRef();
    let firstValue = '';
    if (!value && placeholder) {
        firstValue = placeholder;
    } else if (value) {
        firstValue = value;
    }

    useEffect(() => {
        let isSubscribe = true;
        if (isDropdown) {
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
        return () => isSubscribe = false;
    }, [isDropdown])

    const openDropdown = (e) => {
        setIsDropdown(!isDropdown);
    }

    const closeDropdown = () => {
        setIsDropdown(false);
    }

    const choiceElement = (e) => {
        setIsDropdown(!isDropdown);
        setValue(e.target.innerHTML);
        setErrorText(false);
    }

    document.addEventListener('click', (e) => {
        if (isDropdown) {
            if (e.target !== refLabel.current && e.target !== refRightIcon.current && !$(e.target).closest('.select-city-component').length) {
                closeDropdown();
            }
        }
    })

    return (
        <div className={`select-city-component ${className}`}>
            <div className={`dropdown`}>
                <div className={`left-icon ${leftIcon}`}></div>
                <span className={`dropdown-label ${errorText ? 'error' : ''} ${value ? '' : 'gray-400-14'}`}
                      ref={refLabel} onClick={openDropdown}>{value ? value : firstValue}</span>
                <div className={`right-icon ${isDropdown ? rightSecondIcon : rightFirstIcon}`} ref={refRightIcon}
                     onClick={openDropdown}></div>
                <div className={`dropdown-menu ${isDropdown ? 'open' : ''}`}>
                    <SearchComponent arrayFirst={cities} setArraySecond={setCitiesView}/>
                    <div className={"items-list"}>
                        {citiesView && citiesView.map((item, key) => (
                        <span className={"dropdown-elem"} onClick={choiceElement} key={key}>{item}</span>
                    ))}
                    </div>
                </div>
            </div>
            <span className={`input-message ${errorText ? 'error' : ''}`}>{errorText}</span>
        </div>
    )
}
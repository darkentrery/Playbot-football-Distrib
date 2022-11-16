import React, {useState, useContext, useRef, useEffect} from "react";
import AuthService from "../services/AuthService";
import Modal from "react-modal";
import {OpenChoiceCityContext} from "../context/AuthContext";
import $ from 'jquery';
import {authDecoratorWithoutLogin} from "../services/AuthDecorator";
import CityService from "../services/CityService";
import {isMobile} from "react-device-detect";


export default function ChoiceCityComponent () {
    const authService = new AuthService();
    const cityService = new CityService();
    const [city, setCity] = useState(false);
    const [data, setData] = useState("No");
    const [citiesTag, setCitiesTag] = useState([]);
    const [cities, setCities] = useState([]);

    const {openChoiceCity, setOpenChoiceCity} = useContext(OpenChoiceCityContext);
    const citiesRef = useRef();

    useEffect(() => {
        if (openChoiceCity) {
            cityService.getCities().then((response) => {
                if (response.status == 200) {
                    setCities(response.data.cities)
                }
                console.log(response)
            })
        }
    }, [openChoiceCity])

    authService.addSafariBottomMargin('.bottom')



    const sendForm = async () => {
        if (city) {
            localStorage.city = city;
            await authDecoratorWithoutLogin(authService.updateCity, data).then((response) => {
                console.log(response)
            })
        }
        setOpenChoiceCity(!openChoiceCity);
    }
    useEffect(() => {
        let bodyFormData = new FormData();
        bodyFormData.append('city', city);
        setData(bodyFormData);
    }, [city])

    const searchCity = (event) => {
        let children = citiesRef.current.children;
        let val = event.target.value;
        let newCities = [];
        let allCities = [];

        if (citiesTag.length < children.length) {
            for (let i=0; i<children.length; i++) {
                allCities.push(children[i])
            }
            setCitiesTag(allCities);
        }
        citiesTag.forEach(elem => {
            $(elem).attr('class', 'scroll-elem');
        })
        setCity(false);
        if (citiesTag.length) {
            citiesTag.forEach(elem => {
                if ($(elem).html().toLowerCase().includes(val.toLowerCase())) newCities.push(elem);
            })
        } else {
            for (let i=0; i<children.length; i++) {
                if ($(children[i]).html().toLowerCase().includes(val.toLowerCase())) newCities.push(children[i]);
            }
        }

        $(citiesRef.current).html('');
        newCities.forEach(elem => {
            $(citiesRef.current).append(elem);
        })
        $('.scroll-elem').on('click', function () {
            citiesTag.forEach(elem => {
                $(elem).attr('class', 'scroll-elem');
            })
            $(this).attr('class', 'scroll-elem checked');
            setCity($(this).html());
        })
    }

    const choiceCity = (event) => {
        let children = citiesRef.current.children;
        for (let i=0; i<children.length; i++) {
            $(children[i]).attr('class', 'scroll-elem');
        }
        $(event.target).attr('class', 'scroll-elem checked');
        setCity($(event.target).html());
    }

    return(
        <Modal
            isOpen={openChoiceCity}
            className={"popup-fon"}
            contentLabel="Example Modal"
            ariaHideApp={false}
        >
            <div className={"popup-frame choice-city"}>
                <div className={"elem head"}>
                    <span>Выберите город</span>
                    <div onClick={() => {setOpenChoiceCity(!openChoiceCity)}} className={"btn-close choice-city-close"}></div>
                </div>
                <div className={"elem under-head"}>
                    <span>Для корректного отображения событий укажите город</span>
                </div>
                <div className={"elem search div-input"}>
                    {/*<div className={"div-input"}>*/}
                        <input className={"search-icon"} type="text" placeholder={"Поиск"} onChange={searchCity}/>
                    {/*</div>*/}
                    <div className={"line"}></div>
                </div>
                <div className={"elem cities div-scroll"} ref={citiesRef}>
                    {cities && cities.map((item, key) => {
                        return(
                            <div className={"scroll-elem"} onClick={choiceCity} key={key}>
                                {item}
                            </div>
                        )
                    })}
                </div>
                <div className={"elem bottom"}>
                    <button className={"btn btn-choice-city"} onClick={sendForm}>Сохранить</button>
                </div>
            </div>
        </Modal>
    )
}

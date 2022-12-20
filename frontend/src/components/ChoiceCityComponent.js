import React, {useState, useRef, useEffect} from "react";
import AuthService from "../services/AuthService";
import Modal from "react-modal";
import $ from 'jquery';
import {authDecoratorWithoutLogin} from "../services/AuthDecorator";
import CityService from "../services/CityService";
import {SearchComponent} from "./searchComponent/SearchComponent";


export default function ChoiceCityComponent ({isOpen, isIPhone, closeComponent, setAuth, setCity, showMap}) {
    const authService = new AuthService();
    const cityService = new CityService();
    const [city, setLocalCity] = useState(false);
    const [data, setData] = useState(false);
    const [cities, setCities] = useState([]);
    const [citiesView, setCitiesView] = useState([]);
    const citiesRef = useRef();

    useEffect(() => {
        if (isOpen) {
            cityService.getCities().then((response) => {
                if (response.status == 200) {
                    setCities(response.data.cities);
                    setCitiesView(response.data.cities);
                }
            })
        }
    }, [isOpen])

    const closeWindow = () => {
        closeComponent();
        showMap();
    }

    const sendForm = async () => {
        if (city) {
            setCity(city);
            await authDecoratorWithoutLogin(authService.updateCity, data).then((response) => {
                closeWindow();
                setAuth(true, response.data);
            })
        }
    }

    useEffect(() => {
        let bodyFormData = new FormData();
        bodyFormData.append('city', city);
        setData(bodyFormData);
    }, [city])

    useEffect(() => {
        $('.choice-city').find('.scroll-elem').each((elem) => {
            $('.choice-city').find('.scroll-elem')[elem].className = 'scroll-elem';
        })
    }, [citiesView])

    const choiceCity = (event) => {
        let children = citiesRef.current.children;
        for (let i=0; i<children.length; i++) {
            $(children[i]).attr('class', 'scroll-elem');
        }
        $(event.target).attr('class', 'scroll-elem checked');
        setLocalCity($(event.target).html());
    }

    return(
        <Modal
            isOpen={isOpen}
            className={"popup-fon"}
            contentLabel="Example Modal"
            ariaHideApp={false}
        >
            <div className={"popup-frame choice-city"}>
                <div className={"elem head"}>
                    <span>Выберите город</span>
                    <div onClick={closeWindow} className={"btn-close choice-city-close"}></div>
                </div>
                <div className={"elem under-head"}>
                    <span>Для корректного отображения событий укажите город</span>
                </div>
                <SearchComponent className={"elem search"} arrayFirst={cities} setArraySecond={setCitiesView}/>
                <div className={"elem cities div-scroll scroll"} ref={citiesRef}>
                    {citiesView && citiesView.map((item, key) => {
                        return(
                            <div className={"scroll-elem"} onClick={choiceCity} key={key}>
                                {item}
                            </div>
                        )
                    })}
                </div>
                <div className={`elem bottom ${isIPhone ? 'safari-margin' : ''}`}>
                    <button className={"btn btn-choice-city"} onClick={sendForm}>Сохранить</button>
                </div>
            </div>
        </Modal>
    )
}

import React, {useState, useEffect, useContext, useRef} from "react";
import AuthService from "../services/AuthService";
import TelegramLoginComponent from "./TelegramLoginComponent";
import Modal from "react-modal";
import {OpenChoiceCityContext} from "../context/AuthContext";
import {getData} from "../services/AuthDecorator";
import passwordIcon from "../assets/icon/password.png";
import searchIcon from "../assets/icon/search.png";
import checkIcon from "../assets/icon/checked-orange.png";
import $ from 'jquery';


export default function ChoiceCityComponent () {
    const authService = new AuthService();
    const [city, setCity] = useState(false);
    const [search, setSearch] = useState(false);
    const [data, setData] = useState("No");
    const [citiesTag, setCitiesTag] = useState([]);

    const {openChoiceCity, setOpenChoiceCity} = useContext(OpenChoiceCityContext);

    let cities = ["Moscow", "aaa", "bbb", "ccc"];

    // useEffect(() => {
    //     let bodyFormData = new FormData();
    //     bodyFormData.append('email', email);
    //     setData(bodyFormData)
    // }, [email])
    const citiesRef = useRef();

    const sendForm = async () => {

    }

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
            $(elem).find('img').attr('class', 'scroll-elem-check disabled');
        })
        setCity(false);
        if (citiesTag.length) {
            citiesTag.forEach(elem => {
                if ($(elem).find('span').html().toLowerCase().includes(val.toLowerCase())) newCities.push(elem);
            })
        } else {
            for (let i=0; i<children.length; i++) {
                if ($(children[i]).find('span').html().toLowerCase().includes(val.toLowerCase())) newCities.push(children[i]);
            }
        }

        $(citiesRef.current).html('');
        newCities.forEach(elem => {
            $(citiesRef.current).append(elem);
        })
        $('.scroll-elem').on('click', function () {
            citiesTag.forEach(elem => {
                $(elem).attr('class', 'scroll-elem');
                $(elem).find('img').attr('class', 'scroll-elem-check disabled');
            })
            $(this).attr('class', 'scroll-elem checked');
            $(this).find('img').attr('class', 'scroll-elem-check');
            setCity(this.value);
        })

    }

    const choiceCity = (event) => {
        let children = citiesRef.current.children;
        for (let i=0; i<children.length; i++) {
            children[i].className = "scroll-elem";
            children[i].children[0].className = "scroll-elem-check disabled";
        }
        event.target.className = "scroll-elem checked";
        event.target.children[0].className = "scroll-elem-check";
        setCity(event.target.value);
    }


    for (let i=0; i<30; i++) {
        cities.push(cities[0])
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
                <div className={"elem search"}>
                    <div className={"div-input"}>
                        <img className={"search-icon"} src={searchIcon} alt=""/>
                        <input type="text" placeholder={"Поиск"} onChange={searchCity}/>
                    </div>
                    <div className={"line"}></div>
                </div>
                <div className={"elem cities div-scroll"} ref={citiesRef}>
                    {cities && cities.map((item, key) => {
                        return(
                            <div className={"scroll-elem"} onClick={choiceCity} key={key}>
                                <img className={"scroll-elem-check disabled"} src={checkIcon} alt=""/>
                                <span>{item}</span>
                            </div>
                        )
                    })}
                </div>
                <div className={"elem bottom"}>
                    <button className={"btn btn-choice-city"} onClick={sendForm}>
                        <div className={"btn-text"}>Сохранить</div>
                    </button>
                </div>
            </div>
        </Modal>
    )
}

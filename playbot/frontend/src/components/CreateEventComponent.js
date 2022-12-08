import React, {useState, useEffect, useRef} from "react";
import Modal from "react-modal";
import ReactDatetimeClass from "react-datetime";
import "react-datetime/css/react-datetime.css";
import {authDecoratorWithoutLogin} from "../services/AuthDecorator";
import EventService from "../services/EventService";
import DropDownComponent from "./dropDownComponent/DropDownComponent";
import {popupCloseDate, popupCloseDropdown, popupCloseTime} from "../utils/manageElements";
import {getLocations} from "../services/LocationService";
import $ from "jquery";


const countPlayers = [];
for (let i=4; i<15; i++) {
    countPlayers.push(i);
}

export default function CreateEventComponent ({isOpen, isIPhone, closeComponent, openSuccessCreateEvent, setEvent}) {
    const eventService = new EventService();
    const [data, setData] = useState(false);
    const [name, setName] = useState(false);
    const [date, setDate] = useState(false);
    const [time, setTime] = useState(false);
    const [address, setAddress] = useState(false);
    const [city, setCity] = useState(false);
    const [point, setPoint] = useState(false);
    const [suggests, setSuggests] = useState([]);
    const [count, setCount] = useState(4);
    const [notice, setNotice] = useState('');
    const [isOpenCalendar, setIsOpenCalendar] = useState(false);
    const [isOpenTime, setIsOpenTime] = useState(false);
    const [isPlayer, setIsPlayer] = useState(false);
    const [closeDropDown, setCloseDropDown] = useState(false);
    const refName = useRef();
    const refCount = useRef();
    const refDate = useRef();
    const refTime = useRef();
    const refAddress = useRef();
    const refNotice = useRef();
    const refDateP = useRef();
    const refTimeP = useRef();
    const refYmap = useRef();
    const refs = {
        "name": refName,
        "date": refDateP,
        "time": refTimeP,
        "address": refAddress,
        "count": refCount,
        "notice": refNotice,
    }

    useEffect(() => {
        let bodyFormData = new FormData();
        bodyFormData.append('name', name);
        bodyFormData.append('date', date);
        bodyFormData.append('time_begin', time);
        bodyFormData.append('address', address);
        bodyFormData.append('count_players', count);
        bodyFormData.append('is_player', isPlayer);
        bodyFormData.append('notice', notice);
        setData(bodyFormData)
    }, [name, date, time, address, count, isPlayer, notice]);

    const closeWindow = () => {
        setName(false);
        setDate(false);
        setTime(false);
        setAddress(false);
        setCount(1);
        setIsPlayer(false);
        setNotice('');
        setData(false);
        closeComponent();
    }

    const sendForm = async () => {
        let errors = eventService.createEventRequestValidation(name, date, time, address, notice, refs);
        if (!errors.length) {
            authDecoratorWithoutLogin(eventService.createEvent, data).then((response) => {
                setEvent(response.data);
                closeWindow();
                openSuccessCreateEvent();
            })
        }
    }

    const inputName = (e) => {
        let val = e.target.value.slice(0, 20);
        setName(val);
        e.target.value = val;
    }

    const inputNotice = (e) => {
        let rows = e.target.value.split('\n');
        if (rows.length > 4) e.target.value = rows.slice(0, 4).join('\n');
        setNotice(e.target.value);
    }

    const getAddress = (e) => {
        setAddress(e.target.value);
        if (e.target.value) {
            getLocations(e.target.value).then((response) => {
                if (response.status === 200) {
                    let geoObjects = response.data.response.GeoObjectCollection.featureMember;
                    let array = [];
                    geoObjects.map((item) => {
                        let addressComponents = item.GeoObject.metaDataProperty.GeocoderMetaData.Address.Components;
                        let city = '';
                        addressComponents.map((item) => {
                            if (item.kind === 'locality') city = item.name;
                        })
                        if (city) array.push(item);
                    })
                    console.log(array)
                    setSuggests(array);
                }
            })
        } else {
            setSuggests([]);
        }
    }

    const choiceAddress = (e) => {
        let suggest = suggests[e.target.id].GeoObject;
        let point = suggest.Point.pos;
        let address = suggest.metaDataProperty.GeocoderMetaData.Address.formatted;
        let addressComponents = suggest.metaDataProperty.GeocoderMetaData.Address.Components;
        let city = '';
        addressComponents.map((item) => {
            if (item.kind === 'locality') city = item.name;
        })
        setAddress(address);
        setCity(city);
        setPoint(point);
        setSuggests([]);
        console.log(point, address, city)
        console.log(suggest)
    }


    const popupClick = (e) => {
        popupCloseDropdown(e, setCloseDropDown, closeDropDown);
        popupCloseDate(e, isOpenCalendar, setIsOpenCalendar);
        popupCloseTime(e, isOpenTime, setIsOpenTime);
    }

    return(
        <Modal
            isOpen={isOpen}
            className={"popup-fon"}
            contentLabel="Example Modal"
            ariaHideApp={false}
        >
            <div className={"popup-fon"} onClick={popupClick}>
                <div className={"popup-frame create-event"}>
                    <div className={"popup-left"}>
                        <div className={"elem elem-1"}>
                            <span>Создайте свое событие</span>
                            <div onClick={closeWindow} className={"btn-close"}></div>
                        </div>
                        <div className={"elem div-input elem-2"} ref={refName}>
                            <input className={"ball-icon input-icon"} type="text" placeholder={"Название *"} onChange={inputName}/>
                            <span className={"input-message"}></span>
                        </div>
                        <div className={"elem elem-3"} ref={refDateP}>
                            <ReactDatetimeClass
                                className={"div-input input"}
                                timeFormat={false}
                                dateFormat={"DD.MM.YYYY"}
                                closeOnSelect={true}
                                inputProps={{placeholder: 'Дата игры *'}}
                                onChange={(e) => eventService.choiceDate(e, setDate, refDate)}
                                ref={refDate}
                            />
                            <span className={"input-message"}></span>
                        </div>
                        <div className={"elem elem-4"} ref={refTimeP}>
                            <ReactDatetimeClass
                                className={"div-input input"}
                                timeFormat={"HH:mm"}
                                dateFormat={false}
                                closeOnSelect={true}
                                inputProps={{placeholder: 'Время начала игры *'}}
                                onChange={(e) => eventService.choiceTime(e, setTime, refTime)}
                                ref={refTime}
                            />
                            <span className={"input-message"}></span>
                        </div>
                        <div className={"elem elem-5 div-input"} ref={refAddress}>
                            <input className={"map-point-icon input-icon"} type="text" placeholder={"Адрес проведения *"} value={address ? address : ''} onChange={getAddress}/>
                            <span className={"input-message"}></span>
                            <div className={`suggests ${suggests.length ? '' : 'hidden'}`}>
                                {suggests.length !== 0 && suggests.map((item, key) => {
                                    let address = item.GeoObject.metaDataProperty.GeocoderMetaData;
                                    return (
                                        <span className={"suggest-item gray-400-12"} key={key} onClick={choiceAddress} id={key}>{address.Address.formatted}</span>
                                    )
                                })}
                            </div>
                        </div>
                        <div className={"elem elem-6"}>
                            <span>Максимальное кол. игроков *</span>
                        </div>
                        <DropDownComponent value={count} setValue={setCount} leftIcon={'foot-icon'} sizingClass={"dropdown-size"} flagClose={closeDropDown} id={1} content={countPlayers}/>
                        <div className={"elem elem-8"}>
                            <div className={`${isPlayer ? 'slider-check-icon' : 'slider-uncheck-icon'}`} onClick={(e) => setIsPlayer(!isPlayer)}></div>
                            <span>Организатор события не играет</span>
                        </div>
                        <div className={"elem elem-9"} ref={refNotice}>
                            <textarea name="" id="" cols="30" rows="5" onChange={inputNotice} placeholder={"Комментарии"}></textarea>
                            <span className={"input-message"}></span>
                        </div>
                        <div className={`elem elem-10 ${isIPhone ? 'safari-margin' : ''}`}>
                            <button className={"btn btn-create-event"} onClick={sendForm}>Создать</button>
                        </div>
                    </div>
                    <div className={"popup-right popup-img create-event-img"}>
                        <div className={"elem-1"}>
                            <div onClick={closeWindow} className={"btn-close"}></div>
                        </div>
                        <div className={"elem-2"}>
                            <div className={"point point-icon"}>
                                <span>Создавай футбольные активности в любом месте и в любое время</span>
                            </div>
                            <div className={"point point-icon"}>
                                <span>Устанавливай свои правила игры</span>
                            </div>
                            <div className={"point point-icon"}>
                                <span>Фиксируй статистику матча</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

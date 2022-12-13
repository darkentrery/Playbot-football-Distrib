import React, {useState, useEffect, useRef} from "react";
import Modal from "react-modal";
import ReactDatetimeClass from "react-datetime";
import "react-datetime/css/react-datetime.css";
import {authDecoratorWithoutLogin} from "../services/AuthDecorator";
import EventService from "../services/EventService";
import DropDownComponent from "./dropDownComponent/DropDownComponent";
import {
    popupCloseDropdown,
    popupCloseDropdownWithDate,
    popupCloseDropdownWithTime,
} from "../utils/manageElements";
import {getLocations} from "../services/LocationService";


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
    const [incorrectDate, setIncorrectDate] = useState(false);
    const refName = useRef();
    const refCount = useRef();
    const refDate = useRef();
    const refTime = useRef();
    const refAddress = useRef();
    const refNotice = useRef();
    const refDateP = useRef();
    const refTimeP = useRef();
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
        bodyFormData.append('city', city);
        bodyFormData.append('geo_point', point);
        setData(bodyFormData)
    }, [name, date, time, address, count, isPlayer, notice, city, point]);

    const closeWindow = () => {
        setName(false);
        setDate(false);
        setTime(false);
        setAddress(false);
        setCount(1);
        setIsPlayer(false);
        setNotice('');
        setCity(false);
        setPoint(false);
        setData(false);
        closeComponent();
    }

    const sendForm = async () => {
        let errors = eventService.createEventRequestValidation(name, date, time, address, city, point, notice, refs);
        if (!errors.length) {
            authDecoratorWithoutLogin(eventService.createEvent, data).then((response) => {
                setEvent(response.data);
                closeWindow();
                openSuccessCreateEvent();
            })
        }
    }

    const renderDay = (props, currentDate, selectedDate) => {
        let date = new Date(currentDate.format("YYYY-MM-DD"));
        if (date.setDate(date.getDate() + 1) < Date.now()) {
            props.className = "calendar-day inactive";
        } else {
            props.className = "calendar-day";
        }

        return <td {...props}>{currentDate.date()}</td>;
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
    useEffect(() => {
        console.log(refDate.current)
        if (refDate.current) refDate.current.setState({inputValue: ''});
    }, [incorrectDate])


    const getAddress = (e) => {
        setAddress(e.target.value);
        setCity(false);
        setPoint(false);
        if (e.target.value && e.target.value.length > 6) {
            getLocations(e.target.value).then((response) => {
                if (response.status === 200) {
                    let geoObjects = response.data.results;
                    let array = [];
                    geoObjects.map((item) => {
                        if (item.components.city) array.push(item);

                    })
                    setSuggests(array);
                    // let geoObjects = response.data.response.GeoObjectCollection.featureMember;
                    // let array = [];
                    // geoObjects.map((item) => {
                    //     let addressComponents = item.GeoObject.metaDataProperty.GeocoderMetaData.Address.Components;
                    //     let city = '';
                    //     addressComponents.map((item) => {
                    //         if (item.kind === 'locality') city = item.name;
                    //     })
                    //     if (city) array.push(item);
                    // })
                    // console.log(array)
                    // setSuggests(array);
                }
            })
        } else {
            setSuggests([]);
        }
    }

    const choiceAddress = (e) => {
        //For Yandex Map
        // let suggest = suggests[e.target.id].GeoObject;
        // let point = suggest.Point.pos;
        // let address = suggest.metaDataProperty.GeocoderMetaData.Address.formatted;
        // let addressComponents = suggest.metaDataProperty.GeocoderMetaData.Address.Components;
        // let city = '';
        // addressComponents.map((item) => {
        //     if (item.kind === 'locality') city = item.name;
        // })
        let suggest = suggests[e.target.id];
        let point = `${suggest.geometry.lat} ${suggest.geometry.lng}`;
        let address = suggest.formatted;
        let city = suggest.components.city;
        setAddress(address);
        setCity(city);
        setPoint(point);
        setSuggests([]);
    }


    const popupClick = (e) => {
        popupCloseDropdown(e, setCloseDropDown, closeDropDown);
        popupCloseDropdownWithDate(e, isOpenCalendar, setIsOpenCalendar);
        popupCloseDropdownWithTime(e, isOpenTime, setIsOpenTime);
        setSuggests([]);
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
                                onChange={(e) => eventService.choiceDate(e, setDate, refDate, setIncorrectDate, incorrectDate)}
                                ref={refDate}
                                value={date ? date : ''}
                                renderDay={renderDay}
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
                                    // let address = item.GeoObject.metaDataProperty.GeocoderMetaData;
                                    return (
                                        <span className={"suggest-item gray-400-12"} key={key} onClick={choiceAddress} id={key}>{item.formatted}</span>
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

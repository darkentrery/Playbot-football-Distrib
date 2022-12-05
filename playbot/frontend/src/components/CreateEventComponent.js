import React, {useState, useEffect, useRef} from "react";
import Modal from "react-modal";
import ReactDatetimeClass from "react-datetime";
import "react-datetime/css/react-datetime.css";
import {authDecoratorWithoutLogin} from "../services/AuthDecorator";
import EventService from "../services/EventService";
import DropDownComponent from "./dropDownComponent/DropDownComponent";


export default function CreateEventComponent ({isOpen, isIPhone, closeComponent, openSuccessCreateEvent, setEvent}) {
    const eventService = new EventService();
    const [data, setData] = useState(false);
    const [name, setName] = useState(false);
    const [date, setDate] = useState(false);
    const [time, setTime] = useState(false);
    const [address, setAddress] = useState(false);
    const [count, setCount] = useState(1);
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

    const inputNotice = (e) => {
        let rows = e.target.value.split('\n');
        if (rows.length > 4) e.target.value = rows.slice(0, 4).join('\n');
        setNotice(e.target.value);
    }

    const popupClick = (e) => {
        if (isOpenCalendar) {
            if (!e.target.className.includes("rdt") && !e.target.className.includes("calendar-icon")
                && !e.target.localName.includes("span")) {
                setIsOpenCalendar(false);
            }
        }
        if (isOpenTime) {
            if (!e.target.className.includes("rdt") && !e.target.className.includes("clock-icon")
                && !e.target.localName.includes("span")) {
                setIsOpenTime(false);
            }
        }
        if (!e.target.className.includes("dropdown-elem") && !e.target.className.includes("dropdown-label")) {
            setCloseDropDown(!closeDropDown);
        } else if (e.target.className.includes("dropdown-label")) {
            setCloseDropDown(e.target.id);
        }
    }

    return(
        <Modal
            isOpen={isOpen}
            className={"popup-fon"}
            contentLabel="Example Modal"
            ariaHideApp={false}
        >
            <div className={"popup-frame create-event"} onClick={popupClick}>
                <div className={"popup-left"}>
                    <div className={"elem elem-1"}>
                        <span>Создайте свое событие</span>
                        <div onClick={closeWindow} className={"btn-close"}></div>
                    </div>
                    <div className={"elem div-input elem-2"} ref={refName}>
                        <input className={"ball-icon input-icon"} type="text" placeholder={"Название *"} onChange={(event) => setName(event.target.value)}/>
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
                    <div className={"elem div-input"} ref={refAddress}>
                        <input className={"map-point-icon input-icon"} type="text" placeholder={"Адрес проведения *"} onChange={(event) => setAddress(event.target.value)}/>
                        <span className={"input-message"}></span>
                    </div>
                    <div className={"elem elem-6"}>
                        <span>Максимальное кол. игроков *</span>
                    </div>
                    <DropDownComponent value={count} setValue={setCount} leftIcon={'foot-icon'} sizingClass={"dropdown-size"} flagClose={closeDropDown} id={1}/>
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
        </Modal>
    )
}

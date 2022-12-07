import EventService from "../services/EventService";
import React, {useEffect, useRef, useState} from "react";
import Modal from "react-modal";
import ReactDatetimeClass from "react-datetime";
import {authDecoratorWithoutLogin} from "../services/AuthDecorator";
import DropDownComponent from "./dropDownComponent/DropDownComponent";
import {popupCloseDate, popupCloseDropdown, popupCloseTime} from "../utils/manageElements";


const countPlayers = [];
for (let i=4; i<15; i++) {
    countPlayers.push(i);
}

export default function EditEventComponent ({isOpen, isIPhone, event, closeComponent, openSuccessEditEvent, setEvent, setPlayers}) {
    const eventService = new EventService();
    const [data, setData] = useState(false);
    const [id, setId] = useState(false);
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
        if (!id) setId(event.id);
        if (!name) setName(event.name);
        if (!date && event.date) setDate(`${event.date.slice(8, 10)}.${event.date.slice(5, 7)}.${event.date.slice(0, 4)}`);
        if (!time && event.time_begin) setTime(event.time_begin.slice(0, 5));
        if (!address) setAddress(event.address);
        if (event && event.count_players) setCount(event.count_players);
        if (event && event.is_player == true) setIsPlayer(true);
        if (!notice) setNotice(event.notice);
    }, [event, isOpen])

    useEffect(() => {
        let bodyFormData = new FormData();
        bodyFormData.append('id', id);
        bodyFormData.append('name', name);

        if (date) {
            let match = date.match(/\d{2}[.]\d{2}[.]\d{4}/);
            if (match !== null) {
                bodyFormData.append('date', `${date.slice(6, 10)}-${date.slice(3, 5)}-${date.slice(0, 2)}`);
            } else {
                bodyFormData.append('date', date);
            }
        }

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
            authDecoratorWithoutLogin(eventService.editEvent, data).then((response) => {
                setEvent(response.data);
                setPlayers(response.data.event_player);
                closeWindow();
                openSuccessEditEvent();
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

    const popupClick = (e) => {
        popupCloseDropdown(e, setCloseDropDown, closeDropDown);
        popupCloseDate(e, isOpenCalendar, setIsOpenCalendar);
        popupCloseTime(e, isOpenTime, setIsOpenTime);
    }

    return (
        <Modal
            isOpen={isOpen}
            className={"popup-fon"}
            contentLabel="Example Modal"
            ariaHideApp={false}
        >
            <div className={"popup-fon"} onClick={popupClick}>
                <div className={"popup-frame edit-event-component"}>
                    <div className={"elem elem-1"}>
                        <span>Редактирование события</span>
                        <div onClick={closeWindow} className={"btn-close"}></div>
                    </div>
                    <div className={"elem div-input elem-2"} ref={refName}>
                        <input className={"ball-icon input-icon"} type="text" placeholder={"Название *"} value={name ? name : ''} onChange={inputName}/>
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
                            value={date ? date : ''}
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
                            value={time ? time : ''}
                        />
                        <span className={"input-message"}></span>
                    </div>
                    <div className={"elem div-input"} ref={refAddress}>
                        <input className={"map-point-icon input-icon"} type="text" placeholder={"Адрес проведения *"} value={address ? address : ''} onChange={(event) => setAddress(event.target.value)}/>
                        <span className={"input-message"}></span>
                    </div>
                    <div className={"elem elem-6"}>
                        <span>Максимальное кол. игроков *</span>
                    </div>
                    <DropDownComponent value={count} setValue={setCount} leftIcon={'foot-icon'} sizingClass={"elem elem-7"} flagClose={closeDropDown} id={1}/>
                    <div className={"elem elem-8"}>
                        <div className={`${isPlayer ? 'slider-check-icon' : 'slider-uncheck-icon'}`} onClick={(e) => setIsPlayer(!isPlayer)}></div>
                        <span>Организатор события не играет</span>
                    </div>
                    <div className={"elem elem-9"} ref={refNotice}>
                        <textarea name="" id="" cols="30" rows="5" onChange={inputNotice} placeholder={"Комментарии"} value={notice ? notice : ''}></textarea>
                        <span className={"input-message"}></span>
                    </div>
                    <div className={`elem elem-10 ${isIPhone ? 'safari-margin' : ''}`}>
                        <button className={"btn btn-create-event"} onClick={sendForm}>Сохранить</button>
                    </div>
                </div>
            </div>
        </Modal>
    )
}
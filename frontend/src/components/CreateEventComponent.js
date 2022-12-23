import React, {useState} from "react";
import Modal from "react-modal";
import "react-datetime/css/react-datetime.css";
import {authDecoratorWithoutLogin} from "../services/AuthDecorator";
import EventService from "../services/EventService";
import {
    popupCloseDropdown,
    popupCloseDropdownWithDate,
    popupCloseDropdownWithTime,
} from "../utils/manageElements";
import {FormEventComponent} from "./formEventComponent/FormEventComponent";


export default function CreateEventComponent ({isOpen, isIPhone, user, closeComponent, openSuccessCreateEvent, setEvent}) {
    const eventService = new EventService();
    const [data, setData] = useState(false);
    const [suggests, setSuggests] = useState([]);
    const [isOpenCalendar, setIsOpenCalendar] = useState(false);
    const [isOpenTime, setIsOpenTime] = useState(false);
    const [closeDropDown, setCloseDropDown] = useState(false);
    const [addressFocus, setAddressFocus] = useState(false);

    const closeWindow = () => {
        setData(false);
        closeComponent();
    }

    const sendForm = async () => {
        authDecoratorWithoutLogin(eventService.createEvent, data).then((response) => {
            setEvent(response.data);
            closeWindow();
            openSuccessCreateEvent();
        })
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
                <div className={"popup-frame create-event-component"}>
                    <FormEventComponent
                        className={"popup-left"}
                        onClick={sendForm}
                        data={data}
                        setData={setData}
                        titleText={"Создайте свое событие"}
                        closeDropDown={closeDropDown}
                        isIPhone={isIPhone}
                        clickClose={closeWindow}
                        suggests={suggests}
                        isOpen={isOpen}
                        setSuggests={setSuggests}
                        addressFocus={addressFocus}
                        setAddressFocus={setAddressFocus}
                        user={user}
                    />
                    <div className={"popup-right popup-img create-event-img"}>
                        <div className={"elem-1"}>
                            <div onClick={closeWindow} className={"btn-close"}></div>
                        </div>
                        <div className={"elem-2"}>
                            {/*<div className={"point point-icon black-400-16"}>*/}
                            {/*    Создавай футбольные активности в любом месте и в любое время*/}
                            {/*    <span>Создавай футбольные активности в любом месте и в любое время</span>*/}
                            {/*</div>*/}
                            {/*<div className={"point point-icon"}>*/}
                            {/*    <span>Устанавливай свои правила игры</span>*/}
                            {/*</div>*/}
                            {/*<div className={"point point-icon"}>*/}
                            {/*    <span>Фиксируй статистику матча</span>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

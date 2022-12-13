import EventService from "../services/EventService";
import React, {useState} from "react";
import Modal from "react-modal";
import {authDecoratorWithoutLogin} from "../services/AuthDecorator";
import {
    popupCloseDropdown,
    popupCloseDropdownWithDate,
    popupCloseDropdownWithTime,
} from "../utils/manageElements";
import {FormEventComponent} from "./formEventComponent/FormEventComponent";


export default function EditEventComponent ({isOpen, isIPhone, event, closeComponent, openSuccessEditEvent, setEvent, showMap}) {
    const eventService = new EventService();
    const [data, setData] = useState(false);
    const [suggests, setSuggests] = useState([]);
    const [isOpenCalendar, setIsOpenCalendar] = useState(false);
    const [isOpenTime, setIsOpenTime] = useState(false);
    const [closeDropDown, setCloseDropDown] = useState(false);

    const closeWindow = () => {
        setData(false);
        closeComponent();
    }

    const toMenu = () => {
        closeWindow();
        showMap();
    }

    const sendForm = async () => {
        authDecoratorWithoutLogin(eventService.editEvent, data).then((response) => {
            setEvent(response.data);
            closeWindow();
            openSuccessEditEvent();
        })
    }

    const popupClick = (e) => {
        popupCloseDropdown(e, setCloseDropDown, closeDropDown);
        popupCloseDropdownWithDate(e, isOpenCalendar, setIsOpenCalendar);
        popupCloseDropdownWithTime(e, isOpenTime, setIsOpenTime);
        setSuggests([]);
    }

    return (
        <Modal
            isOpen={isOpen}
            className={"popup-fon"}
            contentLabel="Example Modal"
            ariaHideApp={false}
        >
            <div className={"popup-fon"} onClick={popupClick}>
                <div className={"edit-event-component"}>
                    <FormEventComponent
                        event={event}
                        onClick={sendForm}
                        data={data}
                        setData={setData}
                        titleText={"Редактировать событие"}
                        closeDropDown={closeDropDown}
                        isIPhone={isIPhone}
                        clickClose={toMenu}
                        suggests={suggests}
                        isOpen={isOpen}
                        setSuggests={setSuggests}
                    />
                </div>
            </div>
        </Modal>
    )
}
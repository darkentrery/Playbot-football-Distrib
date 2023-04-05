import React, {useEffect, useState} from "react";
import Modal from "react-modal";
import {
    popupCloseDropdown,
    popupCloseDropdownWithDate,
    popupCloseDropdownWithTime, popupCloseSuggestMap,
} from "../../utils/manageElements";
import {authDecoratorWithoutLogin} from "../../services/AuthDecorator";
import {FormEventComponent} from "../formEventComponent/FormEventComponent";
import {eventService} from "../../services/EventService";


export const RepeatEventComponent = ({isOpen, isIPhone, event, user, closeComponent, openSuccessCreateEvent, setEvent, showMap}) => {
    const [data, setData] = useState(false);
    const [suggests, setSuggests] = useState([]);
    const [isOpenCalendar, setIsOpenCalendar] = useState(false);
    const [isOpenTime, setIsOpenTime] = useState(false);
    const [closeDropDown, setCloseDropDown] = useState(false);
    const [addressFocus, setAddressFocus] = useState(false);
    const [newEvent, setNewEvent] = useState(false);

    const closeWindow = () => {
        setData(false);
        setNewEvent(false);
        closeComponent();
    }

    const toMenu = () => {
        closeWindow();
        showMap();
    }

    useEffect(() => {
        if (!newEvent) {
            let e = {...event};
            e.date = null;
            e.time_begin = null;
            e.event_player = [];
            setNewEvent(e);
        }
    }, [isOpen])

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
        popupCloseSuggestMap(e, setAddressFocus, addressFocus);
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
                <FormEventComponent
                    className={`edit-event-component ${data && data.is_paid ? 'isPaid' : ''}`}
                    event={newEvent}
                    onClick={sendForm}
                    data={data}
                    setData={setData}
                    titleText={"Повторить событие"}
                    closeDropDown={closeDropDown}
                    isIPhone={isIPhone}
                    clickClose={toMenu}
                    suggests={suggests}
                    isOpen={isOpen}
                    setSuggests={setSuggests}
                    addressFocus={addressFocus}
                    setAddressFocus={setAddressFocus}
                    user={user}
                />
            </div>
        </Modal>
    )
}
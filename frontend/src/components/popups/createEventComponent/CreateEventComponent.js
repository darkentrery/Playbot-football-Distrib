import React, {useRef, useState} from "react";
import Modal from "react-modal";
import {authDecoratorWithoutLogin} from "../../../services/AuthDecorator";
import EventService from "../../../services/EventService";
import {
    popupCloseDropdown,
    popupCloseDropdownWithDate,
    popupCloseDropdownWithTime,
} from "../../../utils/manageElements";
import {FormEventComponent} from "../../formEventComponent/FormEventComponent";
import $ from "jquery";
import {RightFonComponent} from "../../rightFonComponent/RightFonComponent";


export default function CreateEventComponent ({
    isOpen,
    isIPhone,
    user,
    closeComponent,
    openSuccessCreateEvent,
    setEvent,
}) {
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

    const draw = (timePassed) => {
        $('.popup-right').attr('style', `transform: translate(${timePassed / 4 + 'px'}); opacity: ${1 - timePassed/500};`);
    }

    return(
        <Modal
            isOpen={isOpen}
            className={"popup-fon"}
            contentLabel="Example Modal"
            ariaHideApp={false}
        >
            <div className={"popup-fon"} onClick={popupClick}>
                <div className={`popup-frame create-event-component`}>
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
                    <RightFonComponent
                        className={"popup-right"}
                        close={closeWindow}
                        slider={isOpen && window.screen.width > 743 ? true : false}
                        contents={[
                            "Создавай футбольные активности в любом месте и в любое время",
                            "Устанавливай свои правила игры",
                            "Фиксируй статистику матча",
                        ]}
                        imageClasses={["sign-up-fon", "sign-up-fon", "sign-up-fon"]}
                    />
                </div>
            </div>
        </Modal>
    )
}

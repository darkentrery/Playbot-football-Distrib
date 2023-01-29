import React, {useEffect, useRef, useState} from "react";
import Modal from "react-modal";
import {authDecoratorWithoutLogin} from "../services/AuthDecorator";
import EventService from "../services/EventService";
import {
    popupCloseDropdown,
    popupCloseDropdownWithDate,
    popupCloseDropdownWithTime,
} from "../utils/manageElements";
import {FormEventComponent} from "./formEventComponent/FormEventComponent";
import $ from "jquery";


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
    const slideContent = [
        "Создавай футбольные активности в любом месте и в любое время",
        "Устанавливай свои правила игры",
        "Фиксируй статистику матча",
    ];
    const [contentNumber, setContentNumber] = useState(0);
    const slideRef1 = useRef();
    const slideRef2 = useRef();
    const slideRef3 = useRef();
    const [transform, setTransform] = useState(false);
    const refs = [slideRef1, slideRef2, slideRef3];

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

    useEffect(() => {
        if (isOpen) {
            const interval = setInterval(() => {
                if (contentNumber === 2) {
                    setContentNumber(0);
                } else {
                    setContentNumber(contentNumber + 1);
                }
                setTransform(!transform);
            }, 5000)
            return () => clearInterval(interval);
        }
    })

    const Slide = ({i}) => {
        const content = slideContent[i];
        const ref = refs[i];
        return (
            <div className={"popup-right popup-img create-event-img"} ref={ref}>
                <div className={"elem-1"}>
                    <div onClick={closeWindow} className={"btn-close"}></div>
                </div>
                <div className={"elem-2"}>
                    <div className={`point point-icon ${i === 0 ? 'point-big' : ''}`}></div>
                    <div className={`point point-icon ${i === 1 ? 'point-big' : ''}`}></div>
                    <div className={`point point-icon ${i === 2 ? 'point-big' : ''}`}></div>
                </div>
                <span className={`elem-3 black-600-24 ${transform ? 'move' : ''}`}>{content}</span>
            </div>
        )
    }

    const sliders = [<Slide i={0}/>, <Slide i={1}/>, <Slide i={2}/>]

    return(
        <Modal
            isOpen={isOpen}
            className={"popup-fon"}
            contentLabel="Example Modal"
            ariaHideApp={false}
        >
            <div className={"popup-fon"} onClick={popupClick}>
                <div className={`popup-frame create-event-component ${data && data.is_paid ? 'isPaid' : ''}`}>
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
                    {sliders[contentNumber]}
                    {/*<Slide content={slideContent[contentNumber]}/>*/}
                    {/*<div className={"popup-right popup-img create-event-img"}>*/}
                    {/*    <div className={"elem-1"}>*/}
                    {/*        <div onClick={closeWindow} className={"btn-close"}></div>*/}
                    {/*    </div>*/}
                    {/*    <div className={"elem-2"}>*/}
                    {/*        <div className={"point point-big point-icon"}></div>*/}
                    {/*        <div className={"point point-icon"}></div>*/}
                    {/*        <div className={"point point-icon"}></div>*/}
                    {/*    </div>*/}
                    {/*    <span className={"elem-3 black-600-24"}>{slideContent[contentNumber]}</span>*/}
                    {/*</div>*/}
                </div>
            </div>
        </Modal>
    )
}

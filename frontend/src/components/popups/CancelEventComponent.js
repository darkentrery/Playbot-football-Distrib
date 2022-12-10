import {useEffect, useState} from "react";
import Modal from "react-modal";
import $ from "jquery";
import EventService from "../../services/EventService";
import {authDecoratorWithoutLogin} from "../../services/AuthDecorator";
import {InputComponent} from "../inputComponent/InputComponent";


export default function CancelEventComponent ({isOpen, event, closeComponent, setEvent, showMap}) {
    const eventService = new EventService();
    const [reason, setReason] = useState(false);
    const [reasons, setReasons] = useState(false);
    const [errorReason, setErrorReason] = useState(false);
    const [otherReason, setOtherReason] = useState(false);

    const closeWindow = () => {
        setReason(false);
        closeComponent();
        showMap();
    }

    const choiceReason = (e) => {
        let parent = $(e.target).parent('.elem-3');
        parent.children('.el').removeClass('inactive');
        parent.children('.el').addClass('inactive');
        $(e.target).removeClass('inactive');
        setReason($(e.target).html());
        setOtherReason(false);
    }

    const clickOtherReason = (e) => {
        if (!otherReason) {
            let parent = $(e.target).parent('.elem-3');
            parent.children('.el').removeClass('inactive');
            parent.children('.el').addClass('inactive');
            setOtherReason(true);
            setReason(false);
        }
    }

    const inputReason = (value) => {
        setReason(value);
        setErrorReason(false);
    }

    useEffect(() => {
        if (isOpen) {
            eventService.getCancelReasons().then((response) => {
                if (response.status === 200) setReasons(response.data);
            })
        }
    }, [isOpen])

    const sendForm = () => {
        if (reason) {
            event.cancel = true;
            event.cancel_reasons = reason;
            event.city = event.city.name;
            authDecoratorWithoutLogin(eventService.editEvent, event).then((response) => {
                if (response.status === 200) {
                    closeWindow();
                    setEvent(response.data);
                }
            })
        } else {
            setErrorReason("Заполните поле!");
        }
    }

    return(
        <Modal
            isOpen={isOpen}
            className={"popup-fon"}
            contentLabel="Example Modal"
            ariaHideApp={false}
        >
            <div className={`popup-frame cancel-event-component ${otherReason ? 'other-reason' : ''}`}>
                <div className={"elem elem-1"}>
                    <span className={"title-22"}>Отмена игры</span>
                    <div onClick={closeWindow} className={"btn-close"}></div>
                </div>
                <span className={"elem elem-2"}>Укажите причину, по которой вы хотите отменить игру:</span>
                <div className={"elem elem-3"}>
                    {reasons  && reasons.map((item, key) => {
                        return (<span className={"el radio-select-icon inactive"} key={key} id={item.id} onClick={choiceReason}>{item.name}</span>)
                    })}
                    <span className={`el radio-select-icon ${otherReason ? '' : 'inactive'}`} onClick={clickOtherReason}>Другая причина</span>
                    <InputComponent className={`elem elem-4 ${otherReason ? '' : 'hidden'}`}
                                    value={reason} setValue={inputReason} errorText={errorReason} placeholder={"Введите причину"}/>
                </div>
                <button className={"elem elem-5 btn"} onClick={sendForm}>Отменить игру</button>
            </div>
        </Modal>
    )
}
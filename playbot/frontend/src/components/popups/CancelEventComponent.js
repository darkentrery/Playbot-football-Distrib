import {useContext, useEffect, useState} from "react";
import Modal from "react-modal";
import $ from "jquery";
import EventService from "../../services/EventService";
import {authDecoratorWithoutLogin} from "../../services/AuthDecorator";


export default function CancelEventComponent ({isOpen, event, closeComponent}) {
    const eventService = new EventService();
    const [reason, setReason] = useState(false);
    const [reasons, setReasons] = useState(false);

    const closeWindow = () => {
        setReason(false);
        closeComponent();
    }

    const choiceReason = (e) => {
        let parent = $(e.target).parent('.elem-3');
        parent.children('.el').removeClass('inactive');
        parent.children('.el').addClass('inactive');
        $(e.target).removeClass('inactive');
        setReason($(e.target).attr('id'));
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
            authDecoratorWithoutLogin(eventService.editEvent, event).then((response) => {
                if (response.status === 200) {
                    closeWindow();
                    window.location.href = `${process.env.REACT_APP_MAIN_URL}events/event/${event.id}/`
                }
            })
        }
    }

    return(
        <Modal
            isOpen={isOpen}
            className={"popup-fon"}
            contentLabel="Example Modal"
            ariaHideApp={false}
        >
            <div className={"popup-frame cancel-event-component"}>
                <div className={"elem elem-1"}>
                    <span className={"title-22"}>Отмена игры</span>
                    <div onClick={closeWindow} className={"btn-close"}></div>
                </div>
                <span className={"elem elem-2"}>Укажите причину, по которой вы хотите отменить игру:</span>
                <div className={"elem elem-3"}>
                    {reasons  && reasons.map((item, key) => {
                        return (<span className={"el radio-select-icon inactive"} key={key} id={item.id} onClick={choiceReason}>{item.name}</span>)
                    })}
                </div>
                <button className={"elem elem-4 btn"} onClick={sendForm}>Отменить игру</button>
            </div>
        </Modal>
    )
}
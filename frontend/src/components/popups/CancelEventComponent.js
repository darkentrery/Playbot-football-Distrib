import {useEffect, useState} from "react";
import {authDecoratorWithoutLogin} from "../../services/AuthDecorator";
import {CancelComponent} from "../cancelComponent/CancelComponent";
import {eventService} from "../../services/EventService";


export const CancelEventComponent = ({isOpen, event, funcs}) => {
    const [reason, setReason] = useState(false);
    const [reasons, setReasons] = useState(false);

    useEffect(() => {
        if (isOpen) {
            eventService.getCancelReasons().then((response) => {
                if (response.status === 200) setReasons(response.data);
            })
        }
    }, [isOpen])

    const closeWindow = () => {
        funcs.closeComponent();
        funcs.showMap();
    }

    const sendForm = () => {
        event.cancel = true;
        event.cancel_reasons = reason;
        authDecoratorWithoutLogin(eventService.cancelEvent, event).then((response) => {
            if (response.status === 200) {
                funcs.closeComponent();
                funcs.setEvent(response.data);
                funcs.openSuccessCancelEvent();
            }
        })
    }

    return(
        <CancelComponent
            isOpen={isOpen}
            closeComponent={closeWindow}
            event={event}
            reason={reason}
            setReason={setReason}
            reasons={reasons}
            onClick={sendForm}
            title={"Отмена игры"}
            text={"Укажите причину, по которой вы хотите отменить игру:"}
            buttonText={"Отменить игру"}
        />
    )
}
import {useEffect, useState} from "react";
import EventService from "../../services/EventService";
import {authDecoratorWithoutLogin} from "../../services/AuthDecorator";
import {CancelComponent} from "../cancelComponent/CancelComponent";


export const CancelEventComponent = ({isOpen, event, funcs}) => {
    const eventService = new EventService();
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
        event.city = event.city.name;
        authDecoratorWithoutLogin(eventService.cancelEvent, event).then((response) => {
            if (response.status === 200) {
                closeWindow();
                funcs.setEvent(response.data);
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
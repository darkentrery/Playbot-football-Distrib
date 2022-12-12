import {CancelComponent} from "../cancelComponent/CancelComponent";
import {authDecoratorWithoutLogin} from "../../services/AuthDecorator";
import {useEffect, useState} from "react";
import EventService from "../../services/EventService";


export const LeaveEventComponent = ({isOpen, event, funcs}) => {
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
        authDecoratorWithoutLogin(eventService.leaveEvent, {"event": event, "reason": reason}).then((response) => {
            if (response.status === 200) {
                closeWindow();
                funcs.setEvent(response.data);
            }
        })
    }

    return (
        <CancelComponent
            isOpen={isOpen}
            closeComponent={closeWindow}
            event={event}
            reason={reason}
            setReason={setReason}
            reasons={reasons}
            onClick={sendForm}
            title={"Покинуть событие"}
            text={"Укажите причину, по которой вы хотите покуинуть событие:"}
            buttonText={"Отменить игру"}
        />
    )
}
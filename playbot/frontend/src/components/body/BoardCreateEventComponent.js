import React, {useContext, useState} from "react";
import {authDecoratorWithoutLogin} from "../../services/AuthDecorator";
import {
    OpenCreateEventContext,
    OpenCreateEventUnAuthContext,
    OpenSuccessCreateEventContext
} from "../../context/EventContext";
import SuccessCreateEventComponent from "../success/SuccessCreateEventComponent";
import {OpenLoginContext} from "../../context/AuthContext";
import CreateEventUnAuthComponent from "../CreateEventUnAuthComponent";
import EventService from "../../services/EventService";
import CreateEventComponent from "../CreateEventComponent";


export default function BoardCreateEventComponent () {
    const eventService = new EventService();
    const [openCreateEvent, setOpenCreateEvent] = useState(false);
    const [openCreateEventUnAuth, setOpenCreateEventUnAuth] = useState(false);
    const [openSuccessCreateEvent, setOpenSuccessCreateEvent] = useState(false);
    const createEventWindow = { openCreateEvent, setOpenCreateEvent };
    const createEventUnAuthWindow = { openCreateEventUnAuth, setOpenCreateEventUnAuth };
    const createSuccessEventWindow = { openSuccessCreateEvent, setOpenSuccessCreateEvent };
    const {openLogin, setOpenLogin} = useContext(OpenLoginContext);
    const loginWindow = { openLogin, setOpenLogin };

    const getOpenCreateEvent = async () => {
        await authDecoratorWithoutLogin(eventService.getCreateEvent, []).then((response) => {
            if (response.status == 200) {
                setOpenCreateEvent(!openCreateEvent)
            } else {
                setOpenCreateEventUnAuth(!openCreateEventUnAuth)
            }
            console.log(response)
        })
    }

    return (
        <div className={"board-create-event"}>
            <span className={"elem elem-1"}>“Playbot” – твой проводник в мир футбола</span>
            <div className={"elem elem-2"}>
                <span className={"text black-cup-icon"}>Создавай события</span>
                <span className={"text black-hands-icon"}>Находи соперников</span>
                <span className={"text black-running-icon"}>Играй и развивай свой профиль</span>
            </div>
            <div className={"elem elem-3"}>
                <button className={"btn"} onClick={getOpenCreateEvent}><div className={"white-ball-icon"}></div>Создать событие</button>
            </div>

            <OpenCreateEventContext.Provider value={createEventWindow}>
                <OpenSuccessCreateEventContext.Provider value={createSuccessEventWindow}>
                    <CreateEventComponent/>
                </OpenSuccessCreateEventContext.Provider>
            </OpenCreateEventContext.Provider>

            <OpenSuccessCreateEventContext.Provider value={createSuccessEventWindow}>
                <SuccessCreateEventComponent/>
            </OpenSuccessCreateEventContext.Provider>

            <OpenLoginContext.Provider value={loginWindow}>
                <OpenCreateEventUnAuthContext.Provider value={createEventUnAuthWindow}>
                    <CreateEventUnAuthComponent/>
                </OpenCreateEventUnAuthContext.Provider>
            </OpenLoginContext.Provider>
        </div>
    )
}
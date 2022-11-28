import React, {useContext, useState} from "react";
import {authDecoratorWithoutLogin} from "../../services/AuthDecorator";
import {
    OpenCreateEventContext,
    OpenCreateEventUnAuthContext,
    OpenSuccessCreateEventContext
} from "../../context/EventContext";
import SuccessCreateEventComponent from "../success/SuccessCreateEventComponent";
import {OpenLoginContext, OpenSignUpContext} from "../../context/AuthContext";
import CreateEventUnAuthComponent from "../CreateEventUnAuthComponent";
import EventService from "../../services/EventService";
import CreateEventComponent from "../CreateEventComponent";


export default function BoardCreateEventComponent () {
    const eventService = new EventService();
    const [openCreateEvent, setOpenCreateEvent] = useState(false);
    const [openCreateEventUnAuth, setOpenCreateEventUnAuth] = useState(false);
    const [openSuccessCreateEvent, setOpenSuccessCreateEvent] = useState(false);
    const [createEventId, setCreateEventId] = useState(false);
    const createEventWindow = { openCreateEvent, setOpenCreateEvent };
    const createEventUnAuthWindow = { openCreateEventUnAuth, setOpenCreateEventUnAuth };
    const createSuccessEventWindow = { openSuccessCreateEvent, setOpenSuccessCreateEvent, createEventId, setCreateEventId };
    const {openLogin, setOpenLogin} = useContext(OpenLoginContext);
    const {openSignUp, setOpenSignUp} = useContext(OpenSignUpContext);
    const loginWindow = { openLogin, setOpenLogin };
    const signUpWindow = { openSignUp, setOpenSignUp };

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
            <div className={"board-create-event-1280"}>
                <span className={"elem elem-1"}>“Playbot” – твой проводник в мир футбола</span>
                <div className={"elem elem-2"}>
                    <span className={"text black-cup-icon"}>Создавай события</span>
                    <span className={"text black-hands-icon"}>Находи соперников</span>
                    <span className={"text black-running-icon"}>Играй и развивай свой профиль</span>
                </div>
                <div className={"elem elem-3"}>
                    <button className={"btn"} onClick={getOpenCreateEvent}><div className={"white-ball-icon"}></div>Создать событие</button>
                </div>
            </div>

            <div className={"board-create-event-376"}>
                <span className={"elem elem-1 events-376-fon"}>События</span>
                <button className={"elem elem-2 btn"} onClick={getOpenCreateEvent}><div className={"white-plus-icon"}></div></button>
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
                    <OpenSignUpContext.Provider value={signUpWindow}>
                        <CreateEventUnAuthComponent/>
                    </OpenSignUpContext.Provider>
                </OpenCreateEventUnAuthContext.Provider>
            </OpenLoginContext.Provider>
        </div>
    )
}
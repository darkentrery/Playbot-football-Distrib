import React, {useContext, useState} from "react";
import {authDecoratorWithoutLogin} from "../../services/AuthDecorator";
import EventService from "../../services/EventService";
import CreateEventUnAuthComponent from "../CreateEventUnAuthComponent";
import {
    OpenCreateEventContext,
    OpenCreateEventUnAuthContext,
    OpenSuccessCreateEventContext
} from "../../context/EventContext";
import {OpenLoginContext, OpenSignUpContext} from "../../context/AuthContext";
import CreateEventComponent from "../CreateEventComponent";
import SuccessCreateEventComponent from "../success/SuccessCreateEventComponent";


export default function NoEventsComponent () {
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
        })
    }


    return (
        <div className={"body-no-events"}>
            <div className={"elem elem-1 spanish-man-icon"}></div>
            <div className={"elem elem-2"}>
                <span className={"el el-1"}>Стань первым, кто создаст событие!</span>
                <span className={"el el-2"}> В вашем городе пока не создано ни одного события.</span>
                <button className={"el el-3 btn-second"} onClick={getOpenCreateEvent}><div className={"black-ball-icon"}></div>Создать событие</button>
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
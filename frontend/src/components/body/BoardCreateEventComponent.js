import React from "react";


export default function BoardCreateEventComponent ({isAuth, openCreateEvent, openCreateEventUnAuth}) {

    const getOpenCreateEvent = () => {
        if (isAuth) {
            openCreateEvent();
        } else {
            openCreateEventUnAuth();
        }
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
        </div>
    )
}
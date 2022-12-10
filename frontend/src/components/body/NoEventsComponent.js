import React from "react";


export default function NoEventsComponent ({isAuth, openCreateEvent, openCreateEventUnAuth}) {

    const getOpenCreateEvent = () => {
        if (isAuth) {
            openCreateEvent();
        } else {
            openCreateEventUnAuth();
        }
    }

    return (
        <div className={"body-no-events"}>
            <div className={"elem elem-1 spanish-man-icon"}></div>
            <div className={"elem elem-2"}>
                <span className={"el el-1"}>Стань первым, кто создаст событие!</span>
                <span className={"el el-2"}> В вашем городе пока не создано ни одного события.</span>
                <button className={"el el-3 btn-second"} onClick={getOpenCreateEvent}><div className={"black-ball-icon"}></div>Создать событие</button>
            </div>
        </div>
    )
}
import React from "react";


export default function NoEventsComponent ({user, openCreateEvent, openCreateEventUnAuth, setEvent}) {

    const getOpenCreateEvent = () => {
        if (user.isAuth) {
            setEvent(false);
            openCreateEvent();
        } else {
            openCreateEventUnAuth();
        }
    }

    return (
        <div className={"no-events-component"}>
            <div className={"elem elem-1 spanish-man-icon"}></div>
            <div className={"elem elem-2"}>
                <span className={"el el-1 black-600-32"}>Стань первым, кто создаст событие!</span>
                <span className={"el el-2"}> В вашем городе пока не создано ни одного события.</span>
                {((user.isAuth && user.user.is_organizer) || !user.isAuth) &&
                    <span className={"el el-3 btn-second"} onClick={getOpenCreateEvent}>
                        <div className={"black-ball-icon"}></div>
                        Создать событие
                    </span>
                }
            </div>
        </div>
    )
}
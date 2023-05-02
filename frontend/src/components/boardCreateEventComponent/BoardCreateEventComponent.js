import React from "react";


export default function BoardCreateEventComponent ({user, openCreateEvent, openCreateEventUnAuth, setEvent}) {

    const getOpenCreateEvent = () => {
        if (user.isAuth) {
            setEvent(false);
            openCreateEvent();
        } else {
            openCreateEventUnAuth();
        }
    }

    return (
        <div className={"board-create-event-component"}>
            <div className={"board-create-event-1280"}>
                <span className={"elem elem-1 black-700-36"}>“Коробка” – твой проводник в мир футбола</span>
                <div className={"elem elem-2"}>
                    <span className={"black-cup-icon black-600-18"}>Создавай события</span>
                    <span className={"black-hands-icon black-600-18"}>Находи соперников</span>
                    <span className={"black-running-icon black-600-18"}>Играй и развивай свой профиль</span>
                </div>
                {/*{((user.isAuth && user.user.is_organizer) || !user.isAuth) &&*/}
                {/*    <span className={"elem elem-3 btn"} onClick={getOpenCreateEvent}>*/}
                {/*        <div className={"white-ball-icon"}></div>*/}
                {/*        Создать событие*/}
                {/*    </span>*/}
                {/*}*/}
            </div>

            <div className={"board-create-event-376"}>
                <span className={"elem elem-1 events-376-fon white-700-18"}>События</span>
                {/*{((user.isAuth && user.user.is_organizer) || !user.isAuth) &&*/}
                {/*    <span className={"elem elem-2 btn"} onClick={getOpenCreateEvent}>*/}
                {/*        <div className={"white-plus-icon"}></div>*/}
                {/*    </span>*/}
                {/*}*/}
            </div>
        </div>
    )
}
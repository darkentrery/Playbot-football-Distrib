import React from "react";


export const NoEventsProfileComponent = ({openCreateEvent}) => {
    return (
        <div className={"no-events-profile-component"}>
            <div className={"elem elem-1 spanish-man-icon"}></div>
            <div className={"elem elem-2"}>
                <span className={"el black-600-18"}>Создай или присоединись к своему первому событию!</span>
                <span className={"el black-400-16"}>У вас пока нет событий.</span>
                <button className={"el el-744 btn-second"} onClick={openCreateEvent}><div className={"black-ball-icon"}></div>Создать событие</button>
            </div>
        </div>
    )
}
import React from "react-dom";
import {useEffect, useState} from "react";
import EventService from "../../services/EventService";


export const ButtonsBoardPlayerComponent = ({className, event, user, funcs}) => {
    const eventService = new EventService();
    const [ids, setIds] = useState([]);

    useEffect(() => {
        if (event && event.event_player) {
            let arrray = [];
            event.event_player.map((item) => {
                arrray.push(item.player.id);
            })
            setIds(arrray);
        }
    }, [event])

    const joinToEvent = () => {
        eventService.joinPlayer(event).then((response) => {
            if (response.status === 200) funcs.setEvent(response.data);
        })
    }

    const joinUnAuth = () => {
        funcs.removeMap();
        funcs.openUnAuthJoin();
    }

    const leaveEvent = () => {
        funcs.removeMap();
        funcs.openLeaveEvent();
    }

    return (
        <div className={`buttons-board-player-component ${className}`}>
            {!user.isAuth && !ids.includes(user.user.id) && <button className={"el el-1 btn"} onClick={joinUnAuth}>Присоединиться к игре</button>}
            {user.isAuth && !ids.includes(user.user.id) && <button className={"el el-1 btn"} onClick={joinToEvent}>Присоединиться к игре</button>}
            {user.isAuth && ids.includes(user.user.id) && <button className={"el el-1 btn-second"} onClick={leaveEvent}>Покинуть событие</button>}
            {user.isAuth && !ids.includes(user.user.id) && <button className={"el el-1 btn"} onClick={joinToEvent}>Присоединиться к игре</button>}
        </div>
    )
}
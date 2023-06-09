import React from "react-dom";
import {useEffect, useState} from "react";
import {authDecoratorWithoutLogin} from "../../services/AuthDecorator";
import BaseRoutes from "../../routes/BaseRoutes";
import {Link} from "react-router-dom";
import {eventService} from "../../services/EventService";


export const ButtonsBoardPlayerComponent = ({className='', event, user, funcs}) => {
    const [ids, setIds] = useState([]);
    const [idsQueue, setIdsQueue] = useState([]);

    useEffect(() => {
        if (event && event.event_player) {
            let arrray = [];
            event.event_player.forEach((item) => {
                arrray.push(item.player.id);
            })
            setIds(arrray);
            arrray = [];
            event.event_queues.forEach((item) => {
                arrray.push(item.player.id);
            })
            setIdsQueue(arrray);
        }
    }, [event])

    const joinToEvent = () => {
        authDecoratorWithoutLogin(eventService.joinPlayer, event).then((response) => {
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
        <>{!!event && (!event.is_end || (event.is_end && event.event_step.length === 3 && event.event_step[2].complete)) &&
            <div className={`buttons-board-player-component ${className}`}>
                {!!event && <>
                    {event.is_end ?
                        <>{event.event_step.length === 3 && event.event_step[2].complete &&
                            <Link className={"event-action__white-button"} to={BaseRoutes.eventInfoLink(event.id)}>Итоги игры</Link>}
                        </> :

                        <>
                            {!user.isAuth && event.event_step.length < 1 &&
                                <button className={"event-action__orange-button"} onClick={joinUnAuth}>Присоединиться к игре</button>}
                            {user.isAuth && !ids.includes(user.user.id) && !idsQueue.includes(user.user.id) && event.event_step.length < 1 &&
                                <button className={"event-action__orange-button"} onClick={joinToEvent}>Присоединиться к игре</button>}
                            {user.isAuth && (ids.includes(user.user.id) || idsQueue.includes(user.user.id)) && event.event_step.length < 1 &&
                                <button className={"event-action__white-button"} onClick={leaveEvent}>Покинуть событие</button>}
                            {event.event_step.length >= 1 && (event.event_step.length !== 3 || !event.event_step[2].complete) &&
                                <span className={`event-action__orange-button disabled`}>Перейти в меню игры</span>}
                            {event.event_step.length === 3 && event.event_step[2].complete &&
                                <Link className={`event-action__orange-button`} to={BaseRoutes.eventInfoLink(event.id)}>Перейти в меню игры</Link>}
                        </>
                    }
                </>}
            </div>
        }</>
    )
}
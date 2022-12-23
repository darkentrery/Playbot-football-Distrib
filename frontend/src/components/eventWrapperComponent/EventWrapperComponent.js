import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import EventService from "../../services/EventService";
import BaseRoutes from "../../routes/BaseRoutes";


export const EventWrapperComponent = ({children, event, user, funcs}) => {
    const eventService = new EventService();
    const [flagRequest, setFlagRequest] = useState(false);
    const params = useParams();
    const pk = params.pk;

    useEffect(() => {
        if (!flagRequest) {
            eventService.getEvent(pk).then((response) => {
                funcs.setEvent(response.data.event);
            })
        }
        setFlagRequest(true);
    }, [flagRequest])

    return (
        <main className={`event-wrapper-component`}>
            <div className={"event-wrapper-head-1280"}>
                <div className={"elem elem-1"}>
                    <div className={"logo-korobka-icon"}></div>
                    <div className={"black-title-korobka-icon"}></div>
                </div>
                {!window.location.pathname.includes('teams') && <div className={"elem elem-2"}>
                    <div className={"note-orange-icon"}></div>
                    <span className={"orange-400-14 link"}>Включить Playbot,FM </span>
                </div>}
                {!window.location.pathname.includes('teams') && <span className={"elem elem-3 gray-400-14 link"}>Завершить событие</span>}
            </div>
            <div className={"event-wrapper-body"}>
                <div className={"navigate-bar-1280"}>
                    <Link className={`nav-link black-400-14 ${window.location.pathname.includes('info') ? 'active' : ''}`} to={BaseRoutes.eventInfoLink(pk)}>Иформация</Link>
                    {user.isAuth && event && user.user.id === event.organizer.id && <Link className={`nav-link middle-gray-400-12`} to={".."}>Плеер</Link>}
                    <Link className={`nav-link A7-gray-400-14 ${window.location.pathname.includes('teams') ? 'active' : ''}`} to={BaseRoutes.eventInfoTeamsLink(pk)}>Составы команд</Link>
                </div>
                <div className={"navigate-bar-376"}>
                    <Link className={`elem elem-1`} to={BaseRoutes.eventLink(pk)}>
                        <div className={"black-left-arrow-icon"}></div>
                        <span className={"black-500-14"}>Подробности события</span>
                    </Link>
                    <div className={"elem elem-2"}>
                        <Link className={`nav-link  ${window.location.pathname.includes('info') ? 'white-600-12 active' : 'middle-gray-400-12'}`} to={BaseRoutes.eventInfoLink(pk)}>Иформация</Link>
                        {user.isAuth && event && user.user.id === event.organizer.id && <Link className={`nav-link middle-gray-400-12`} to={".."}>Плеер</Link>}
                        <Link className={`nav-link ${window.location.pathname.includes('teams') ? 'white-600-12 active' : 'middle-gray-400-12'}`} to={BaseRoutes.eventInfoTeamsLink(pk)}>Составы команд</Link>
                    </div>
                </div>
                {children}
            </div>
        </main>
    )
}
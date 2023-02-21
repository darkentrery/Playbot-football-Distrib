import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import BaseRoutes from "../../../routes/BaseRoutes";
import {authDecoratorWithoutLogin} from "../../../services/AuthDecorator";
import {Top376Component} from "../../top376Component/Top376Component";
import {eventService} from "../../../services/EventService";


export const EventWrapperComponent = ({children, event, user, game, funcs}) => {
    const [gameId, setGameId] = useState(false);
    const [isEndEvent, setIsEndEvent] = useState(false);
    const { pk } = useParams();

    useEffect(() => {
        funcs.setEvent(false);
        eventService.getEvent(pk).then((response) => {
            let e = response.data.event;
            if (e.time_end) setIsEndEvent(true);
            for (let game of e.event_games) {
                if (!game.time_end || e.event_games[e.event_games.length - 1].id === game.id) {
                    console.log(game)
                    setGameId(game.id);
                    break;
                }
            }
            console.log(gameId)
            funcs.setEvent(e);
        })
    }, [pk, window.location.pathname]) // eslint-disable-line react-hooks/exhaustive-deps

    const endEvent = () => {
        setIsEndEvent(true);
        funcs.setEvent(false);
        authDecoratorWithoutLogin(eventService.endEvent, {"id": pk}).then((response) => {
            if (response.status === 200) {
                console.log(response.status)
                funcs.setEvent(response.data);
            }
        })
    }

    const endGame = () => {
        funcs.openEndGame();
    }

    return (
        <main className={`event-wrapper-component`}>
            <div className={"event-wrapper-head-1280"}>
                <Link className={"elem elem-1"} to={BaseRoutes.main}>
                    <div className={"logo-korobka-icon"}></div>
                    <div className={"black-title-korobka-icon"}></div>
                </Link>
                {!window.location.pathname.includes('teams') && <div className={"elem elem-2"}>
                    <div className={"note-orange-icon"}></div>
                    <span className={"orange-400-14 link"}>Включить Playbot,FM </span>
                </div>}
                {!window.location.pathname.includes('teams') && event && !event.time_end && !isEndEvent &&
                    <span className={"elem elem-3 gray-400-14 link"} onClick={endEvent}>Завершить событие</span>}
                {isEndEvent && <Link className={"elem elem-3 gray-400-14"} to={BaseRoutes.main}>Вернуть на главную</Link>}
            </div>
            <div className={"event-wrapper-body"}>
                <div className={"navigate-bar-1280"}>
                    <Link
                        className={`nav-link ${window.location.pathname.includes('info') ? 'black-400-14 active' : 'A7-gray-400-14'}`}
                        to={BaseRoutes.eventInfoLink(pk)}
                    >Иформация</Link>
                    {user.isAuth && event && user.user.id === event.organizer.id && gameId !== false && <Link
                        className={`nav-link ${window.location.pathname.includes('player-game') ? 'black-400-14 active' : 'A7-gray-400-14'}`}
                        to={BaseRoutes.eventGamePlayerLink(pk, gameId)}
                    >Плеер</Link>}
                    <Link
                        className={`nav-link ${window.location.pathname.includes('teams') ? 'black-400-14 active' : 'A7-gray-400-14'}`}
                        to={BaseRoutes.eventInfoTeamsLink(pk)}
                    >Составы команд</Link>
                    {game && game.time_begin && !game.time_end ? <span className={"nav-link end-game-link orange-400-14"} onClick={endGame}>Завершить игру</span> : ''}
                </div>

                <div className={"navigate-bar-376"}>
                    <Top376Component className={"elem-1"} label={"Подробности события"} to={BaseRoutes.eventLink(pk)}>
                        {game && game.time_begin && !game.time_end && !isEndEvent ? <span className={"black-500-14"} onClick={endGame}>Завершить игру</span> : ''}
                        {isEndEvent && <Link className={"black-500-14"} to={BaseRoutes.main}>Вернуть на главную</Link>}
                    </Top376Component>
                    <div className={"elem elem-2"}>
                        <Link
                            className={`nav-link  ${window.location.pathname.includes('info') ? 'white-600-12 active' : 'middle-gray-400-12'}`}
                            to={BaseRoutes.eventInfoLink(pk)}
                        >Иформация</Link>
                        {user.isAuth && event && user.user.id === event.organizer.id && gameId !== false && <Link
                            className={`nav-link ${window.location.pathname.includes('player-game') ? 'white-600-12 active' : 'middle-gray-400-12'}`}
                            to={BaseRoutes.eventGamePlayerLink(pk, gameId)}
                        >Плеер</Link>}
                        <Link
                            className={`nav-link ${window.location.pathname.includes('teams') ? 'white-600-12 active' : 'middle-gray-400-12'}`}
                            to={BaseRoutes.eventInfoTeamsLink(pk)}
                        >Составы команд</Link>
                    </div>
                </div>
                {children}
            </div>
        </main>
    )
}
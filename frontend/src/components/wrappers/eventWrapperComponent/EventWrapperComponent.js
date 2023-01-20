import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import EventService from "../../../services/EventService";
import BaseRoutes from "../../../routes/BaseRoutes";
import {authDecoratorWithoutLogin} from "../../../services/AuthDecorator";
import {Top376Component} from "../../top376Component/Top376Component";


export const EventWrapperComponent = ({children, event, user, game, funcs}) => {
    const eventService = new EventService();
    const [flagRequest, setFlagRequest] = useState(false);
    const [gameId, setGameId] = useState(0);
    const params = useParams();
    const pk = params.pk;
    const currentId = params.gameId;

    useEffect(() => {
        if (!flagRequest) {
            eventService.getEvent(pk).then((response) => {
                funcs.setEvent(response.data.event);
            })
        }
        setFlagRequest(true);
    }, [flagRequest])

    useEffect(() => {
        if (event) {
            if (event.event_games.length !== 0) setGameId(event.event_games[0].id);
            for (let game of event.event_games) {
                if (game.time_end) setGameId(game.id);
            }
            // if (currentId) {
            //     event.event_games.map((g) => {
            //         if (g.id == currentId) setGame(g);
            //     })
            // }
        }
    }, [event, currentId])

    const endEvent = () => {
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
                <div className={"elem elem-1"}>
                    <div className={"logo-korobka-icon"}></div>
                    <div className={"black-title-korobka-icon"}></div>
                </div>
                {!window.location.pathname.includes('teams') && <div className={"elem elem-2"}>
                    <div className={"note-orange-icon"}></div>
                    <span className={"orange-400-14 link"}>Включить Playbot,FM </span>
                </div>}
                {!window.location.pathname.includes('teams') && event && !event.time_end &&
                    <span className={"elem elem-3 gray-400-14 link"} onClick={endEvent}>Завершить событие</span>}
            </div>
            <div className={"event-wrapper-body"}>
                <div className={"navigate-bar-1280"}>
                    <Link
                        className={`nav-link ${window.location.pathname.includes('info') ? 'black-400-14 active' : 'A7-gray-400-14'}`}
                        to={BaseRoutes.eventInfoLink(pk)}
                    >Иформация</Link>
                    {user.isAuth && event && user.user.id === event.organizer.id && <Link
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
                    <Top376Component className={"elem-1"} label={"Подробности события"} to={BaseRoutes.eventLink(pk)}
                                     child={game && game.time_begin && !game.time_end ? <span className={"elem-2 black-500-14"} onClick={endGame}>Завершить игру</span> : ''}
                    />

                    <div className={"elem elem-2"}>
                        <Link
                            className={`nav-link  ${window.location.pathname.includes('info') ? 'white-600-12 active' : 'middle-gray-400-12'}`}
                            to={BaseRoutes.eventInfoLink(pk)}
                        >Иформация</Link>
                        {user.isAuth && event && user.user.id === event.organizer.id && <Link
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
import VisibleEventWrapper from "../../../redux/containers/VisibleEventWrapper";
import React, {useEffect, useState} from "react";
import {getMinutesStr} from "../../../utils/dates";
import {Link} from "react-router-dom";
import EventRoutes from "../../../routes/EventRoutes";
import {LoaderComponent} from "../../loaderComponent/LoaderComponent";
import {eventService} from "../../../services/EventService";



export const GeneralInformationComponent = ({event, user, funcs}) => {
    const [headItems, setHeadItems] = useState(false);

    useEffect(() => {
        if (event) {
            let count_circles = event.count_circles.replace(/\D/g, "");
            let duration = event.duration.duration.toString();
            let durationLabel = getMinutesStr(duration);
            let totalDuration = count_circles * duration;
            let totalDurationLabel = getMinutesStr(totalDuration.toString());
            setHeadItems([
                ["Формат игры:", event.format],
                ["Кол. игроков:", event.count_current_players],
                ["Кол. кругов:", count_circles],
                ["Время матча:", `${duration} ${durationLabel}`],
                ["Общее время:", `${totalDuration} ${totalDurationLabel}`]
            ]);
            console.log(event)
        }
    }, [event])

    const EventTable = ({children, title, className}) => {
        return (
            <div className={"table"}>
                <div className={"table-head"}>
                    <div className={className}></div>
                    <span className={"black-500-16"}>{title}</span>
                </div>
                <div className={"table-body"}>
                    {children}
                </div>
            </div>
        )
    }

    const GameRow = ({gray=false, value1, value2, value4, game, flagBegin, pk}) => {
        const [value3, setValue3] = useState(false);
        useEffect(() => {
            if (game) {
                if (!game.time_begin) {
                    setValue3(<div className={"gray-cross-icon"}></div>);
                } else if (game.time_begin && !game.time_end) {
                    setValue3(<div className={"point-icon"}></div>);
                } else if (game.time_end) {
                    setValue3(`${game.score_1} : ${game.score_2}`);
                }
            }
        }, [game])

        return (<>
            {(!user.isAuth || !event || event.organizer.id !== user.user.id || !game.time_begin) &&
            <div className={"game-row"}>
                <div className={"elem-1"}>
                    <span className={`el el-1 ${gray ? 'gray-400-13' : 'black-600-13'}`}>{value1}.</span>
                    <span className={`el el-2 ${gray ? 'gray-400-13' : 'black-400-13'}`}>{value2}</span>
                    <span className={`el el-3 ${gray ? 'gray-400-13' : 'black-400-13'}`}>{value3}</span>
                    <span className={`el el-4 ${gray ? 'gray-400-13' : 'black-400-13'}`}>{value4}</span>
                </div>
                {user.isAuth && event && event.organizer.id === user.user.id &&
                    <Link className={`elem-2 btn ${flagBegin ? '' : 'hidden'}`}
                          to={EventRoutes.eventGamePlayerLink(pk, game.id)}>Начать игру</Link>}
            </div>}
            {(user.isAuth && event && event.organizer.id === user.user.id && game.time_begin) &&
            <Link className={"game-row"} to={EventRoutes.eventGamePlayerLink(pk, game.id)}>
                <div className={"elem-1"}>
                    <span className={`el el-1 ${gray ? 'gray-400-13' : 'black-600-13'}`}>{value1}.</span>
                    <span className={`el el-2 ${gray ? 'gray-400-13' : 'black-400-13'}`}>{value2}</span>
                    <span className={`el el-3 ${gray ? 'gray-400-13' : 'black-400-13'}`}>{value3}</span>
                    <span className={`el el-4 ${gray ? 'gray-400-13' : 'black-400-13'}`}>{value4}</span>
                </div>
                {user.isAuth && event && event.organizer.id === user.user.id &&
                    <Link className={`elem-2 btn ${flagBegin ? '' : 'hidden'}`}
                          to={EventRoutes.eventGamePlayerLink(pk, game.id)}>Начать игру</Link>}
            </Link>}
        </>)
    }

    const TournamentRow = ({gray=false, value1, value2, value3, value4, value5, value6, flagFinish=false}) => {
        return (
            <div className={`tournament-row ${gray ? 'gray-bottom': ''}`}>
                <span className={`elem elem-1 ${gray ? 'gray-400-13' : `${flagFinish ? 'black-700-13' : 'black-400-13'}`}`}>{value1}.</span>
                <span className={`elem elem-2 ${gray ? 'gray-400-13' : `${flagFinish ? 'black-700-13' : 'black-400-13'}`}`}>{value2}</span>
                <span className={`elem elem-3 ${gray ? 'gray-400-13' : `${flagFinish ? 'black-700-13' : 'black-400-13'}`}`}>{value3}</span>
                <span className={`elem elem-4 ${gray ? 'gray-400-13' : `${flagFinish ? 'black-700-13' : 'black-400-13'}`}`}>{value4}</span>
                {gray ? <span className={`elem elem-5 gray-400-13`}><div className={"ball-icon"}></div>{value5}</span>
                    : <span className={`elem elem-5 ${flagFinish ? 'black-700-13' : 'black-400-13'}`}>{value5}</span>}
                <span className={`elem elem-6 ${gray ? 'gray-400-13' : `${flagFinish ? 'black-700-13' : 'black-400-13'}`}`}>{value6}</span>
            </div>
        )
    }

    const PlayerRow = ({gray=false, isPlayer=true, value1, value2, value3, value4, value5, value6, value7=false}) => {
        return (
            <div className={`player-row ${gray ? 'gray-bottom': ''}`}>
                <span className={`elem elem-1 ${gray ? 'gray-400-13' : 'black-400-13'}`}>{value1}.</span>
                <div className={"elem elem-2"}>
                    {isPlayer && <div className={"icon player-avatar-icon"}></div>}
                    <span className={gray ? 'gray-400-13' : 'black-400-13'}>{isPlayer ? eventService.getCutUsername(value2) : value2}</span>
                </div>
                <span className={`elem elem-3 ${gray ? 'gray-400-13' : 'black-400-13'}`}>{value3}</span>
                <span className={`elem elem-4 ${gray ? 'gray-400-13' : 'black-400-13'}`}>{value4}</span>
                <span className={`elem elem-5 ${gray ? 'gray-400-13' : 'black-400-13'}`}>{value5}</span>
                <span className={`elem elem-6 ${gray ? 'gray-400-13' : 'black-400-13'}`}>
                    {!!gray && value6}
                    {!gray && <span className={typeof value6 === "number" && value6 > 0 ? "black-400-13 green" : "black-400-13 red"}>
                        {value6 !== false && typeof value6 === "number" && (value6 > 0 ? `+${value6.toFixed(2)}` : value6.toFixed(2))}
                    </span>}
                    &nbsp;{!!value7 || value7 === 0 ? `(${value7.toFixed(2)})` : ''}
                </span>
            </div>
        )
    }

    return (
        <VisibleEventWrapper>
            <div className={"general-information-component"}>
                {!event && <LoaderComponent/>}
                <EventTable title={"Регламент"} className={"black-reglament-icon"}>
                    <div className={"reglament-row"}>
                        {headItems !== false && headItems.map((item, key) => (
                            <div className={"el"} key={key}>
                                <span className={"black-300-13"}>{item[0]}</span>
                                <span className={"black-600-13"}>{item[1]}</span>
                            </div>
                        ))}
                    </div>
                </EventTable>
                <EventTable title={"Игры"} className={"black-foot-with-ball-icon"}>
                    {event && event.event_games.map((game, key) => (
                        <GameRow
                            gray={game.time_end ? true : false}
                            value1={game.number}
                            value2={game.team_1.name}
                            // value3={game.time_end ? `${game.score_1} : ${game.score_2}` : <div className={"gray-cross-icon"}></div>}
                            value4={game.team_2.name} key={key}
                            game={game}
                            flagBegin={(key === 0 && !game.time_begin) || (key > 0 && event.event_games[key - 1].time_end && !game.time_begin) ? true : false}
                            pk={event.id}
                        />
                    ))}
                </EventTable>
                <EventTable title={"Турнирная таблица"} className={"black-event-table-icon"}>
                    <TournamentRow gray={true} value1={"№"} value2={"Команда"} value3={"И"} value4={"В / Н / П"} value5={"З-П"} value6={"О"}/>
                    {event && event.teams.map((team, key) => (
                        <TournamentRow
                            value1={key + 1}
                            value2={team.name}
                            value3={team.played}
                            value4={`${team.wins} / ${team.nothing} / ${team.loss}`}
                            value5={`${team.do_goals} - ${team.miss_goals}`}
                            value6={team.scores}
                            key={key}
                            flagFinish={team.played ? true : false}
                        />
                    ))}
                </EventTable>
                <EventTable title={"Игроки"} className={"socer-player-icon"}>
                    <PlayerRow gray={true} isPlayer={false} value1={"№"} value2={"Имя "} value3={"И"} value4={"П"} value5={"З"} value6={"Рейтинг"}/>
                    {event && event.event_player.map((player, key) => (
                        <PlayerRow
                            value1={key + 1}
                            value2={player.player.username}
                            value3={player.played}
                            value4={player.wins}
                            value5={player.do_goals}
                            value6={event.is_end ? player.delta_rank : false}
                            value7={player.player.rank}
                            key={key}
                        />
                    ))}
                </EventTable>
            </div>
        </VisibleEventWrapper>
    )
}
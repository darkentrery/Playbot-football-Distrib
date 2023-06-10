import VisibleEventWrapper from "../../../redux/containers/VisibleEventWrapper";
import React, {useEffect, useState} from "react";
import {getMinutesStr} from "../../../utils/dates";
import {Link} from "react-router-dom";
import EventRoutes from "../../../routes/EventRoutes";
import {LoaderComponent} from "../../loaderComponent/LoaderComponent";
import {eventService} from "../../../services/EventService";
import avatarIcon from "../../../assets/icon/avatar-2.png";
import {PlayerIconComponent} from "../../playerIconComponent/PlayerIconComponent";



export const GeneralInformationComponent = ({event, user, funcs}) => {
    const [headItems, setHeadItems] = useState(false);

    useEffect(() => {
        if (event) {
            let count_circles = event.count_circles.replace(/\D/g, "");
            let duration = event.duration.duration.toString();
            let durationLabel = getMinutesStr(duration);
            let totalDuration = event.event_games.length * duration;
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

    const EventTable = ({children, title, className, color=false}) => {
        return (
            <div className={"table"}>
                <div className={"table-head"}>
                    <div className={className}></div>
                    {color && <div className={"color"} style={{backgroundColor: color}}></div>}
                    <span className={"black-500-16"}>{title}</span>
                </div>
                <div className={"table-body"}>
                    {children}
                </div>
            </div>
        )
    }

    const GameRow = ({gray=false, value1, value2, value4, game, flagBegin, pk, color1, color2}) => {
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
            {(!user.isAuth || !event || !eventService.isOrganizer(event, user.user) || !game.time_begin) &&
            <div className={"game-row"}>
                <div className={"elem-1"}>
                    <span className={`el el-1 ${gray ? 'gray-400-13' : 'black-600-13'}`}>{value1}.</span>
                    <span className={`el el-2 ${gray ? 'gray-400-13' : 'black-400-13'}`}>
                        {!!color1 && <div className={"color"} style={{backgroundColor: color1}}>&nbsp;&nbsp;</div>}{value2}
                    </span>
                    <span className={`el el-3 ${gray ? 'gray-400-13' : 'black-400-13'}`}>{value3}</span>
                    <span className={`el el-4 ${gray ? 'gray-400-13' : 'black-400-13'}`}>
                        {!!color2 && <div className={"color"} style={{backgroundColor: color2}}>&nbsp;&nbsp;</div>}{value4}
                    </span>
                </div>
                {user.isAuth && event && eventService.isOrganizer(event, user.user) &&
                    <Link className={`elem-2 btn ${flagBegin ? '' : 'hidden'}`}
                          to={EventRoutes.eventGamePlayerLink(pk, game.id)}>Начать игру</Link>}
            </div>}
            {(user.isAuth && event && eventService.isOrganizer(event, user.user) && game.time_begin) &&
            <Link className={"game-row"} to={EventRoutes.eventGamePlayerLink(pk, game.id)}>
                <div className={"elem-1"}>
                    <span className={`el el-1 ${gray ? 'gray-400-13' : 'black-600-13'}`}>{value1}.</span>
                    <span className={`el el-2 ${gray ? 'gray-400-13' : 'black-400-13'}`}>
                        {!!color1 && <div className={"color"} style={{backgroundColor: color1}}>&nbsp;&nbsp;</div>}{value2}
                    </span>
                    <span className={`el el-3 ${gray ? 'gray-400-13' : 'black-400-13'}`}>{value3}</span>
                    <span className={`el el-4 ${gray ? 'gray-400-13' : 'black-400-13'}`}>
                        {!!color2 && <div className={"color"} style={{backgroundColor: color2}}>&nbsp;&nbsp;</div>}{value4}
                    </span>
                </div>
                {user.isAuth && eventService.isOrganizer(event, user.user) &&
                    <Link className={`elem-2 btn ${flagBegin ? '' : 'hidden'}`}
                          to={EventRoutes.eventGamePlayerLink(pk, game.id)}>Начать игру</Link>}
            </Link>}
        </>)
    }

    const TournamentRow = ({gray=false, value1, value2, value3, value4, value5, value6, color=false, flagFinish=false}) => {
        return (
            <div className={`tournament-row ${gray ? 'gray-bottom': ''}`}>
                <span className={`elem elem-1 ${gray ? 'gray-400-13' : `${flagFinish ? 'black-700-13' : 'black-400-13'}`}`}>{value1}.</span>
                <span className={`elem elem-2 ${gray ? 'gray-400-13' : `${flagFinish ? 'black-700-13' : 'black-400-13'}`}`}>
                    {!!color && <div className={"color"} style={{backgroundColor: color}}>&nbsp;&nbsp;</div>}{value2}
                </span>
                <span className={`elem elem-3 ${gray ? 'gray-400-13' : `${flagFinish ? 'black-700-13' : 'black-400-13'}`}`}>{value3}</span>
                <span className={`elem elem-4 ${gray ? 'gray-400-13' : `${flagFinish ? 'black-700-13' : 'black-400-13'}`}`}>{value4}</span>
                {gray ? <span className={`elem elem-5 gray-400-13`}><div className={"ball-icon"}></div>{value5}</span>
                    : <span className={`elem elem-5 ${flagFinish ? 'black-700-13' : 'black-400-13'}`}>{value5}</span>}
                <span className={`elem elem-6 ${gray ? 'gray-400-13' : `${flagFinish ? 'black-700-13' : 'black-400-13'}`}`}>{value6}</span>
            </div>
        )
    }

    const PlayerRow = ({gray=false, isPlayer=true, value1, value2, value3, value4, value5, value6, value7, value8=false}) => {
        const [color, setColor] = useState("gray");

        useEffect(() => {
            if (value7 !== false) {
                if (value7 > 0) {
                    setColor('green');
                } else if (value7 < 0) {
                    setColor('red');
                } else {
                    setColor('gray');
                }
            }
        }, [value7])

        return (
            <div className={`player-row ${gray ? 'gray-bottom': ''}`}>
                <span className={`elem elem-1 ${gray ? 'gray-400-13' : 'black-400-13'}`}>{value1}.</span>
                <div className={"elem elem-2"}>
                    {isPlayer && <PlayerIconComponent/>}
                    {/*{isPlayer && <img src={avatarIcon} className={"icon"} alt=""/>}*/}
                    <span className={gray ? 'gray-400-13' : 'black-400-13'}>{isPlayer ? eventService.getCutUsername(value2) : value2}</span>
                </div>
                <span className={`elem elem-3 ${gray ? 'gray-400-13' : 'black-400-13'}`}>{value3}</span>
                <span className={`elem elem-4 ${gray ? 'gray-400-13' : 'black-400-13'}`}>{value4}</span>
                <span className={`elem elem-5 ${gray ? 'gray-400-13' : 'black-400-13'}`}>{value5}</span>
                <span className={`elem elem-6 ${gray ? 'gray-400-13' : 'black-400-13'}`}>{value6}</span>
                <span className={`elem elem-7 ${gray ? 'gray-400-13' : 'black-400-13'}`}>
                    {!!gray ? value7 :
                        <>{!gray && value7 === false ? '' :
                            <span className={`black-400-13 ${color}`}>
                                {(value7 > 0 ? `+${value7}` : value7)}
                            </span>
                        }</>
                    }

                    &nbsp;{!!value8 || value8 === 0 ? `(${value8})` : ''}
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
                            color1={game.team_1.color ? game.team_1.color.color_hex : false}
                            color2={game.team_2.color ? game.team_2.color.color_hex : false}
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
                            color={team.color ? team.color.color_hex : false}
                            key={key}
                            flagFinish={team.played ? true : false}
                        />
                    ))}
                </EventTable>
                <div className={"team-players"}>
                    {!!event && event.teams.map((team, id) => (
                        <EventTable title={team.name} className={"socer-player-icon"} key={id} color={team.color ? team.color.color_hex : false}>
                            <PlayerRow gray={true} isPlayer={false} value1={"№"} value2={"Имя "} value3={"GAM"}
                                       value4={"GOL"} value5={"AST"} value6={"GOL+AST"} value7={"Рейтинг"}/>
                            {team.team_players.map((player, key) => (
                                <PlayerRow
                                    value1={key + 1}
                                    value2={player.player.username}
                                    value3={team.played}
                                    value4={player.do_goals}
                                    value5={player.do_assist}
                                    value6={player.do_goals + player.do_assist}
                                    value7={event.is_end ? player.delta_rank : false}
                                    value8={player.player.rank}
                                    key={key}
                                />
                            ))}
                        </EventTable>
                    ))}
                </div>
            </div>
        </VisibleEventWrapper>
    )
}
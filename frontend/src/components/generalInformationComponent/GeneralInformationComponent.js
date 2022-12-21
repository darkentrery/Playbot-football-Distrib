import VisibleEventWrapper from "../../redux/containers/VisibleEventWrapper";
import React, {useEffect, useState} from "react";
import {getMinutesStr} from "../../utils/dates";


export const GeneralInformationComponent = ({event, user, funcs}) => {
    const [headItems, setHeadItems] = useState(false);

    useEffect(() => {
        if (event) {
            let count_circles = event.count_circles.replace(/\D/g, "");
            let duration = event.duration.replace(/\D/g, "");
            let durationLabel = getMinutesStr(duration);
            let totalDuration = count_circles * duration;
            let totalDurationLabel = getMinutesStr(totalDuration.toString());
            setHeadItems([
                ["Формат игры:", event.format],
                ["Кол. игроков:", event.event_player.length],
                ["Кол. кругов:", count_circles],
                ["Время матча:", `${duration} ${durationLabel}`],
                ["Общее время:", `${totalDuration} ${totalDurationLabel}`]
            ]);
        }
    }, [event])

    const EventTable = ({event, children, title, className}) => {
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

    const GameRow = ({gray=false, value1, value2, value3, value4}) => {
        return (
            <div className={"game-row"}>
                <div className={"elem-1"}>
                    <span className={`el el-1 ${gray ? 'gray-400-13' : 'black-600-13'}`}>{value1}.</span>
                    <span className={`el el-2 ${gray ? 'gray-400-13' : 'black-400-13'}`}>{value2}</span>
                    <span className={`el el-3 ${gray ? 'gray-400-13' : 'black-400-13'}`}>{value3}</span>
                    <span className={`el el-4 ${gray ? 'gray-400-13' : 'black-400-13'}`}>{value4}</span>
                </div>
                <span className={"elem-2 btn white-500-12"}>Начать игру</span>
            </div>
        )
    }

    const TournamentRow = ({gray=false, value1, value2, value3, value4, value5, value6}) => {
        return (
            <div className={`tournament-row ${gray ? 'gray-bottom': ''}`}>
                <span className={`elem elem-1 ${gray ? 'gray-400-13' : 'black-400-13'}`}>{value1}.</span>
                <span className={`elem elem-2 ${gray ? 'gray-400-13' : 'black-400-13'}`}>{value2}</span>
                <span className={`elem elem-3 ${gray ? 'gray-400-13' : 'black-400-13'}`}>{value3}</span>
                <span className={`elem elem-4 ${gray ? 'gray-400-13' : 'black-400-13'}`}>{value4}</span>
                {gray ? <span className={`elem elem-5 gray-400-13`}><div className={"ball-icon"}></div>{value5}</span>
                    : <span className={`elem elem-5 black-400-13`}>{value5}</span>}
                <span className={`elem elem-6 ${gray ? 'gray-400-13' : 'black-400-13'}`}>{value6}</span>
            </div>
        )
    }

    const PlayerRow = ({gray=false, value1, value2, value3, value4, value5, value6}) => {
        return (
            <div className={`player-row ${gray ? 'gray-bottom': ''}`}>
                <span className={`elem elem-1 ${gray ? 'gray-400-13' : 'black-400-13'}`}>{value1}.</span>
                <span className={`elem elem-2 ${gray ? 'gray-400-13' : 'black-400-13 player-avatar-icon'}`}>{value2}</span>
                <span className={`elem elem-3 ${gray ? 'gray-400-13' : 'black-400-13'}`}>{value3}</span>
                <span className={`elem elem-4 ${gray ? 'gray-400-13' : 'black-400-13'}`}>{value4}</span>
                <span className={`elem elem-5 ${gray ? 'gray-400-13' : 'black-400-13'}`}>{value5}</span>
                <span className={`elem elem-6 ${gray ? 'gray-400-13' : 'black-400-13'}`}>{value6}</span>
            </div>
        )
    }

    return (
        <VisibleEventWrapper>
            <div className={"general-information-component"}>
                <EventTable event={event} title={"Регламент"} className={"black-reglament-icon"}>
                    <div className={"reglament-row"}>
                        {headItems !== false && headItems.map((item, key) => (
                            <div className={"el"} key={key}>
                                <span className={"black-300-13"}>{item[0]}</span>
                                <span className={"black-600-13"}>{item[1]}</span>
                            </div>
                        ))}
                    </div>
                </EventTable>
                <EventTable event={event} title={"Игры"} className={"black-foot-with-ball-icon"}>
                    <GameRow gray={true} value1={"1"} value2={"Команда 1"} value3={<div className={"gray-cross-icon"}></div>} value4={"Команда 1"}/>

                </EventTable>
                <EventTable event={event} title={"Турнирная таблица"} className={"black-event-table-icon"}>
                    <TournamentRow gray={true} value1={"№"} value2={"Команда"} value3={"И"} value4={"В / Н / П"} value5={"З-П"} value6={"О"}/>
                    {event && event.teams.map((team, key) => (
                        <TournamentRow value1={team.number} value2={team.name} value3={"И"} value4={"В / Н / П"} value5={"З-П"} value6={"О"} key={key}/>
                    ))}
                </EventTable>
                <EventTable event={event} title={"Игроки"} className={"socer-player-icon"}>
                    <PlayerRow gray={true} value1={"№"} value2={"Имя "} value3={"И"} value4={"П"} value5={"З"} value6={"Рейтинг"}/>
                    {event && event.event_player.map((player, key) => (
                        <PlayerRow value1={key + 1} value2={player.player.username} value3={"И"} value4={"П"} value5={"З"} value6={"Рейтинг"} key={key}/>
                    ))}
                </EventTable>
            </div>
        </VisibleEventWrapper>
    )
}
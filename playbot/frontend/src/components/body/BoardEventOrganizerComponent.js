import React from "react-dom";
import {authDecoratorWithoutLogin} from "../../services/AuthDecorator";
import EventService from "../../services/EventService";
import {getMonth, getWeekDay} from "../../utils/dates";


export default function BoardEventOrganizerComponent ({event, funcs}) {
    const eventService = new EventService();
    let date = new Date();
    if (event) {
        date = new Date(event.date);
    }
    const toConfirmPlayers = (e) => {
        funcs.openConfirmPlayers();
        e.target.blur();
        authDecoratorWithoutLogin(eventService.toConfirmPlayers, event).then((response) => {
            funcs.setEvent(response.data);
        })
        funcs.removeMap();
    }
    const toFillRegulation = (e) => {
        funcs.openFillRegulation();
        e.target.blur();
        funcs.removeMap();
    }
    const toConfirmTeams = (e) => {
        funcs.openConfirmTeams();
        e.target.blur();
        funcs.removeMap();
    }

    return (
        <div className={"board-event-component"}>
            <div className={"board-event-1280"}>
                <div className={"elem elem-1"}>
                    <span className={"el el-1 dark-gray-cup-icon"}>78,8</span>
                    <span className={"el el-2 dark-gray-avatar-icon"}>{event.event_player.length}/{event.count_players}</span>
                    <span className={"el el-3 dark-gray-star-icon"}>В избранное</span>
                </div>
                <span className={"elem elem-2"}>{event.name}</span>
                <span className={"elem elem-3"}>{date.getDate()} {getMonth(date)} {date.getFullYear()}, {event ? event.time_begin.slice(0, 5) : ''} {getWeekDay(date)}</span>
                <div className={"elem elem-4"}>
                    {event.event_step.length === 0 && <button className={"el el-1 btn"} onClick={toConfirmPlayers}>Начать игру</button>}
                    {event.event_step.length === 0 && <button className={"el el-2 btn-second"} onClick={funcs.openCancelEvent}>Отменить игру</button>}
                    {event.event_step.length === 1 && event.event_step[0]["complete"] === false && <button className={"el el-3 btn-second"} onClick={toConfirmPlayers}>Подтвердить игроков</button>}
                    {event.event_step.length === 2 && event.event_step[1]["complete"] === false && <button className={"el el-3 btn-second"} onClick={toFillRegulation}>Заполнить регламент</button>}
                    {event.event_step.length === 3 && event.event_step[2]["complete"] === false && <button className={"el el-3 btn-second"} onClick={toConfirmTeams}>Подтвердите команды</button>}
                    {event.event_step.length === 3 && event.event_step[2]["complete"] === true && <button className={"el el-3 btn-second"} onClick={toConfirmPlayers}>Подробности события</button>}
                </div>
            </div>

            <div className={"board-event-376"}>
                <div className={"elem elem-1"}>
                    <span className={"el el-1 dark-gray-cup-icon"}>78,8</span>
                    <span className={"el el-2 dark-gray-avatar-icon"}>{event.event_player.length}/{event.count_players}</span>
                    <span className={"el el-3 dark-gray-message-icon"}>8</span>
                    <span className={"el el-4 dark-gray-star-icon"}></span>
                </div>
                <span className={"elem elem-2"}>{event.name}</span>
                <span className={"elem elem-3"}>{date.getDate()} {getMonth(date)} {date.getFullYear()}, {event ? event.time_begin.slice(0, 5) : ''} {getWeekDay(date)}</span>
                <div className={"elem elem-4"}>
                    {event.event_step.length === 0 && <button className={"el el-1 btn"} onClick={toConfirmPlayers}>Начать игру</button>}
                    {event.event_step.length === 0 && <button className={"el el-2 btn-second"} onClick={funcs.openCancelEvent}>Отменить игру</button>}
                    {event.event_step.length === 1 && !event.event_step[0]["complete"] && <button className={"el el-3 btn-second"} onClick={toConfirmPlayers}>Подтвердить игроков</button>}
                    {event.event_step.length === 2 && !event.event_step[1]["complete"] && <button className={"el el-3 btn-second"} onClick={toFillRegulation}>Заполнить регламент</button>}
                    {event.event_step.length === 3 && !event.event_step[2]["complete"] && <button className={"el el-3 btn-second"} onClick={toConfirmTeams}>Подтвердите команды</button>}
                    {event.event_step.length === 3 && event.event_step[2]["complete"] && <button className={"el el-3 btn-second"} onClick={toConfirmPlayers}>Подробности события</button>}
                </div>
            </div>
        </div>
    )
}
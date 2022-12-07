import React from "react-dom";
import {authDecoratorWithoutLogin} from "../../services/AuthDecorator";
import EventService from "../../services/EventService";
import {getMonth} from "../../utils/dates";


export default function BoardEventOrganizerComponent ({event, steps, funcs}) {
    const eventService = new EventService();
    let date = new Date();
    if (event) {
        date = new Date(event.date);
    }
    const toConfirmPlayers = (e) => {
        funcs.openConfirmPlayers();
        e.target.blur();
        authDecoratorWithoutLogin(eventService.toConfirmPlayers, event).then((response) => {
            funcs.setSteps(response.data);
        })
    }
    const toFillRegulation = (e) => {
        funcs.openFillRegulation();
        e.target.blur();
    }
    const toConfirmTeams = (e) => {
        funcs.openConfirmTeams();
        e.target.blur();
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
                <span className={"elem elem-3"}>{date.getDate()} {getMonth(date)} {date.getFullYear()}, {event ? event.time_begin.slice(0, 5) : ''}</span>
                <div className={"elem elem-4"}>
                    {steps.length === 0 && <button className={"el el-1 btn"} onClick={toConfirmPlayers}>Начать игру</button>}
                    {steps.length === 0 && <button className={"el el-2 btn-second"} onClick={funcs.openCancelEvent}>Отменить игру</button>}
                    {steps.length === 1 && steps[0]["complete"] === false && <button className={"el el-3 btn-second"} onClick={toConfirmPlayers}>Подтвердить игроков</button>}
                    {steps.length === 2 && steps[1]["complete"] === false && <button className={"el el-3 btn-second"} onClick={toFillRegulation}>Заполнить регламент</button>}
                    {steps.length === 3 && steps[2]["complete"] === false && <button className={"el el-3 btn-second"} onClick={toConfirmTeams}>Подтвердите команды</button>}
                    {steps.length === 3 && steps[2]["complete"] === true && <button className={"el el-3 btn-second"} onClick={toConfirmPlayers}>Подробности события</button>}
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
                <span className={"elem elem-3"}>{date.getDate()} {getMonth(date)} {date.getFullYear()}, {event ? event.time_begin.slice(0, 5) : ''}</span>
                <div className={"elem elem-4"}>
                    {steps.length === 0 && <button className={"el el-1 btn"} onClick={toConfirmPlayers}>Начать игру</button>}
                    {steps.length === 0 && <button className={"el el-2 btn-second"} onClick={funcs.openCancelEvent}>Отменить игру</button>}
                    {steps.length === 1 && steps[0]["complete"] === false && <button className={"el el-3 btn-second"} onClick={toConfirmPlayers}>Подтвердить игроков</button>}
                    {steps.length === 2 && steps[1]["complete"] === false && <button className={"el el-3 btn-second"} onClick={toFillRegulation}>Заполнить регламент</button>}
                    {steps.length === 3 && steps[2]["complete"] === false && <button className={"el el-3 btn-second"} onClick={toConfirmTeams}>Подтвердите команды</button>}
                    {steps.length === 3 && steps[2]["complete"] === true && <button className={"el el-3 btn-second"} onClick={toConfirmPlayers}>Подробности события</button>}
                </div>
            </div>
        </div>
    )
}
import React from "react-dom";
import {authDecoratorWithoutLogin} from "../../services/AuthDecorator";
import EventService from "../../services/EventService";
import BaseRoutes from "../../routes/BaseRoutes";
import {Link} from "react-router-dom";


export const ButtonsBoardOrganizerComponent = ({event, funcs}) => {
    const eventService = new EventService();
    let date = new Date(event.date);
    // if (event) {
    //     date = new Date(event.date);
    // }
    console.log(event)
    let activatDate = date.setHours(date.getHours() - 1)

    const toConfirmPlayers = (e) => {
        if (Date.now() >= activatDate) {
            funcs.openConfirmPlayers();
            e.target.blur();
            authDecoratorWithoutLogin(eventService.toConfirmPlayers, event).then((response) => {
                funcs.setEvent(response.data);
            })
            funcs.removeMap();
        }
    }
    const toFillRegulation = (e) => {
        funcs.openFillRegulation();
        e.target.blur();
        funcs.removeMap();
    }
    const toConfirmTeams = (e) => {
        if (event.distribution_method === "Автоматический") {
            funcs.openConfirmTeams();
        } else {
            funcs.openConfirmTeamPlayers();
        }
        e.target.blur();
        funcs.removeMap();
    }

    const toCancelEvent = () => {
        funcs.openCancelEvent();
        funcs.removeMap();
    }

    const toResults = () => {

    }

    const repeatEvent = () => {
        funcs.openRepeatEvent();
        funcs.removeMap();
    }

    return (
        <div className={"elem elem-4"}>
            {!event.cancel && event.event_step.length === 0 && !event.time_end &&
                <button className={`el el-1 btn ${Date.now() < activatDate ? 'disabled' : ''}`} onClick={toConfirmPlayers}>Начать игру</button>}
            {!event.cancel && event.event_step.length === 0 && !event.time_end &&
                <button className={"el el-2 btn-second"} onClick={toCancelEvent}>Отменить игру</button>}
            {!event.cancel && event.event_step.length === 1 && !event.event_step[0]["complete"] && !event.time_end &&
                <button className={"el el-3 btn-second"} onClick={toConfirmPlayers}>Подтвердить игроков</button>}
            {!event.cancel && event.event_step.length === 2 && !event.event_step[1]["complete"] && !event.time_end &&
                <button className={"el el-3 btn-second"} onClick={toFillRegulation}>Заполнить регламент</button>}
            {!event.cancel && event.event_step.length === 3 && !event.event_step[2]["complete"] && !event.time_end &&
                <button className={"el el-3 btn-second"} onClick={toConfirmTeams}>Подтвердите команды</button>}
            {!event.cancel && event.event_step.length === 3 && event.event_step[2]["complete"] && !event.time_end &&
                <Link className={`el el-3 btn`} to={BaseRoutes.eventInfoLink(event.id)}>Перейти в меню игры</Link>}
            {event.cancel && <span>Событие отменено</span>}
            {event.time_end &&
                <button className={`el el-3 btn`} onClick={repeatEvent}>Повторить событие</button>}
            {event.time_end &&
                <Link className={`el el-2 btn-second`} to={BaseRoutes.eventInfoLink(event.id)}>Итоги события</Link>}
        </div>
    )
}
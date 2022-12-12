import React from "react-dom";
import {authDecoratorWithoutLogin} from "../../services/AuthDecorator";
import EventService from "../../services/EventService";


export const ButtonsBoardOrganizerComponent = ({event, funcs}) => {
    const eventService = new EventService();

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

    const toCancelEvent = () => {
        funcs.openCancelEvent();
        funcs.removeMap();
    }

    return (
        <div className={"elem elem-4"}>
            {!event.cancel && event.event_step.length === 0 && <button className={"el el-1 btn"} onClick={toConfirmPlayers}>Начать игру</button>}
            {!event.cancel && event.event_step.length === 0 && <button className={"el el-2 btn-second"} onClick={toCancelEvent}>Отменить игру</button>}
            {!event.cancel && event.event_step.length === 1 && !event.event_step[0]["complete"] && <button className={"el el-3 btn-second"} onClick={toConfirmPlayers}>Подтвердить игроков</button>}
            {!event.cancel && event.event_step.length === 2 && !event.event_step[1]["complete"] && <button className={"el el-3 btn-second"} onClick={toFillRegulation}>Заполнить регламент</button>}
            {!event.cancel && event.event_step.length === 3 && !event.event_step[2]["complete"] && <button className={"el el-3 btn-second"} onClick={toConfirmTeams}>Подтвердите команды</button>}
            {!event.cancel && event.event_step.length === 3 && event.event_step[2]["complete"] && <button className={"el el-3 btn-second"} onClick={toConfirmPlayers}>Подробности события</button>}
            {event.cancel && <span>Событие отменено</span>}
        </div>
    )
}
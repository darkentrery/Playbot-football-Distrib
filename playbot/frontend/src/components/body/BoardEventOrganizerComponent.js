import React from "react-dom";
import {authDecoratorWithoutLogin} from "../../services/AuthDecorator";
import EventService from "../../services/EventService";


export default function BoardEventOrganizerComponent ({event, players, steps, funcs}) {
    const eventService = new EventService();
    console.log(steps)

    const toConfirmPlayers = (e) => {
        funcs.openConfirmPlayers();
        authDecoratorWithoutLogin(eventService.toConfirmPlayers, event).then((response) => {
            funcs.setSteps(response.data);
        })
    }

    const toFillRegulation = () => {
        funcs.openFillRegulation();
    }


    return (
        <div className={"board-event-component"}>
            <div className={"board-event-1280"}>
                <div className={"elem elem-1"}>
                    <span className={"el el-1 dark-gray-cup-icon"}>78,8</span>
                    <span className={"el el-2 dark-gray-avatar-icon"}>4/10</span>
                    <span className={"el el-3 dark-gray-star-icon"}>В избранное</span>
                </div>
                <span className={"elem elem-2"}>Дворовый турнир Тверской</span>
                <span className={"elem elem-3"}>21 августа 2022, 12:00</span>
                <div className={"elem elem-4"}>
                    {steps.length === 0 && <button className={"el el-1 btn"} onClick={toConfirmPlayers}>Начать игру</button>}
                    {steps.length === 0 && <button className={"el el-2 btn-second"} onClick={funcs.openCancelEvent}>Отменить игру</button>}
                    {steps.length === 1 && steps[0]["complete"] === false && <button className={"el el-3 btn-second"} onClick={toConfirmPlayers}>Подтвердить игроков</button>}
                    {steps.length === 2 && steps[1]["complete"] === false && <button className={"el el-3 btn-second"} onClick={toFillRegulation}>Заполнить регламент</button>}
                    {steps.length === 3 && steps[2]["complete"] === false && <button className={"el el-3 btn-second"} onClick={toConfirmPlayers}>Подтвердите команды</button>}
                    {steps.length === 3 && steps[2]["complete"] === true && <button className={"el el-3 btn-second"} onClick={toConfirmPlayers}>Подробности события</button>}
                </div>
            </div>

            <div className={"board-event-376"}>
                <div className={"elem elem-1"}>
                    <span className={"el el-1 dark-gray-cup-icon"}>78,8</span>
                    <span className={"el el-2 dark-gray-avatar-icon"}>4/10</span>
                    <span className={"el el-3 dark-gray-message-icon"}>8</span>
                    <span className={"el el-4 dark-gray-star-icon"}></span>
                </div>
                <span className={"elem elem-2"}>Дворовый турнир Тверской</span>
                <span className={"elem elem-3"}>21 августа 2022, 12:00</span>
                <div className={"elem elem-4"}>
                    <button className={"el el-1 btn"} onClick={toConfirmPlayers}>Начать игру</button>
                    <button className={"el el-2 btn-second"} onClick={funcs.openCancelEvent}>Отменить игру</button>
                </div>
            </div>
        </div>
    )
}
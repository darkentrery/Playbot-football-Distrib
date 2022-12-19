import Modal from "react-modal";
import React, {useEffect, useState} from "react";
import $ from "jquery";
import {authDecoratorWithoutLogin} from "../../services/AuthDecorator";
import EventService from "../../services/EventService";
import {ReglamentComponent} from "../reglamentComponent/ReglamentComponent";


export default function ConfirmTeamsComponent ({isOpen, isIPhone, event, funcs}) {
    const eventService = new EventService();
    let players = event.event_player;
    const [selected, setSelected] = useState(players);
    const headItems = [["Формат игры:", "5 x 5"], ["Кол. игроков:", "40"], ["Кол. кругов:", "2"], ["Время матча:", "10 минут"], ["Общее время:", "80 минут"]];

    // useEffect(() => {
    //     let arr = [];
    //     players.forEach((item) => {
    //         arr.push(item.id.toString());
    //     })
    //     setSelected(arr)
    // }, [players, isOpen])

    const closeWindow = () => {
        funcs.closeConfirmTeams();
        funcs.showMap();
    }

    const toFillRegulation = () => {
        closeWindow();
        funcs.openFillRegulation();
        funcs.removeMap();
    }

    const confirmTeams = () => {

    }

    const repeateDivide = () => {

    }


    return (
        <ReglamentComponent isOpen={isOpen} className={`confirm-teams-component`} title={"Подтверди составы"}
                            clickBack={toFillRegulation} closeWindow={closeWindow} step={3}>
            <div className={"elem elem-4"}>
                {headItems.map((item, key) => (
                    <div className={"el"} key={key}>
                        <span className={"black-300-13"}>{item[0]}</span>
                        <span className={"black-600-13"}>{item[1]}</span>
                    </div>
                ))}
            </div>
            <div className={`elem elem-5-1280`}>
                <div className={"el el-1"}>
                    <span className={"black-700-13 team-name"}>Команда 1<div className={"pencil-icon"}></div></span>
                    <span className={"black-400-13"}>1. Андрей Иванов</span>
                </div>
                <div className={"el el-2"}>
                    <span className={"black-700-13 team-name"}>Команда 1<div className={"pencil-icon"}></div></span>
                    <span className={"black-400-13"}>1. Андрей Иванов</span>
                </div>
            </div>
            <div className={`elem elem-5-1280 bottom`}>
                <div className={"el el-1"}>
                    <span className={"black-700-13 team-name"}>Команда 1<div className={"pencil-icon"}></div></span>
                    <span className={"black-400-13"}>1. Андрей Иванов</span>
                </div>
                <div className={"el el-2"}>
                    <span className={"black-700-13 team-name"}>Команда 1<div className={"pencil-icon"}></div></span>
                    <span className={"black-400-13"}>1. Андрей Иванов</span>
                </div>
            </div>

            <div className={`elem elem-5-376 scroll`}>
                <div className={"el"}>
                    <span className={"black-700-13 team-name"}>Команда 1<div className={"pencil-icon"}></div></span>
                    <span className={"black-400-13"}>1. Андрей Иванов</span>
                </div>
            </div>
            <div className={`elem elem-7 ${isIPhone ? 'safari-margin' : ''}`}>
                <button className={"btn white-500-16"} onClick={confirmTeams}>Подтвердить и начать</button>
                <span className={"orange-400-14 link"} onClick={repeateDivide}>Поделиться заново</span>
            </div>
        </ReglamentComponent>
    )
}
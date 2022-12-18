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
            <button className={"elem elem-5 btn"} onClick={confirmTeams}>Продолжить</button>
        </ReglamentComponent>
    )

}
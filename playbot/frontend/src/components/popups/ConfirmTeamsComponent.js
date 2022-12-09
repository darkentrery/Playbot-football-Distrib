import Modal from "react-modal";
import React, {useEffect, useState} from "react";
import $ from "jquery";
import {authDecoratorWithoutLogin} from "../../services/AuthDecorator";
import EventService from "../../services/EventService";


export default function ConfirmTeamsComponent ({isOpen, isIPhone, event, funcs}) {
    const eventService = new EventService();
    let players = event.event_player;
    const [selected, setSelected] = useState(players);

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
        <Modal
            isOpen={isOpen}
            className={"popup-fon"}
            contentLabel="Example Modal"
            ariaHideApp={false}
        >
            <div className={"popup-frame confirm-teams-component"}>
                <div className={"elem elem-1"}>
                    <div onClick={toFillRegulation} className={"btn-back"}></div>
                    <span className={"title-22"}>Подтвердите команды</span>
                    <div onClick={closeWindow} className={"btn-close"}></div>
                </div>
                <div className={"elem elem-2"}>
                    <span className={"gray-400-16"}>Шаг 1</span>
                    <span className={"el-center gray-400-16"}>Шаг 2</span>
                    <span className={"black-600-16"}>Шаг 3</span>
                </div>
                <div className={"elem elem-3"}>
                    <div className={"gray-line"}></div>
                    <div className={"gray-line"}></div>
                    <div className={"orange-line"}></div>
                </div>
                <div className={"elem elem-4 scroll"}>

                </div>
                <button className={"elem elem-5 btn"} onClick={confirmTeams}>Продолжить</button>
            </div>
        </Modal>
    )

}
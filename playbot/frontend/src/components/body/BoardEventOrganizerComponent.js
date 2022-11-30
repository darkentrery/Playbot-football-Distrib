import {useState} from "react";
import {OpenCancelEventContext, OpenConfirmPlayersContext} from "../../context/EventContext";
import CancelEventComponent from "../popups/CancelEventComponent";
import ConfirmPlayersComponent from "../popups/ConfirmPlayersComponent";
import React, {render} from "react-dom";


export default function BoardEventOrganizerComponent ({event, players}) {
    const [openCancelEvent, setOpenCancelEvent] = useState(false);
    const [openConfirmPlayers, setOpenConfirmPlayers] = useState(false);
    const cancelEventWindow = { openCancelEvent, setOpenCancelEvent };
    const confirmPlayersWindow = { openConfirmPlayers, setOpenConfirmPlayers };

    const beginEvent = (e) => {
        console.log(e)
        setOpenConfirmPlayers(!openConfirmPlayers);
        console.log(openConfirmPlayers)
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
                    <button className={"el el-1 btn"} onClick={beginEvent}>Начать игру</button>
                    <button className={"el el-2 btn-second"} onClick={(e) => setOpenCancelEvent(!openCancelEvent)}>Отменить игру</button>
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
                    <button className={"el el-1 btn"} onClick={beginEvent}>Начать игру</button>
                    <button className={"el el-2 btn-second"} onClick={(e) => setOpenCancelEvent(!openCancelEvent)}>Отменить игру</button>
                </div>
            </div>

            <OpenCancelEventContext.Provider value={cancelEventWindow}>
                <CancelEventComponent event={event}/>
            </OpenCancelEventContext.Provider>

            <OpenConfirmPlayersContext.Provider value={confirmPlayersWindow}>
                <ConfirmPlayersComponent event={event} players={players}/>
            </OpenConfirmPlayersContext.Provider>
        </div>
    )
}
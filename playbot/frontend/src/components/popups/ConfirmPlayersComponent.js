import Modal from "react-modal";
import React, {useContext} from "react";
import {OpenConfirmPlayersContext} from "../../context/EventContext";
import $ from "jquery";


export default function ConfirmPlayersComponent ({event, players}) {

    const { openConfirmPlayers, setOpenConfirmPlayers } = useContext(OpenConfirmPlayersContext);

    const closeWindow = () => {
        setOpenConfirmPlayers(false);
    }

    const selectPlayer = (e) => {
        let iconSelect = $(e.target).parent('.el').children('.player-select-icon');
        if ($(e.target).hasClass('el')) {
            iconSelect = $(e.target).children('.player-select-icon');
        }
        if (iconSelect.hasClass('inactive')) {
            iconSelect.removeClass('inactive');
        } else {
            iconSelect.addClass('inactive');
        }
    }



    return (
        <Modal
            isOpen={openConfirmPlayers}
            className={"popup-fon"}
            contentLabel="Example Modal"
            ariaHideApp={false}
        >
            <div className={"popup-frame confirm-players-component"}>
                <div className={"elem elem-1"}>
                    <span className={"title-22"}>Подтвердите игроков</span>
                    <div onClick={closeWindow} className={"btn-close"}></div>
                </div>
                <div className={"elem elem-2"}>
                    <span className={"black-600-16"}>Шаг 1</span>
                    <span className={"el-center gray-400-16"}>Шаг 2</span>
                    <span className={"gray-400-16"}>Шаг 3</span>
                </div>
                <div className={"elem elem-3"}>
                    <div className={"orange-line"}></div>
                    <div className={"gray-line"}></div>
                    <div className={"gray-line"}></div>
                </div>
                <div className={"elem elem-4 scroll"}>
                    {players.length !== 0 && players.map((item, key) => {
                        return (
                            <div className={"el"} onClick={selectPlayer} key={key}>
                                <div className={"player-select-icon"}></div>
                                <div className={"player-avatar-icon"}></div>
                                <span className={"black-400-13"}>{item.username}</span>
                            </div>
                        )
                    })}
                </div>
                <button className={"elem elem-5 btn"}>Продолжить</button>
            </div>
        </Modal>
    )

}
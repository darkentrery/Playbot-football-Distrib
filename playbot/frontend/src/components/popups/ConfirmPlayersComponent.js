import Modal from "react-modal";
import React, {useEffect, useState} from "react";
import $ from "jquery";
import {authDecoratorWithoutLogin} from "../../services/AuthDecorator";
import EventService from "../../services/EventService";


export default function ConfirmPlayersComponent ({isOpen, isIPhone, event, funcs}) {
    const eventService = new EventService();
    let players = event.event_player;
    const [selected, setSelected] = useState([]);

    useEffect(() => {
        if (event && event.event_step.length > 1 && event.event_step[0].complete) {
            let arr = [];
            players.forEach((item) => {
                arr.push(item.player.id.toString());
            })
            setSelected(arr);
        }
    }, [players, isOpen])

    const closeWindow = () => {
        funcs.closeConfirmPlayers();
    }

    const selectPlayer = (e) => {
        let iconSelect = $(e.target).parent('.el').children('.player-select-icon');
        let arr = [];
        if ($(e.target).hasClass('el')) {
            iconSelect = $(e.target).children('.player-select-icon');
        }
        let parent = iconSelect.closest('.elem-4');
        if (iconSelect.hasClass('inactive')) {
            iconSelect.removeClass('inactive');
        } else {
            iconSelect.addClass('inactive');
        }
        parent.find('.player-select-icon').map((item) => {
            if (!$(parent.find('.player-select-icon')[item]).hasClass('inactive')) arr.push($(parent.find('.player-select-icon')[item]).parent().attr('id'));
        })
        setSelected(arr);
    }

    const confirmPlayers = () => {
        authDecoratorWithoutLogin(eventService.confirmPlayers, {"event": event, "players": selected}).then((response) => {
            funcs.setEvent(response.data);
            closeWindow();
            funcs.openFillRegulation();
        })
    }

    return (
        <Modal
            isOpen={isOpen}
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
                    {event && players.length !== 0 && players.map((item, key) => {
                        return (
                            <div className={"el"} onClick={selectPlayer} key={key} id={item.player.id}>
                                <div className={`player-select-icon ${event.event_step.length >= 1 && event.event_step[0].complete ? '' : 'inactive'}`}></div>
                                <div className={"player-avatar-icon"}></div>
                                <span className={"black-400-13"}>{item.player.username}</span>
                            </div>
                        )
                    })}
                </div>
                <button className={`elem elem-5 btn ${isIPhone ? 'safari-margin' : ''}`} onClick={confirmPlayers}>Продолжить</button>
            </div>
        </Modal>
    )

}
import React, {useEffect, useState} from "react";
import $ from "jquery";
import {authDecoratorWithoutLogin} from "../../services/AuthDecorator";
import EventService from "../../services/EventService";
import {SearchComponent} from "../searchComponent/SearchComponent";
import {ReglamentComponent} from "../reglamentComponent/ReglamentComponent";


export default function ConfirmPlayersComponent ({isOpen, isIPhone, event, funcs}) {
    const eventService = new EventService();
    const [players, setPlayers] = useState([]);
    const [selected, setSelected] = useState([]);
    const [players1, setPlayers1] = useState([]);
    const [players2, setPlayers2] = useState([]);
    const [playersView, setPlayersView] = useState([]);

    useEffect(() => {
        if (event) {
            setPlayers(event.event_player);
            setPlayersView(event.event_player);
            let array = [];
            event.event_player.map((item) => {
                array.push(item.player.username);
            })
            setPlayers1(array);
        }
        if (event && event.event_step.length > 1 && event.event_step[0].complete) {
            let arr = [];
            playersView.forEach((item) => {
                arr.push(item.player.id.toString());
            })
            setSelected(arr);
        }
    }, [players, isOpen])

    useEffect(() => {
        let array = [];
        players.map((item) => {
            if (players2.includes(item.player.username)) array.push(item);
        })
        setPlayersView(array);
    }, [players2])


    const closeWindow = () => {
        funcs.closeConfirmPlayers();
        funcs.showMap();
    }

    const selectPlayer = (e) => {
        let itemSelect = $(e.target).parent('.el');
        let arrSelect = [];
        selected.forEach(item => {
            arrSelect.push(item);
        })
        if ($(e.target).hasClass('el')) {
            itemSelect = $(e.target);
        }
        if (selected.includes(itemSelect.attr('id'))) {
            let i = selected.indexOf(itemSelect.attr('id'));
            arrSelect.splice(i, 1);
        } else {
            arrSelect.push(itemSelect.attr('id'));
        }
        setSelected(arrSelect);
    }

    const confirmPlayers = () => {
        authDecoratorWithoutLogin(eventService.confirmPlayers, {"event": event, "players": selected}).then((response) => {
            funcs.setEvent(response.data);
            closeWindow();
            funcs.openFillRegulation();
            funcs.removeMap();
        })
    }

    return (
        <ReglamentComponent className={`confirm-players-component`} closeWindow={closeWindow} isOpen={isOpen} step={1} title={"Подтвердите игроков"}>
            <SearchComponent className={"elem elem-4"} arrayFirst={players1} setArraySecond={setPlayers2}/>
            <div className={"elem elem-5 scroll"}>
                {event && playersView.length !== 0 && playersView.map((item, key) => {
                    return (
                        <div className={"el"} onClick={selectPlayer} key={key} id={item.player.id}>
                            <div className={`player-select-icon ${selected.includes(item.player.id.toString()) ? '' : 'inactive'}`}></div>
                            <div className={"player-avatar-icon"}></div>
                            <span className={"black-400-13"}>{item.player.username}</span>
                        </div>
                    )
                })}
            </div>
            <button className={`elem elem-6 btn ${isIPhone ? 'safari-margin' : ''}`} onClick={confirmPlayers}>Продолжить</button>
        </ReglamentComponent>
    )

}
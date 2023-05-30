import React, {useEffect, useState} from "react";
import {authDecoratorWithoutLogin} from "../../../services/AuthDecorator";
import {eventService} from "../../../services/EventService";
import {SearchComponent} from "../../searchComponent/SearchComponent";
import {ReglamentComponent} from "../../reglamentComponent/ReglamentComponent";
import {CheckboxComponent} from "../../checkboxComponent/CheckboxComponent";
import avatarIcon from "../../../assets/icon/avatar-2.png";


export default function ConfirmPlayersComponent ({isOpen, isIPhone, event, funcs}) {
    const [players, setPlayers] = useState([]);
    const [selected, setSelected] = useState([]);
    const [playersBeforeSearch, setPlayersBeforeSearch] = useState([]);
    const [playersAfterSearch, setPlayersAfterSearch] = useState([]);
    const [playersView, setPlayersView] = useState([]);
    const [isLoader, setIsLoader] = useState(false);
    const [allChecked, setAllChecked] = useState(false);


    useEffect(() => {
        if (event && isOpen) {
            setPlayers(event.event_player);
            setPlayersView(event.event_player);
            let array = [];
            event.event_player.forEach((item) => {
                array.push(item.player.username);
            })
            setPlayersBeforeSearch(array);
        }
        if (event && event.event_step.length > 1 && event.event_step[0].complete && isOpen) {
            let arr = [];
            playersView.forEach((item) => {
                arr.push(item.player.id.toString());
            })
            setSelected(arr);
        }
    }, [players, isOpen])

    useEffect(() => {
        let array = [];
        players.forEach((item) => {
            if (playersAfterSearch.includes(item.player.username)) array.push(item);
        })
        setPlayersView(array);
    }, [playersAfterSearch])


    const closeWindow = () => {
        funcs.closeConfirmPlayers();
        funcs.showMap();
    }

    const selectPlayer = (e) => {
        let itemSelect = e.target.parentNode;
        let arrSelect = [...selected];
        if (e.target.classList.contains('el')) {
            itemSelect = e.target;
        }
        if (selected.includes(itemSelect.id)) {
            let i = selected.indexOf(itemSelect.id);
            arrSelect.splice(i, 1);
            setAllChecked(false);
        } else {
            arrSelect.push(itemSelect.id);
        }
        if (arrSelect.length === players.length) setAllChecked(true);
        setSelected(arrSelect);

    }

    const confirmPlayers = () => {
        if (selected.length >= 4) {
            setIsLoader(true);
            authDecoratorWithoutLogin(eventService.confirmPlayers, {
                "event": event,
                "players": selected
            }).then((response) => {
                funcs.setEvent(response.data);
                setIsLoader(false);
                closeWindow();
                funcs.openFillRegulation();
                funcs.removeMap();
            })
        }
    }

    const selectAll = () => {
        if (allChecked) {
            setSelected([]);
        } else {
            setSelected(players.map(player => {
                return player.player.id.toString();
            }));
        }
    }

    return (
        <ReglamentComponent className={`confirm-players-component`} closeWindow={closeWindow} isOpen={isOpen} step={1}
                            title={"Подтвердите игроков"} isLoader={isLoader}>
            <div className={"elem elem-4"}>
                <SearchComponent className={"search-field"} arrayFirst={playersBeforeSearch} setArraySecond={setPlayersAfterSearch}/>
                <CheckboxComponent text={allChecked ? 'Отменить выбор' : 'Выбрать всех'}
                                   checked={allChecked} setChecked={setAllChecked} onClick={selectAll}/>
            </div>

            <div className={"elem elem-5 scroll"}>
                {event && !!playersView.length && playersView.map((item, key) => (
                    <div className={"el"} onClick={selectPlayer} key={key} id={item.player.id}>
                        <div className={`player-select-icon ${selected.includes(item.player.id.toString()) ? '' : 'inactive'}`}></div>
                        <img src={avatarIcon} className={"avatar"} alt=""/>
                        <span className={"black-400-13 username"}>{item.player.username}</span>
                        {/*<span className={"black-400-13 username-376"}>{item.player.username}</span>*/}
                    </div>
                ))}
            </div>
            <div className={"elem elem-fake"}></div>
            <button className={`elem elem-6 btn ${isIPhone ? 'safari-margin' : ''}`} onClick={confirmPlayers}>Продолжить</button>
        </ReglamentComponent>
    )
}
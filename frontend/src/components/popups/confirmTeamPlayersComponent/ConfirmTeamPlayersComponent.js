import React, {useEffect, useRef, useState} from "react";
import $ from "jquery";
import {authDecoratorWithoutLogin} from "../../../services/AuthDecorator";
import {SearchComponent} from "../../searchComponent/SearchComponent";
import {ReglamentComponent} from "../../reglamentComponent/ReglamentComponent";
import {TeamNameComponent} from "../../teamNameComponent/TeamNameComponent";
import {eventService} from "../../../services/EventService";


export const ConfirmTeamPlayersComponent = ({isOpen, isIPhone, event, team, funcs}) => {
    const [players, setPlayers] = useState([]);
    const [selected, setSelected] = useState([]);
    const [players1, setPlayers1] = useState([]);
    const [players2, setPlayers2] = useState([]);
    const [playersView, setPlayersView] = useState([]);
    const [teamName, setTeamName] = useState(false);
    const buttonRef = useRef();
    const [buttonLock, setButtonLock] = useState(false);
    const [isLoader, setIsLoader] = useState(false);

    useEffect(() => {
        if (event && isOpen) {
            let arraySelect = [];
            if (team) {
                team.team_players.forEach((player) => {
                    arraySelect.push(player.player.id.toString());
                })
                setSelected(arraySelect);
            }
            let array = [];
            let array1 = [];
            event.event_player.forEach((player) => {
                let isPlayer = false;
                event.teams.forEach((team, t) => {
                    team.team_players.forEach((teamPlayer) => {
                        if (teamPlayer.player.id === player.player.id && !arraySelect.includes(player.player.id.toString())) {
                            isPlayer = true;
                        }
                    })
                })
                if (!isPlayer) {
                    array.push(player.player);
                    array1.push(player.player.username);
                }
            })
            setPlayers(array);
            setPlayersView(array);
            setPlayers1(array1);
            if (!teamName) setTeamName(team.name);
        }
    }, [isOpen, team, event]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        let array = [];
        players.forEach((item) => {
            if (players2.includes(item.username)) array.push(item);
        })
        setPlayersView(array);
    }, [players2]) // eslint-disable-line react-hooks/exhaustive-deps


    const closeWindow = () => {
        funcs.closeConfirmTeamPlayers();
        funcs.showMap();
        setTeamName(false);
        setButtonLock(false);
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
            if (selected.length < team.count_players) arrSelect.push(itemSelect.attr('id'));
        }
        setSelected(arrSelect);
    }

    const clickBack = () => {
        closeWindow();
        if (team.number === 1) {
            funcs.openFillRegulation();
        } else {
            for (let t of event.teams) {
                if (t.number === team.number - 1) {
                    funcs.setTeam(t);
                    break;
                }
            }
            funcs.openConfirmTeamPlayers();
        }
        funcs.removeMap();
    }

    const confirmPlayers = () => {
        if (!buttonLock) {
            team.name = teamName;
            setTeamName(false);
            setButtonLock(true);
            setIsLoader(true);
            authDecoratorWithoutLogin(eventService.confirmTeamPlayers, {
                "team": team,
                "players": selected
            }).then((response) => {
                if (response.status === 200) {
                    setIsLoader(false);
                    funcs.setEvent(response.data);
                    closeWindow();
                    if (team.number < event.teams.length) {
                        for (let t of response.data.teams) {
                            if (t.number === team.number + 1) {
                                funcs.setTeam(t);
                                break;
                            }
                        }
                        funcs.openConfirmTeamPlayers();
                    } else {
                        for (let t of response.data.teams) {
                            if (t.number === team.number) {
                                funcs.setTeam(t);
                                break;
                            }
                        }
                        funcs.openConfirmTeams();
                    }
                    funcs.removeMap();
                    buttonRef.current.blur();
                    setButtonLock(false);
                }
            })
        }
    }

    return (
        <ReglamentComponent className={`confirm-team-players-component`} closeWindow={closeWindow} isOpen={isOpen} step={3}
                            title={"Выбери состав"} clickBack={clickBack} isLoader={isLoader}>
            {!!event && <>
                <SearchComponent className={"elem elem-4"} arrayFirst={players1} setArraySecond={setPlayers2}/>
                <TeamNameComponent className={"elem elem-5"} value={teamName} setValue={setTeamName}/>
                <div className={"elem elem-6 scroll"}>
                {event && playersView.length !== 0 && playersView.map((item, key) => (
                    <div className={"el"} onClick={selectPlayer} key={key} id={item.id}>
                        <div className={`player-select-icon ${selected.includes(item.id.toString()) ? '' : 'inactive'}`}></div>
                        <div className={"player-avatar-icon"}></div>
                        <span className={"black-400-13"}>{item.username}</span>
                    </div>
                ))}
                </div>
                <button className={`elem elem-7 btn ${isIPhone ? 'safari-margin' : ''}`} onClick={confirmPlayers} ref={buttonRef}>
                    {team && team.number < event.teams.length ? 'Следующая команда' : 'Далее'}
                </button>
            </>}
        </ReglamentComponent>
    )

}
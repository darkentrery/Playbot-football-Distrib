import React, {useEffect, useState} from "react";
import {authDecoratorWithoutLogin} from "../../../services/AuthDecorator";
import {ReglamentComponent} from "../../reglamentComponent/ReglamentComponent";
import {getMinutesStr} from "../../../utils/dates";
import {TeamNameComponent} from "../../teamNameComponent/TeamNameComponent";
import {eventService} from "../../../services/EventService";
import avatarIcon from "../../../assets/icon/avatar-2.png";
import {SelectColorComponent} from "../../selectColorComponent/SelectColorComponent";
import {SelectNumberComponent} from "../../selectNumberComponent/SelectNumberComponent";


export default function ConfirmTeamsComponent ({isOpen, isIPhone, event, funcs}) {
    const [headItems, setHeadItems] = useState(false);
    const [teams, setTeams] = useState([]);
    const [teamName1, setTeamName1] = useState(false);
    const [teamName2, setTeamName2] = useState(false);
    const [teamName3, setTeamName3] = useState(false);
    const [teamName4, setTeamName4] = useState(false);
    const [teamName5, setTeamName5] = useState(false);
    const [teamName6, setTeamName6] = useState(false);
    const [teamName7, setTeamName7] = useState(false);
    const [teamName8, setTeamName8] = useState(false);
    const [isLoader, setIsLoader] = useState(false);
    // const [teamNames, setTeamNames] = useState([]);
    const teamNames = [
        [teamName1, setTeamName1],
        [teamName2, setTeamName2],
        [teamName3, setTeamName3],
        [teamName4, setTeamName4],
        [teamName5, setTeamName5],
        [teamName6, setTeamName6],
        [teamName7, setTeamName7],
        [teamName8, setTeamName8],
    ];
    const [colorList, setColorList] = useState([]);
    const [numberList, setNumberList] = useState([]);
    const [teamColors, setTeamColors] = useState([]);
    const [teamNumbers, setTeamNumbers] = useState([]);

    useEffect(() => {
        if (event && event.event_step && event.event_step.length && event.count_circles && isOpen) {
            let count_circles = event.count_circles.replace(/\D/g, "");
            let duration = event.duration.duration.toString();
            let durationLabel = getMinutesStr(duration);
            let totalDuration = count_circles * duration;
            let totalDurationLabel = getMinutesStr(totalDuration.toString());
            setHeadItems([
                ["Формат игры:", event.format],
                ["Кол. игроков:", event.count_current_players],
                ["Кол. кругов:", count_circles],
                ["Время матча:", `${duration} ${durationLabel}`],
                ["Общее время:", `${totalDuration} ${totalDurationLabel}`]
            ]);
            eventService.getColors().then(response => setColorList(response.data));
            eventService.getNumbers().then(response => setNumberList(response.data));
            event.teams.forEach((team, i) => {
                teamNames[i][1](team.name);
            })
            setTeamColors(event.teams.map(team => { return team.color; }));
            setTeamNumbers(event.teams.map(team => {
                return team.team_players.map(player => { return player.number; });
            }));
            setTeams(...event.teams);
            console.log(event.teams)
        }
    }, [event, isOpen])

    const closeWindow = () => {
        funcs.closeConfirmTeams();
        funcs.showMap();
    }

    const toBack = () => {
        closeWindow();
        if (event.distribution_method === "Автоматический") {
            funcs.openFillRegulation();
        } else {
            funcs.openConfirmTeamPlayers();
        }
        funcs.removeMap();
    }

    const confirmTeams = () => {
        setIsLoader(true);
        event.teams.forEach((team, key) => {
            event.teams[key].name = teamNames[key][0];
            event.teams[key].color = teamColors[key].id;
            team.team_players.forEach((player, i) => {
                event.teams[key].team_players[i].number = teamNumbers[key][i] !== null ? teamNumbers[key][i].id : null;
            })
        })
        authDecoratorWithoutLogin(eventService.confirmTeams, {"event": event}).then((response) => {
            if (response.status === 200) {
                setIsLoader(false);
                funcs.setEvent(response.data);
                funcs.closeConfirmTeams();
                funcs.showMap();
            }
        })
    }

    return (
        <ReglamentComponent isOpen={isOpen} className={`confirm-teams-component`} title={"Подтверди составы"}
                            clickBack={toBack} closeWindow={closeWindow} step={3} isLoader={isLoader}>
            <div className={"elem elem-4"}>
                {headItems !== false && headItems.map((item, key) => (
                    <div className={"el"} key={key}>
                        <span className={"black-300-13"}>{item[0]}</span>
                        <span className={"black-600-13"}>{item[1]}</span>
                    </div>
                ))}
            </div>
            <div className={`elem elem-5 scroll`}>
                {!!event && !!teamColors.length && event.teams.map((team, key) => (
                    <div className={`team`} key={key}>
                        <div className={"team-name"}>
                            <SelectColorComponent id={key} teamColors={teamColors} setTeamColors={setTeamColors} colorList={colorList} teamNames={teamNames}/>
                            <TeamNameComponent className={""} value={teamNames[key][0]} setValue={teamNames[key][1]}/>
                        </div>
                        {!!team.team_players.length && team.team_players.map((player, i) => (
                            <div className={"el"} key={i}>
                                <img src={avatarIcon} className={"avatar"} alt=""/>
                                <span className={"black-400-13 username"}>{player.player.username}</span>
                                <SelectNumberComponent numberList={numberList} id={i} teamId={key} numbers={teamNumbers} setNumbers={setTeamNumbers}/>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div className={"elem elem-fake"}></div>
            <div className={`elem elem-7 ${isIPhone ? 'safari-margin' : ''}`}>
                <button className={"btn white-500-16"} onClick={confirmTeams}>Подтвердить и начать</button>
            </div>
        </ReglamentComponent>
    )
}

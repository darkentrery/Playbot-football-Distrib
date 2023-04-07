import React, {useEffect, useState} from "react";
import {authDecoratorWithoutLogin} from "../../../services/AuthDecorator";
import {ReglamentComponent} from "../../reglamentComponent/ReglamentComponent";
import {getMinutesStr} from "../../../utils/dates";
import {TeamNameComponent} from "../../teamNameComponent/TeamNameComponent";
import {eventService} from "../../../services/EventService";


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

    useEffect(() => {
        if (event && event.event_step && event.event_step.length && event.count_circles && isOpen) {
            let count_circles = event.count_circles.replace(/\D/g, "");
            let duration = event.duration.duration.toString();
            let durationLabel = getMinutesStr(duration);
            let totalDuration = count_circles * duration;
            let totalDurationLabel = getMinutesStr(totalDuration.toString());
            setHeadItems([
                ["Формат игры:", event.format],
                ["Кол. игроков:", event.event_player.length],
                ["Кол. кругов:", count_circles],
                ["Время матча:", `${duration} ${durationLabel}`],
                ["Общее время:", `${totalDuration} ${totalDurationLabel}`]
            ]);
            let array = [];
            for (let i=0; i<Math.ceil(event.teams.length / 2); i++) {
                array.push([]);
            }
            event.teams.forEach((team, i) => {
                array[Math.floor(i / 2)].push(team);
                teamNames[i][1](team.name);
            })
            setTeams(array);
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
        teams.forEach((teamRow, key) => {
            teamRow.forEach((team, i) => {
                event.teams[key*2 + i].name = teamNames[key*2 + i][0];
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

    // const repeatDivide = () => {
    //
    // }

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
            <div className={`elem elem-5-1280 scroll`}>
                {teams.map((teamRow, key) => (
                    <div className={`team-row ${!key ? 'top' : ''}`} key={key + 100}>
                        {teamRow.map((team, i) => (<>
                            <div className={`team team-${key + 1}`} key={key}>
                                <TeamNameComponent className={""} value={teamNames[key*2 + i][0]} setValue={teamNames[key*2 + i][1]}/>
                                {!!team.team_players.length && team.team_players.map((player, i) => (
                                    <span className={"black-400-13"} key={i}>{`${i + 1}. ${player.player.username}`}</span>
                                ))}
                            </div>
                            {teamRow.length === 2 && <div className={"vertical-line"}></div>}
                        </>))}
                    </div>
                ))}
            </div>
            <div className={`elem elem-5-376 scroll`}>
                {teams.map((teamRow, key) => (<>
                    {teamRow.map((team, i) => (
                         <div className={"el"} key={key*2 + i + 100}>
                            <TeamNameComponent className={""} value={teamNames[key*2 + i][0]} setValue={teamNames[key*2 + i][1]}/>
                            {team.team_players.length !== 0 && team.team_players.map((player, i) => (
                                <span className={"black-400-13"} key={i}>{`${i + 1}. ${player.player.username}`}</span>
                            ))}
                        </div>
                    ))}
                </>))}
            </div>
            <div className={`elem elem-7 ${isIPhone ? 'safari-margin' : ''}`}>
                <button className={"btn white-500-16"} onClick={confirmTeams}>Подтвердить и начать</button>
                {/*<span className={"orange-400-14 link"} onClick={repeatDivide}>Поделиться заново</span>*/}
            </div>
        </ReglamentComponent>
    )
}
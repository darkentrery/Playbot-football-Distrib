import React, {useEffect, useState} from "react";
import {authDecoratorWithoutLogin} from "../../services/AuthDecorator";
import EventService from "../../services/EventService";
import {ReglamentComponent} from "../reglamentComponent/ReglamentComponent";
import {getMinutesStr} from "../../utils/dates";
import {TeamNameComponent} from "../teamNameComponent/TeamNameComponent";


export default function ConfirmTeamsComponent ({isOpen, isIPhone, event, funcs}) {
    const eventService = new EventService();
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
        if (event && event.event_step.length && event.count_circles && isOpen) {
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
            setTeams(event.teams);
            event.teams.map((team, i) => {
                teamNames[i][1](team.name);
            })
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
        event.teams.map((team, i) => {
            team.name = teamNames[i][0];
        })
        authDecoratorWithoutLogin(eventService.confirmTeams, {"event": event}).then((response) => {
            if (response.status === 200) {
                funcs.setEvent(response.data);
                funcs.closeConfirmTeams();
                funcs.showMap();
            }
        })
    }

    const repeatDivide = () => {

    }

    return (
        <ReglamentComponent isOpen={isOpen} className={`confirm-teams-component`} title={"Подтверди составы"}
                            clickBack={toBack} closeWindow={closeWindow} step={3}>
            <div className={"elem elem-4"}>
                {headItems !== false && headItems.map((item, key) => (
                    <div className={"el"} key={key}>
                        <span className={"black-300-13"}>{item[0]}</span>
                        <span className={"black-600-13"}>{item[1]}</span>
                    </div>
                ))}
            </div>
            {teams.length !== 0 &&
            <div className={`elem elem-5-1280`}>
                <div className={"el el-1"}>
                    <TeamNameComponent className={""} value={teamNames[0][0]} setValue={teamNames[0][1]}/>
                    {teams[0].team_players.length !== 0 && teams[0].team_players.map((player, i) => (
                            <span className={"black-400-13"} key={i}>{`${i + 1}. ${player.player.username}`}</span>
                    ))}
                </div>
                {teams.length > 1 &&
                <div className={"el el-2"}>
                    <TeamNameComponent className={""} value={teamNames[1][0]} setValue={teamNames[1][1]}/>
                    {teams[1].team_players.length !== 0 && teams[1].team_players.map((player, i) => (
                            <span className={"black-400-13"} key={i}>{`${i + 1}. ${player.player.username}`}</span>
                    ))}
                </div>}
            </div>}
            {teams.length > 2 &&
            <div className={`elem elem-5-1280 bottom`}>
                <div className={"el el-1"}>
                    <TeamNameComponent className={""} value={teamNames[2][0]} setValue={teamNames[2][1]}/>
                    {teams[2].team_players.length !== 0 && teams[2].team_players.map((player, i) => (
                        <span className={"black-400-13"} key={i}>{`${i + 1}. ${player.player.username}`}</span>
                    ))}
                </div>
                {teams.length > 3 &&
                <div className={"el el-2"}>
                    <TeamNameComponent className={""} value={teamNames[3][0]} setValue={teamNames[3][1]}/>
                    {teams[3].team_players.length !== 0 && teams[3].team_players.map((player, i) => (
                        <span className={"black-400-13"} key={i}>{`${i + 1}. ${player.player.username}`}</span>
                    ))}
                </div>}
            </div>}
            {teams.length > 4 &&
            <div className={`elem elem-5-1280 bottom`}>
                <div className={"el el-1"}>
                    <TeamNameComponent className={""} value={teamNames[4][0]} setValue={teamNames[4][1]}/>
                    {teams[4].team_players.length !== 0 && teams[4].team_players.map((player, i) => (
                        <span className={"black-400-13"} key={i}>{`${i + 1}. ${player.player.username}`}</span>
                    ))}
                </div>
                {teams.length > 5 &&
                <div className={"el el-2"}>
                    <TeamNameComponent className={""} value={teamNames[5][0]} setValue={teamNames[5][1]}/>
                    {teams[5].team_players.length !== 0 && teams[5].team_players.map((player, i) => (
                        <span className={"black-400-13"} key={i}>{`${i + 1}. ${player.player.username}`}</span>
                    ))}
                </div>}
            </div>}

            <div className={`elem elem-5-376 scroll`}>
                {teams.length !== 0 && teams.map((team, key) => (
                    <div className={"el"} key={key}>
                        <TeamNameComponent className={""} value={teamNames[key][0]} setValue={teamNames[key][1]}/>
                        {team.team_players.length !== 0 && team.team_players.map((player, i) => (
                            <span className={"black-400-13"} key={i}>{`${i + 1}. ${player.player.username}`}</span>
                        ))}
                    </div>
                ))}
            </div>
            <div className={`elem elem-7 ${isIPhone ? 'safari-margin' : ''}`}>
                <button className={"btn white-500-16"} onClick={confirmTeams}>Подтвердить и начать</button>
                <span className={"orange-400-14 link"} onClick={repeatDivide}>Поделиться заново</span>
            </div>
        </ReglamentComponent>
    )
}
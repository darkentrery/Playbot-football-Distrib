import React, {useEffect, useState} from "react";
import {authDecoratorWithoutLogin} from "../../services/AuthDecorator";
import EventService from "../../services/EventService";
import {ReglamentComponent} from "../reglamentComponent/ReglamentComponent";
import {getMinutesStr} from "../../utils/dates";


export default function ConfirmTeamsComponent ({isOpen, isIPhone, event, funcs}) {
    const eventService = new EventService();
    const [headItems, setHeadItems] = useState(false);
    const [teams, setTeams] = useState([])

    useEffect(() => {
        if (event) {
            let count_circles = event.count_circles.replace(/\D/g, "");
            let duration = event.duration.replace(/\D/g, "");
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
        }
    }, [event])

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
        authDecoratorWithoutLogin(eventService.confirmTeams, {"id": event.id}).then((response) => {
            if (response.status === 200) {
                funcs.setEvent(response.data);
                funcs.closeConfirmTeams();
                funcs.showMap();
            }
            console.log(response.data)
        })
    }

    const repeateDivide = () => {

    }

    return (
        <ReglamentComponent isOpen={isOpen} className={`confirm-teams-component`} title={"Подтверди составы"}
                            clickBack={toFillRegulation} closeWindow={closeWindow} step={3}>
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
                    <span className={"black-700-13 team-name"}>{teams[0].name}<div className={"pencil-icon"}></div></span>
                    {teams[0].team_players.length !== 0 && teams[0].team_players.map((player, i) => (
                            <span className={"black-400-13"} key={i}>{`${i + 1}. ${player.player.username}`}</span>
                    ))}
                </div>
                {teams.length > 1 &&
                <div className={"el el-2"}>
                    <span className={"black-700-13 team-name"}>{teams[1].name}<div className={"pencil-icon"}></div></span>
                    {teams[1].team_players.length !== 0 && teams[1].team_players.map((player, i) => (
                            <span className={"black-400-13"} key={i}>{`${i + 1}. ${player.player.username}`}</span>
                    ))}
                </div>}
            </div>}
            {teams.length > 2 &&
            <div className={`elem elem-5-1280 bottom`}>
                <div className={"el el-1"}>
                    <span className={"black-700-13 team-name"}>{teams[2].name}<div className={"pencil-icon"}></div></span>
                    {teams[2].team_players.length !== 0 && teams[2].team_players.map((player, i) => (
                        <span className={"black-400-13"} key={i}>{`${i + 1}. ${player.player.username}`}</span>
                    ))}
                </div>
                {teams.length > 3 &&
                <div className={"el el-2"}>
                    <span className={"black-700-13 team-name"}>{teams[3].name}<div className={"pencil-icon"}></div></span>
                    {teams[3].team_players.length !== 0 && teams[3].team_players.map((player, i) => (
                        <span className={"black-400-13"} key={i}>{`${i + 1}. ${player.player.username}`}</span>
                    ))}
                </div>}
            </div>}
            {teams.length > 4 &&
            <div className={`elem elem-5-1280 bottom`}>
                <div className={"el el-1"}>
                    <span className={"black-700-13 team-name"}>{teams[4].name}<div className={"pencil-icon"}></div></span>
                    {teams[4].team_players.length !== 0 && teams[4].team_players.map((player, i) => (
                        <span className={"black-400-13"} key={i}>{`${i + 1}. ${player.player.username}`}</span>
                    ))}
                </div>
                {teams.length > 5 &&
                <div className={"el el-2"}>
                    <span className={"black-700-13 team-name"}>{teams[5].name}<div className={"pencil-icon"}></div></span>
                    {teams[5].team_players.length !== 0 && teams[5].team_players.map((player, i) => (
                        <span className={"black-400-13"} key={i}>{`${i + 1}. ${player.player.username}`}</span>
                    ))}
                </div>}
            </div>}

            <div className={`elem elem-5-376 scroll`}>
                {teams.length !== 0 && teams.map((team, key) => (
                    <div className={"el"} key={key}>
                        <span className={"black-700-13 team-name"}>{team.name}<div className={"pencil-icon"}></div></span>
                        {team.team_players.length !== 0 && team.team_players.map((player, i) => (
                            <span className={"black-400-13"} key={i}>{`${i + 1}. ${player.player.username}`}</span>
                        ))}
                    </div>
                ))}
            </div>
            <div className={`elem elem-7 ${isIPhone ? 'safari-margin' : ''}`}>
                <button className={"btn white-500-16"} onClick={confirmTeams}>Подтвердить и начать</button>
                <span className={"orange-400-14 link"} onClick={repeateDivide}>Поделиться заново</span>
            </div>
        </ReglamentComponent>
    )
}
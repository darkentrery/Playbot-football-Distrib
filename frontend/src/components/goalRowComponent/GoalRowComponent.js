import React, {useState} from "react";
import {PlayerIconComponent} from "../playerIconComponent/PlayerIconComponent";
import {HighLightComponent} from "../highLightComponent/HighLightComponent";
import {DeleteHighLightComponent} from "../deleteHighLightComponent/DeleteHighLightComponent";
import {authDecoratorWithoutLogin} from "../../services/AuthDecorator";
import {eventService} from "../../services/EventService";


export const GoalRowComponent = ({event, goal, team1, team2, funcs, sendSocketMessage = () => {}}) => {
    const [isOpenGoal, setIsOpenGoal] = useState(false);
    const [isOpenAssistant, setIsOpenAssistant] = useState(false);
    const [isOpenAuto, setIsOpenAuto] = useState(false);
    const [assistantsPlayers, setAssistantsPlayers] = useState([]);
    const [goalPlayer, setGoalPlayer] = useState(false);
    const [isOpenDelete, setIsOpenDelete] = useState(false);
    let seconds = goal.game_time % 60;
    let minutes = (goal.game_time - seconds) / 60;

    const getFullDigit = (value) => {
        value = value > 9 ? value.toString() : '0' + value.toString();
        return value;
    }

    const updateGoal = (auto, player=false, assistant=null) => {
        let updateGoal = {...goal};
        if (player) updateGoal.player = player.player.id;
        if (assistant) updateGoal.assistant = assistant.player.id;
        updateGoal.assistant = assistant ? assistant.player.id : assistant;
        if (auto) updateGoal.auto = true;
        sendSocketMessage({
            type: "update_goal",
            data: updateGoal,
        })
    }

    const closeElem = () => {
        setIsOpenGoal(false);
        setIsOpenAssistant(false);
        setIsOpenAuto(false);
        setGoalPlayer(false);
    }

    const clickTeamGoalPlayer = (player) => {
        setIsOpenAssistant(true);
        setIsOpenGoal(false);
        setGoalPlayer(player);
        let players = goal.team.team_players.filter(item => { if (player.id !== item.id) return item; });
        setAssistantsPlayers(players);
    }

    const clickTeamGoalAssistant = (player) => {
        closeElem();
        updateGoal(false, goalPlayer, player);
    }

    const clickTeamGoalAuto = (player) => {
        closeElem();
        updateGoal(true, player);
    }

    const teamAutoGoal = () => {
        setIsOpenGoal(false);
        setIsOpenAuto(true);
    }

    const teamGoal = (e) => {
        setIsOpenGoal(true);
        setIsOpenAuto(false);
    }

    const assistantBack = () => {
        setIsOpenAssistant(false);
        setIsOpenGoal(true);
    }

    const deleteGoal = () => {
        sendSocketMessage({
            type: "delete_goal",
            data: goal,
        })
        // authDecoratorWithoutLogin(eventService.deleteGoal, goal).then((response) => {
        //     if (response.status === 200) {
        //         // funcs.setPlayerBlock(false);
        //         funcs.setGame(response.data);
        //     }
        // })
    }

    const openDeleteGoal = () => {
        setIsOpenGoal(false);
        setIsOpenDelete(true);
    }

    const closeDeleteGoal = () => {
        setIsOpenDelete(false);
    }

    return (
        <div className={`goal-row-component ${goal.team.id === team1.id ? 'goal-row-1' : 'goal-row-2'}`}>
            {goal.team.id === team1.id && <>
                {goal.player !== null && <PlayerIconComponent className={"icon"} photo={goal.player.photo}/>}
                <div className={"inform"}>
                    <div className={"top-part"}>
                        <span className={"black-600-14"}>{getFullDigit(minutes)}'&nbsp;{getFullDigit(seconds)}''</span>
                        <div className={"count"}>
                            <div className={"gray-ball-icon"}></div>
                            <span className={"black-400-14"}>{goal.score_my}-{goal.score_other}</span>
                        </div>
                        <div className={"pencil-icon"} onClick={teamGoal}></div>
                    </div>
                    <span className={"black-600-14"}>
                        {!!goal.player ? goal.player.username : ''}&nbsp;&nbsp;
                        <span className={"gray-400-14"}>({!!goal.assistant && !goal.auto ? goal.assistant.username : 'автогол'})
                        </span>
                    </span>
                </div>
                <HighLightComponent
                    isOpen={isOpenGoal} event={event} teamPlayers={goal.team.team_players} autoGoal={teamAutoGoal}
                    text={"Автор гола (1/2)"} clickClose={closeElem} clickPlayer={clickTeamGoalPlayer}
                    className={"left"} delHighLight={openDeleteGoal}
                />
                <HighLightComponent
                    isOpen={isOpenAssistant} event={event} teamPlayers={assistantsPlayers} clickPlayer={clickTeamGoalAssistant}
                    text={"Голевой пас (2/2)"} toBack={assistantBack} clickClose={closeElem} className={"left"}
                />
                <HighLightComponent
                    isOpen={isOpenAuto} event={event} teamPlayers={team2.team_players} toBack={teamGoal}
                    text={"Автор автогола"} clickClose={closeElem} clickPlayer={clickTeamGoalAuto}
                    className={"left"}
                />
                <DeleteHighLightComponent className={`delete-high-light left ${isOpenDelete ? '' : 'hidden'}`}
                                          clickYes={deleteGoal} clickNo={closeDeleteGoal}/>
            </>}
            {goal.team.id === team2.id && <>
                <div className={"inform"}>
                    <div className={"top-part"}>
                        <div className={"pencil-icon"} onClick={teamGoal}></div>
                        <div className={"count"}>
                            <div className={"gray-ball-icon"}></div>
                            <span className={"black-400-14"}>{goal.score_my}-{goal.score_other}</span>
                        </div>
                        <span className={"black-600-14"}>{getFullDigit(minutes)}'&nbsp;{getFullDigit(seconds)}''</span>
                    </div>
                    <span className={"black-600-14"}>
                        {!!goal.player ? goal.player.username : ''}&nbsp;&nbsp;
                        <span className={"gray-400-14"}>({!!goal.assistant && !goal.auto ? goal.assistant.username : 'автогол'})
                        </span>
                    </span>
                </div>
                {goal.player !== null && <PlayerIconComponent className={"icon"} photo={goal.player.photo}/>}
                <HighLightComponent
                    isOpen={isOpenGoal} event={event} teamPlayers={goal.team.team_players} autoGoal={teamAutoGoal}
                    text={"Автор гола (1/2)"} clickClose={closeElem} clickPlayer={clickTeamGoalPlayer}
                    className={"right"} delHighLight={openDeleteGoal}
                />
                <HighLightComponent
                    isOpen={isOpenAssistant} event={event} teamPlayers={assistantsPlayers} clickPlayer={clickTeamGoalAssistant}
                    text={"Голевой пас (2/2)"} toBack={assistantBack} clickClose={closeElem} className={"right"}
                />
                <HighLightComponent
                    isOpen={isOpenAuto} event={event} teamPlayers={team1.team_players} toBack={teamGoal}
                    text={"Автор автогола"} clickClose={closeElem} clickPlayer={clickTeamGoalAuto}
                    className={"right"}
                />
                <DeleteHighLightComponent className={`delete-high-light right ${isOpenDelete ? '' : 'hidden'}`}
                                          clickYes={deleteGoal} clickNo={closeDeleteGoal}/>
            </>}
        </div>
    )
}
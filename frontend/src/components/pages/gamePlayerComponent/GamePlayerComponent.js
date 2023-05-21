import VisibleEventWrapper from "../../../redux/containers/VisibleEventWrapper";
import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {eventService} from "../../../services/EventService";
import {authDecoratorWithoutLogin} from "../../../services/AuthDecorator";
import BaseRoutes from "../../../routes/BaseRoutes";
import $ from "jquery";
import {LoaderComponent} from "../../loaderComponent/LoaderComponent";


export const GamePlayerComponent = ({event, user, game, playerBlock, funcs}) => {
    const { gameId } = useParams();
    const [timer, setTimer] = useState('0000');
    const [restTime, setRestTime] = useState(false);
    const [restTimeEnd, setRestTimeEnd] = useState(false);
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    // const [block, setBlock] = useState(false);
    const [isPlay, setIsPlay] = useState(null);

    const getFullDigit = (value) => {
        value = value > 9 ? value.toString() : '0' + value.toString();
        return value;
    }

    useEffect(() => {
        // setBlock(true);
        funcs.setPlayerBlock(true);
        if (event) {
            event.event_games.forEach((g) => {
                if (g.id.toString() === gameId) {
                    funcs.setGame(g);
                    // setBlock(false);
                    funcs.setPlayerBlock(false);
                }
            })
        } else {
            funcs.setGame(false);
            setRestTimeEnd(false);
            setRestTime(false);
            setIsPlay(null)
        }
        console.log(game)
    }, [gameId, event]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (game && event) {
            if (!restTime) {
                let currentDuration = game.current_duration_without_last;
                if (game.last_time_begin) {
                    let time = new Date(game.last_time_begin);
                    let additionalTime = Math.ceil((new Date() - time) / 1000);
                    currentDuration += additionalTime;
                }
                let seconds = currentDuration % 60;
                let minutes = ((currentDuration - seconds) / 60);
                setTimer(`${getFullDigit(minutes)}${getFullDigit(seconds)}`);
                setRestTime(event.duration.duration * 60 - currentDuration);
            }
            if (isPlay === null) setIsPlay(game.is_play);
        }
    }, [game]) // eslint-disable-line react-hooks/exhaustive-deps

    const ClockDigit = ({value}) => {
        return (
            <div className={"clock-digit"}>
                <span className={"second-fon black-500-28"}>{value}</span>
            </div>
        )
    }

    useEffect(() => {
        if (restTimeEnd && restTimeEnd > restTime) {
            console.log(restTime)
            console.log(restTimeEnd)
            let seconds = (event.duration.duration * 60 - restTimeEnd) % 60;
            let minutes = (((event.duration.duration * 60 - restTimeEnd) - seconds) / 60);
            setTimer(`${getFullDigit(minutes)}${getFullDigit(seconds)}`);
            setRestTime(restTimeEnd);
            setRestTimeEnd(false);
        }
    }, [restTime, restTimeEnd])

    useEffect(() => {
        if (isPlay && !game.time_end) {
            let interval = setTimeout(() => {
                if (restTime - 1 >= 0) {
                    let seconds = (event.duration.duration * 60 - restTime + 1) % 60;
                    let minutes = (((event.duration.duration * 60 - restTime + 1) - seconds) / 60);
                    setTimer(`${getFullDigit(minutes)}${getFullDigit(seconds)}`);
                    console.log(restTime - 1)
                    console.log(new Date())
                    setRestTime(restTime - 1);
                } else if (restTime - 1 < 0 && user.isAuth && eventService.isOrganizer(event, user.user) && !game.time_end) {
                    funcs.setPlayerBlock(true);
                    // setBlock(true);
                    setIsPlay(false);
                    authDecoratorWithoutLogin(eventService.endGame, game).then((response) => {
                        console.log(response.data)
                        if (response.status === 200) {
                            funcs.setGame(response.data.game);
                            funcs.setEvent(response.data.event);
                        }
                    })
                    clearTimeout(interval);
                }
            }, 990);
        }
    }, [restTime, isPlay])

    const beginGamePeriod = () => {
        if (!playerBlock) {
            funcs.setPlayerBlock(true);
            // setBlock(true);
            setIsPlay(true);
            authDecoratorWithoutLogin(eventService.beginGamePeriod, game).then((response) => {
                console.log(response.data)
                if (response.status === 200) {funcs.setPlayerBlock(false);}
            })
        }
    }

    const endGamePeriod = () => {
        if (!playerBlock) {
            funcs.setPlayerBlock(true);
            // setBlock(true);
            setIsPlay(false);
            setRestTimeEnd(restTime);
            console.log(new Date())
            authDecoratorWithoutLogin(eventService.endGamePeriod, game).then((response) => {
                console.log(response.data)
                if (response.status === 200) {funcs.setPlayerBlock(false);}
            })
        }
    }

    const createGoal = (teamId, player=false) => {
        if (!playerBlock) {
            funcs.setPlayerBlock(true);
            // setBlock(true);
            setIsPlay(false);
            let data = {
                game: game.id,
                team: teamId,
                time: new Date().toISOString(),
                game_time: event.duration.duration * 60 - restTime,
            }
            console.log(new Date())
            setRestTimeEnd(restTime);
            if (player) data.player = player;
            authDecoratorWithoutLogin(eventService.createGoal, data).then((response) => {
                console.log(response.data)
                if (response.status === 200) {
                    funcs.setPlayerBlock(false);
                    funcs.setGame(response.data);
                }
            })
        }
    }

    const goal1 = () => {
        if (event.scorer) {
            if (!isOpen2) setIsOpen1(!isOpen1);
        } else {
            createGoal(game.team_1.id);
        }
    }

    const goal2 = () => {
        if (event.scorer) {
            if (!isOpen1) setIsOpen2(!isOpen2);
        } else {
            createGoal(game.team_2.id);
        }
    }

    const fonClick = (e) => {
        if (isOpen1 && !$(e.target).closest('.block-1').length) {
            setIsOpen1(false);
        }
        if (isOpen2 && !$(e.target).closest('.block-2').length) {
            setIsOpen2(false);
        }
    }

    const PlayersList = ({className='', isOpen, team, setIsOpen}) => {
        const goal = (player) => {
          createGoal(team.id, player.player.id);
          setIsOpen(false);
        }
        return (
            <div className={`players-list ${className} ${isOpen ? '' : 'hidden'}`}>
                <div className={"list scroll"}>
                    {team.team_players.map((player, key) => (
                        <div className={"el black-400-13"} key={key}
                             onClick={() => {goal(player)}}
                        >{player.player.username}</div>
                    ))}
                </div>
            </div>
        )
    }

    const GoalRow = ({goal, teamId1, teamId2}) => {
        let seconds = goal.game_time % 60;
        let minutes = (goal.game_time - seconds) / 60;

        return (
            <div className={`goal-row ${goal.team.id === teamId1 ? 'goal-row-1' : 'goal-row-2'}`}>
                {goal.team.id === teamId1 && <>
                    {goal.player !== null && <div className={"icon player-avatar-icon"}></div>}
                    {goal.player !== null && <div className={"gray-line"}></div>}
                    <span className={"black-400-13"}>{goal.score_my}:{goal.score_other}</span>
                    <div className={"black-ball-icon"}></div>
                    {goal.player !== null && <span className={"black-400-13"}>{goal.player.username}</span>}
                    <span className={"black-400-13"}>({getFullDigit(minutes)}:{getFullDigit(seconds)})</span>
                </>}
                {goal.team.id === teamId2 && <>
                    <span className={"black-400-13"}>({getFullDigit(minutes)}:{getFullDigit(seconds)})</span>
                    {goal.player !== null && <span className={"black-400-13"}>{goal.player.username}</span>}
                    <div className={"black-ball-icon"}></div>
                    <span className={"black-400-13"}>{goal.score_my}:{goal.score_other}</span>
                    {goal.player !== null && <div className={"gray-line"}></div>}
                    {goal.player !== null && <div className={"icon player-avatar-icon"}></div>}
                </>}
            </div>
        )
    }

    return (
        <VisibleEventWrapper>
            {(!game || !event) && <LoaderComponent/>}
            {game && event && <div className={`game-player-component`} onClick={fonClick}>
                <div className={"manage"}>
                    <div className={"elem elem-1"}>
                        <span className={"black-400-16 team-name team-name-left"}>{eventService.getTeamName(game.team_1.name)}</span>
                        <span className={"black-800-32"}>{game.score_1} - {game.score_2}</span>
                        <span className={"black-400-16 team-name"}>{eventService.getTeamName(game.team_2.name)}</span>
                    </div>
                    {!event.all_games_finished && !game.time_end && !event.is_end && <div className={"elem elem-2"}>
                        <ClockDigit value={timer[0]}/>
                        <ClockDigit value={timer[1]}/>
                        <div className={"clock-middle-icon"}></div>
                        <ClockDigit value={timer[2]}/>
                        <ClockDigit value={timer[3]}/>
                    </div>}
                    {!event.all_games_finished && game.time_end !== null && <div className={"elem elem-4"}>
                        <span className={"el-1 black-400-12-italic"}>Игра завершена. Результаты сохранены</span>
                        <Link className={"btn el-2 white-500-12"} to={BaseRoutes.eventGamePlayerLink(event.id, game.id + 1)}>Начать  следующую игру</Link>
                    </div>}
                    {event.all_games_finished && <div className={"elem elem-4"}>
                        <span className={"el-1 black-400-12-italic"}>Все матчи сыграны. Результаты сохранены</span>
                    </div>}
                    <div className={"elem elem-3"}>
                        <div className={`btn-block block-1`}>
                            <span className={`btn white-600-14 ${isPlay && !playerBlock ? '' : 'lock'}`} onClick={isPlay ? goal1 : () => {}}>
                                <div className={"icon white-ball-icon"}></div>Гол
                            </span>
                            <PlayersList className={"player-list-1"} isOpen={isOpen1} team={game.team_1} setIsOpen={setIsOpen1}/>
                        </div>
                        {isPlay && <span className={`btn white-600-14 ${playerBlock ? 'lock' : ''}`} onClick={endGamePeriod}>
                            <div className={"icon white-pause-icon"}></div>
                        </span>}
                        {!isPlay && <span className={`btn white-600-14 ${game.time_end || event.is_end || playerBlock ? 'lock' : ''}`} onClick={game.time_end || event.is_end ? () => {} : beginGamePeriod}>
                            <div className={"icon white-play-icon"}></div>
                        </span>}
                        <div className={`btn-block block-2`}>
                            <span className={`btn white-600-14 ${isPlay && !playerBlock ? '' : 'lock'}`} onClick={isPlay ? goal2 : () => {}}>
                                <div className={"icon white-ball-icon"}></div>Гол
                            </span>
                            <PlayersList className={"player-list-2"} isOpen={isOpen2} team={game.team_2} setIsOpen={setIsOpen2}/>
                        </div>
                    </div>
                    {game.goals.length !== 0 && <div className={"elem elem-5"}>
                        {game.goals.map((goal, key) => (
                            <GoalRow goal={goal} teamId1={game.team_1.id} teamId2={game.team_2.id} key={key}/>
                        ))}
                    </div>}
                </div>
                <div className={`teams`}>
                    <div className={"elem-1"}>
                        <span className={"black-500-16"}>Составы</span>
                        <div className={`icon black-up-arrow-icon`}></div>
                    </div>
                    <div className={"elem-2"}>
                        <div className={"team team-1"}>
                            {game.team_1.team_players.map((player, key) => (
                                <div className={"player"} key={key}>
                                    <span className={"black-400-13"}>{key+1}.</span>
                                    <div className={"player-avatar-icon"}></div>
                                    <span className={"black-400-13"}>{player.player.username}</span>
                                </div>
                            ))}
                        </div>
                        <div className={"team team-2"}>
                            {game.team_2.team_players.map((player, key) => (
                                <div className={"player"} key={key}>
                                    <span className={"black-400-13"}>{key+1}.</span>
                                    <div className={"player-avatar-icon"}></div>
                                    <span className={"black-400-13"}>{player.player.username}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>}
        </VisibleEventWrapper>
    )
}
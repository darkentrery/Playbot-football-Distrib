import VisibleEventWrapper from "../../redux/containers/VisibleEventWrapper";
import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {eventService} from "../../services/EventService";
import {authDecoratorWithoutLogin} from "../../services/AuthDecorator";
import BaseRoutes from "../../routes/BaseRoutes";
import $ from "jquery";


export const GamePlayerComponent = ({event, user, game, funcs}) => {
    const params = useParams();
    const gameId = params.gameId;
    const [timer, setTimer] = useState('0000');
    const [restTime, setRestTime] = useState(false);
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);

    useEffect(() => {
        if (event) {
            event.event_games.map((g) => {
                if (g.id == gameId) {
                    funcs.setGame(g);
                    let seconds = g.rest_time % 60;
                    let minutes = ((g.rest_time - seconds) / 60).toString();
                    setTimer(`${minutes.length === 1 ? '0' + minutes : minutes}${seconds < 10 ? '0' + seconds.toString() : seconds}`);
                    setRestTime(g.rest_time);
                }
            })
        }
        console.log(game)
    }, [gameId, event])


    const ClockDigit = ({value}) => {
        return (
            <div className={"clock-digit"}>
                <span className={"second-fon black-500-28"}>{value}</span>
            </div>
        )
    }

    useEffect(() => {
        if (game && game.is_play && !game.time_end) {
            let start = Date.now();
            let interval = setInterval(() => {
                let timePassed = Date.now() - start;
                if (timePassed >= 1000 && restTime - 1 >= 0) {
                    let seconds = (restTime - 1) % 60;
                    let minutes = (((restTime - 1) - seconds) / 60).toString();
                    setTimer(`${minutes.length === 1 ? '0' + minutes : minutes}${seconds < 10 ? '0' + seconds.toString() : seconds}`);
                    setRestTime(restTime - 1);
                } else if (timePassed >= 1000 && restTime - 1 < 0 && user.isAuth && user.user.id === event.organizer.id) {
                    authDecoratorWithoutLogin(eventService.endGame, game).then((response) => {
                        console.log(response.data)
                        if (response.status === 200) funcs.setGame(response.data);
                    })
                }
            }, 1000);
            return () => clearInterval(interval);
        }
    })

    const beginGamePeriod = () => {
        authDecoratorWithoutLogin(eventService.beginGamePeriod, game).then((response) => {
            console.log(response.data)
            if (response.status === 200) funcs.setGame(response.data);
        })
    }

    const endGamePeriod = () => {
        authDecoratorWithoutLogin(eventService.endGamePeriod, game).then((response) => {
            console.log(response.data)
            if (response.status === 200) funcs.setGame(response.data);
        })
    }

    const createGoal = (teamId, player=false) => {
        let data = {
            game: game.id,
            team: teamId,
            time: new Date().toISOString(),
            game_time: event.duration.duration * 60 - restTime,
        }
        if (player) data.player = player;
        authDecoratorWithoutLogin(eventService.createGoal, data).then((response) => {
            console.log(response.data)
            if (response.status === 200) funcs.setGame(response.data);
        })

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
        minutes = minutes < 10 ? '0' + minutes.toString() : minutes;
        seconds = seconds < 10 ? '0' + seconds.toString() : seconds;
        return (
            <div className={`goal-row ${goal.team.id === teamId1 ? 'goal-row-1' : 'goal-row-2'}`}>
                {goal.team.id === teamId1 && <>
                    {goal.player !== null && <span className={"black-400-13"}>{goal.player.username}</span>}
                    <div className={"black-ball-icon"}></div>
                    <span className={"black-400-13"}>{minutes}:{seconds}'</span>
                    <div className={"icon player-avatar-icon"}></div>
                    <div className={"gray-line"}></div>
                </>}
                {goal.team.id === teamId2 && <>
                    <div className={"icon player-avatar-icon"}></div>
                    <span className={"black-400-13"}>{minutes}:{seconds}'</span>
                    <div className={"black-ball-icon"}></div>
                    {goal.player !== null && <span className={"black-400-13"}>{goal.player.username}</span>}
                    <div className={"gray-line"}></div>
                </>}
            </div>
        )
    }

    return (
        <VisibleEventWrapper>
            {game && <div className={`game-player-component`} onClick={fonClick}>
                <div className={"manage"}>
                    <div className={"elem elem-1"}>
                        <span className={"black-400-16"}>{game.team_1.name}</span>
                        <span className={"black-800-32"}>{game.score_1} - {game.score_2}</span>
                        <span className={"black-400-16"}>{game.team_2.name}</span>
                    </div>
                    {!game.time_end && <div className={"elem elem-2"}>
                        <ClockDigit value={timer[0]}/>
                        <ClockDigit value={timer[1]}/>
                        <div className={"clock-middle-icon"}></div>
                        <ClockDigit value={timer[2]}/>
                        <ClockDigit value={timer[3]}/>
                    </div>}
                    {game.time_end !== null && <div className={"elem elem-4"}>
                        <span className={"el-1 black-400-12-italic"}>Игра завершена. Результаты сохранены</span>
                        <Link className={"btn el-2 white-500-12"} to={BaseRoutes.eventGamePlayerLink(event.id, game.id + 1)}>Начать  следующую игру</Link>
                    </div>}
                    <div className={"elem elem-3"}>
                        <div className={"btn-block block-1"}>
                            <span className={`btn white-600-14 ${game.is_play ? '' : 'lock'}`} onClick={game.is_play ? goal1 : () => {}}>
                                <div className={"icon white-ball-icon"}></div>Гол
                            </span>
                            <PlayersList className={"player-list-1"} isOpen={isOpen1} team={game.team_1} setIsOpen={setIsOpen1}/>
                        </div>
                        {game.is_play && <span className={`btn white-600-14`} onClick={endGamePeriod}>
                            <div className={"icon white-pause-icon"}></div>
                        </span>}
                        {!game.is_play && <span className={`btn white-600-14 ${game.time_end ? 'lock' : ''}`} onClick={game.time_end ? () => {} : beginGamePeriod}>
                            <div className={"icon white-play-icon"}></div>
                        </span>}
                        <div className={"btn-block block-2"}>
                            <span className={`btn white-600-14 ${game.time_begin && game.is_play ? '' : 'lock'}`} onClick={game.is_play ? goal2 : () => {}}>
                                <div className={"icon white-ball-icon"}></div>Гол
                            </span>
                            <PlayersList className={"player-list-2"} isOpen={isOpen2} team={game.team_2} setIsOpen={setIsOpen2}/>
                        </div>
                    </div>
                    {game.goals.lenght !== 0 && <div className={"elem elem-5"}>
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
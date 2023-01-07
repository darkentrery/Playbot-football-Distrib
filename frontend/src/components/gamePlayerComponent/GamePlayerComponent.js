import VisibleEventWrapper from "../../redux/containers/VisibleEventWrapper";
import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {eventService} from "../../services/EventService";
import {authDecoratorWithoutLogin} from "../../services/AuthDecorator";
import BaseRoutes from "../../routes/BaseRoutes";


export const GamePlayerComponent = ({event, user, funcs}) => {
    const params = useParams();
    const gameId = params.gameId;
    const [game, setGame] = useState(false);
    const [timer, setTimer] = useState('0000');
    const [restTime, setRestTime] = useState(false);
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);

    useEffect(() => {
        if (event) {
            event.event_games.map((g) => {
                if (g.id == gameId) {
                    setGame(g);
                    let seconds = g.rest_time % 60;
                    let minutes = ((g.rest_time - seconds) / 60).toString();
                    setTimer(`${minutes.length === 1 ? '0' + minutes : minutes}${seconds < 10 ? '0' + seconds.toString() : seconds}`);
                    setRestTime(g.rest_time);
                }
            })
        }
        console.log(game)
        console.log(timer)
    }, [gameId, event])


    const ClockDigit = ({value}) => {
        return (
            <div className={"clock-digit"}>
                <span className={"black-500-28"}>{value}</span>
                <div className={"second-fon"}></div>
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
                        if (response.status === 200) setGame(response.data);
                    })
                }
            }, 1000);
            return () => clearInterval(interval);
        }
    })

    const beginGamePeriod = () => {
        authDecoratorWithoutLogin(eventService.beginGamePeriod, game).then((response) => {
            console.log(response.data)
            if (response.status === 200) setGame(response.data);
        })
    }

    const endGamePeriod = () => {
        authDecoratorWithoutLogin(eventService.endGamePeriod, game).then((response) => {
            console.log(response.data)
            if (response.status === 200) setGame(response.data);
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
            if (response.status === 200) setGame(response.data);
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

    return (
        <VisibleEventWrapper>
            {game && <div className={`game-player-component`}>
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
                        <div className={"btn-block"}>
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
                        <div className={"btn-block"}>
                            <span className={`btn white-600-14 ${game.time_begin && game.is_play ? '' : 'lock'}`} onClick={game.is_play ? goal2 : () => {}}>
                                <div className={"icon white-ball-icon"}></div>Гол
                            </span>
                            <PlayersList className={"player-list-2"} isOpen={isOpen2} team={game.team_2} setIsOpen={setIsOpen2}/>
                        </div>
                    </div>

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
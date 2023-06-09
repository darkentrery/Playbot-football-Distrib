import VisibleEventWrapper from "../../../redux/containers/VisibleEventWrapper";
import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {eventService} from "../../../services/EventService";
import {authDecoratorWithoutLogin} from "../../../services/AuthDecorator";
import BaseRoutes from "../../../routes/BaseRoutes";
import $ from "jquery";
import {LoaderComponent} from "../../loaderComponent/LoaderComponent";
import {HighLightComponent} from "../../highLightComponent/HighLightComponent";
import {PlayerIconComponent} from "../../playerIconComponent/PlayerIconComponent";
import {GoalRowComponent} from "../../goalRowComponent/GoalRowComponent";


export const GamePlayerComponent = ({event, user, game, playerBlock, funcs}) => {
    const { gameId } = useParams();
    const [timer, setTimer] = useState('0000');
    const [restTime, setRestTime] = useState(false);
    const [restTimeEnd, setRestTimeEnd] = useState(false);
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpen1Auto, setIsOpen1Auto] = useState(false);
    const [isOpen2Auto, setIsOpen2Auto] = useState(false);
    const [isOpen1Pass, setIsOpen1Pass] = useState(false);
    const [isOpen2Pass, setIsOpen2Pass] = useState(false);
    const [goal1Player, setGoal1Player] = useState(false);
    const [goal2Player, setGoal2Player] = useState(false);
    const [players1Pass, setPlayers1Pass] = useState([]);
    const [players2Pass, setPlayers2Pass] = useState([]);

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
                    // console.log(restTime - 1)
                    // console.log(new Date())
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

    const createGoal = (teamId, auto, player=false, assistant=false) => {
        if (!playerBlock) {
            funcs.setPlayerBlock(true);
            // setBlock(true);
            setIsPlay(false);
            let data = {
                game: game.id,
                team: teamId,
                time: new Date().toISOString(),
                game_time: event.duration.duration * 60 - restTime,
                auto: auto,
            }
            console.log(new Date())
            setRestTimeEnd(restTime);
            if (player) data.player = player.player.id;
            if (assistant) data.assistant = assistant.player.id;
            authDecoratorWithoutLogin(eventService.createGoal, data).then((response) => {
                console.log(response.data)
                if (response.status === 200) {
                    funcs.setPlayerBlock(false);
                    funcs.setGame(response.data);
                }
            })
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

    const team1AutoGoal = () => {
        setIsOpen1(false);
        setIsOpen1Auto(true);
    }

    const team2AutoGoal = () => {
        setIsOpen2(false);
        setIsOpen2Auto(true);
    }

    const team1Goal = () => {
        setIsOpen1(true);
        setIsOpen1Auto(false);
    }

    const team2Goal = () => {
        setIsOpen2(true);
        setIsOpen2Auto(false);
    }

    const pass1Back = () => {
        setIsOpen1Pass(false);
        setIsOpen1(true);
    }

    const pass2Back = () => {
        setIsOpen2Pass(false);
        setIsOpen2(true);
    }

    const closeHighLight = () => {
        setIsOpen1(false);
        setIsOpen2(false);
        setIsOpen1Auto(false);
        setIsOpen2Auto(false);
        setIsOpen1Pass(false);
        setIsOpen2Pass(false);
        setGoal1Player(false);
        setGoal2Player(false);
    }

    const click1TeamGoalPlayer = (player) => {
        setIsOpen1(false);
        setIsOpen1Pass(true);
        setGoal1Player(player);
        let players = game.team_1.team_players.filter(item => { if (player.id !== item.id) return item; });
        setPlayers1Pass(players);
    }

    const click2TeamGoalPlayer = (player) => {
        setIsOpen2(false);
        setIsOpen2Pass(true);
        setGoal2Player(player);
        let players = game.team_2.team_players.filter(item => { if (player.id !== item.id) return item; });
        setPlayers2Pass(players);
    }

    const click1AutoGoal = (player) => {
        createGoal(game.team_1.id, true, player);
        closeHighLight();
    }

    const click2AutoGoal = (player) => {
        createGoal(game.team_2.id, true, player);
        closeHighLight();
    }

    const click1Goal = (player) => {
        createGoal(game.team_1.id, false, goal1Player, player);
        closeHighLight();
    }

    const click2Goal = (player) => {
        createGoal(game.team_2.id, false, goal2Player, player);
        closeHighLight();
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
                            <span className={`btn white-600-14 ${isPlay && !playerBlock ? '' : 'lock'}`} onClick={isPlay ? team1Goal : () => {}}>
                                <div className={"icon white-ball-icon"}></div>Гол
                            </span>
                            <HighLightComponent
                                isOpen={isOpen1} event={event} teamPlayers={game.team_1.team_players} autoGoal={team1AutoGoal}
                                text={"Автор гола (1/2)"} clickClose={closeHighLight} clickPlayer={click1TeamGoalPlayer}
                                className={"left"}
                            />
                            <HighLightComponent
                                isOpen={isOpen1Pass} event={event} teamPlayers={players1Pass} clickPlayer={click1Goal}
                                text={"Голевой пас (2/2)"} toBack={pass1Back} clickClose={closeHighLight} className={"left"}
                            />
                            <HighLightComponent
                                isOpen={isOpen1Auto} event={event} teamPlayers={game.team_2.team_players} toBack={team1Goal}
                                text={"Автор автогола"} clickClose={closeHighLight} clickPlayer={click1AutoGoal}
                                className={"left"}
                            />
                        </div>
                        {isPlay && <span className={`btn white-600-14 ${playerBlock ? 'lock' : ''}`} onClick={endGamePeriod}>
                            <div className={"icon white-pause-icon"}></div>
                        </span>}
                        {!isPlay && <span className={`btn white-600-14 ${game.time_end || event.is_end || playerBlock ? 'lock' : ''}`} onClick={game.time_end || event.is_end ? () => {} : beginGamePeriod}>
                            <div className={"icon white-play-icon"}></div>
                        </span>}
                        <div className={`btn-block block-2`}>
                            <span className={`btn white-600-14 ${isPlay && !playerBlock ? '' : 'lock'}`} onClick={isPlay ? team2Goal : () => {}}>
                                <div className={"icon white-ball-icon"}></div>Гол
                            </span>
                            <HighLightComponent
                                isOpen={isOpen2} event={event} teamPlayers={game.team_2.team_players} autoGoal={team2AutoGoal}
                                text={"Автор гола (1/2)"} clickClose={closeHighLight} clickPlayer={click2TeamGoalPlayer}
                                className={"right"}
                            />
                            <HighLightComponent
                                isOpen={isOpen2Pass} event={event} teamPlayers={players2Pass} clickPlayer={click2Goal}
                                text={"Голевой пас (2/2)"} toBack={pass2Back} clickClose={closeHighLight} className={"right"}
                            />
                            <HighLightComponent
                                isOpen={isOpen2Auto} event={event} teamPlayers={game.team_1.team_players} toBack={team2Goal}
                                text={"Автор автогола"} clickClose={closeHighLight} clickPlayer={click2AutoGoal}
                                className={"right"}
                            />
                        </div>
                    </div>
                    {game.goals.length !== 0 && <div className={"elem elem-5"}>
                        {game.goals.map((goal, key) => (
                            <GoalRowComponent goal={goal} event={event} team1={game.team_1} team2={game.team_2} key={key}/>
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
                            <span className={"team-name black-700-13"}>{game.team_1.name}</span>
                            {game.team_1.team_players.map((player, key) => (
                                <div className={"player"} key={key}>
                                    <span className={"black-400-13"}>{key+1}.</span>
                                    <PlayerIconComponent className={"icon"} photo={player.player.photo}/>
                                    <span className={"black-400-13"}>{player.player.username}</span>
                                </div>
                            ))}
                        </div>
                        <div className={"team team-2"}>
                            <span className={"team-name black-700-13"}>{game.team_2.name}</span>
                            {game.team_2.team_players.map((player, key) => (
                                <div className={"player"} key={key}>
                                    <span className={"black-400-13"}>{key+1}.</span>
                                    <PlayerIconComponent className={"icon"} photo={player.player.photo}/>
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
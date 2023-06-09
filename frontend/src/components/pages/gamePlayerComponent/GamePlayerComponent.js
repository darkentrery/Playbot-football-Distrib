import VisibleEventWrapper from "../../../redux/containers/VisibleEventWrapper";
import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {eventService} from "../../../services/EventService";
import BaseRoutes from "../../../routes/BaseRoutes";
import $ from "jquery";
import {LoaderComponent} from "../../loaderComponent/LoaderComponent";
import {HighLightComponent} from "../../highLightComponent/HighLightComponent";
import {PlayerIconComponent} from "../../playerIconComponent/PlayerIconComponent";
import {GoalRowComponent} from "../../goalRowComponent/GoalRowComponent";
import useWebSocket, {ReadyState} from "react-use-websocket";


export const GamePlayerComponent = ({event, user, game, playerBlock, funcs}) => {
    const { gameId } = useParams();
    const [timer, setTimer] = useState('0000');
    const [restTime, setRestTime] = useState(false);
    const [isOpen1, setIsOpen1] = useState(false);
    const [isOpen2, setIsOpen2] = useState(false);
    const [isOpen1Auto, setIsOpen1Auto] = useState(false);
    const [isOpen2Auto, setIsOpen2Auto] = useState(false);
    const [isOpen1Pass, setIsOpen1Pass] = useState(false);
    const [isOpen2Pass, setIsOpen2Pass] = useState(false);
    const [players1Pass, setPlayers1Pass] = useState([]);
    const [players2Pass, setPlayers2Pass] = useState([]);
    const SOCKET_URL = process.env.REACT_APP_WEBSOCKET_URL;

    const [isPlay, setIsPlay] = useState(null);

    const getFullDigit = (value) => {
        value = value > 9 ? value.toString() : '0' + value.toString();
        return value;
    }

    const setTimeProps = () => {
        if (game && event) {
            let currentDuration = event.duration.duration * 60 - game.rest_time;
            let seconds = currentDuration % 60;
            let minutes = ((currentDuration - seconds) / 60);
            setTimer(`${getFullDigit(minutes)}${getFullDigit(seconds)}`);
            console.log(event.duration.duration * 60 - currentDuration)
            setRestTime(game.rest_time);
            setIsPlay(game.is_play);
        }
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
            setRestTime(false);
            setIsPlay(null);
        }
        console.log(game)
    }, [gameId, event]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        console.log("Change game")
        setTimeProps();
    }, [game]) // eslint-disable-line react-hooks/exhaustive-deps

    const ClockDigit = ({value}) => {
        return (
            <div className={"clock-digit"}>
                <span className={"second-fon black-500-28"}>{value}</span>
            </div>
        )
    }

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
                    sendJsonMessage({
                        type: 'end_game',
                        game,
                    });
                    clearTimeout(interval);
                }
            }, 990);
        } else if (!isPlay && !game.is_play) {
            console.log("Not is play")
            setTimeProps();
        }
    }, [restTime, isPlay])

    const beginGamePeriod = () => {
        if (!playerBlock) {
            funcs.setPlayerBlock(true);
            setIsPlay(true);
            sendJsonMessage({
                type: 'begin_game_period',
                game,
            });
        }
    }

    const endGamePeriod = () => {
        if (!playerBlock) {
            funcs.setPlayerBlock(true);
            setIsPlay(false);
            console.log(new Date())
            sendJsonMessage({
                type: 'end_game_period',
                game,
            });
        }
    }

    const createGoal = (teamId, auto, player=false, assistant=false) => {
        if (!playerBlock) {
            funcs.setPlayerBlock(true);
            setIsPlay(false);
            let data = {
                game: game.id,
                team: teamId,
                time: new Date().toISOString(),
                game_time: event.duration.duration * 60 - restTime,
                auto: auto,
            }
            if (player) data.player = player.player.id;
            if (assistant) data.assistant = assistant.player.id;
            sendJsonMessage({
                type: 'create_goal',
                data: data,
            });
        }
    }

    const updateGoalAssistant = (goal, assistant) => {
        let updateGoal = {...goal};
        updateGoal.player = updateGoal.player.id;
        updateGoal.assistant = assistant.player.id;
        sendJsonMessage({
            type: "update_goal",
            data: updateGoal,
        })
    }

    const deleteGoal = () => {
        sendJsonMessage({
            type: "delete_goal",
            data: game.goals[game.goals.length - 1],
        })
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
        endGamePeriod();
        setIsOpen1(true);
        setIsOpen1Auto(false);
    }

    const team2Goal = () => {
        endGamePeriod();
        setIsOpen2(true);
        setIsOpen2Auto(false);
    }

    const pass1Back = () => {
        setIsOpen1Pass(false);
        setIsOpen1(true);
        deleteGoal();
    }

    const pass2Back = () => {
        setIsOpen2Pass(false);
        setIsOpen2(true);
        deleteGoal();
    }

    const closeHighLight = () => {
        setIsOpen1(false);
        setIsOpen2(false);
        setIsOpen1Auto(false);
        setIsOpen2Auto(false);
        setIsOpen1Pass(false);
        setIsOpen2Pass(false);
    }

    const click1TeamGoalPlayer = (player) => {
        if (!playerBlock) {
            setIsOpen1(false);
            setIsOpen1Pass(true);
            let players = game.team_1.team_players.filter(item => {
                if (player.id !== item.id) return item;
            });
            setPlayers1Pass(players);
            createGoal(game.team_1.id, false, player, false);
        }
    }

    const click2TeamGoalPlayer = (player) => {
        if (!playerBlock) {
            setIsOpen2(false);
            setIsOpen2Pass(true);
            let players = game.team_2.team_players.filter(item => {
                if (player.id !== item.id) return item;
            });
            setPlayers2Pass(players);
            createGoal(game.team_2.id, false, player, false);
        }
    }

    const click1AutoGoal = (player) => {
        if (!playerBlock) {
            createGoal(game.team_1.id, true, player);
            closeHighLight();
        }
    }

    const click2AutoGoal = (player) => {
        if (!playerBlock) {
            createGoal(game.team_2.id, true, player);
            closeHighLight();
        }
    }

    const click1Goal = (player) => {
        if (!game.goals[game.goals.length - 1].auto && !game.goals[game.goals.length - 1].assistant) {
            updateGoalAssistant(game.goals[game.goals.length - 1], player);
            closeHighLight();
        }
    }

    const click2Goal = (player) => {
        if (!game.goals[game.goals.length - 1].auto && !game.goals[game.goals.length - 1].assistant) {
            updateGoalAssistant(game.goals[game.goals.length - 1], player);
            closeHighLight();
        }
    }

    const { sendJsonMessage } = useWebSocket(
        user.isAuth && game ? `${SOCKET_URL}event-game/${game.id}/` : null,
        {   
            shouldReconnect: true,
            onError: (e) => {
                console.log("socket is broken: ", e)
            },
            queryParams: {
                Authorization: user.isAuth
                    ? `Bearer ${localStorage.getItem('access_token')}`
                    : '',
                Refresh: user.isAuth
                    ? `${localStorage.getItem('refresh_token')}`
                    : '',
            },
        }
    );

    useEffect(() => {
        funcs.setSendSocketMessage(sendJsonMessage);
    }, [sendJsonMessage])

    const { readyState } = useWebSocket(
        user.isAuth && game ? `${SOCKET_URL}event-game/${game.id}/` : null,
        {
            queryParams: {
                Authorization: user.isAuth
                    ? `Bearer ${localStorage.getItem('access_token')}`
                    : '',
                Refresh: user.isAuth
                    ? `${localStorage.getItem('refresh_token')}`
                    : '',
            },
            shouldReconnect: true,
            onError: (e) => {
                console.log("socket is broken: ", e);
            },
            onOpen: () => {
                console.log('Connected!');
            },
            onClose: () => {
                console.log('Disconnected!');
            },
            onMessage: (e) => {
                const data = JSON.parse(e.data);
                switch (data.type) {
                    case 'game_message':
                        console.log(data);
                        funcs.setGame(data.game);
                        funcs.setPlayerBlock(false);
                        break;
                    case 'event_game_message':
                        console.log(data);
                        // funcs.setGame(data.game);
                        funcs.setEvent(data.event);
                        funcs.setPlayerBlock(false);
                        for (let g of data.event.event_games) {
                            if (g.id === data.event.current_game_id) {
                                funcs.setGame(g);
                                console.log(g)
                                if (!g.time_begin) {
                                    setTimer("0000");
                                }
                            }
                        }
                        break;
                    default:
                        console.error('Unknown message type!');
                        break;
                }
            },
        }
    );

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];

    return (
        <VisibleEventWrapper>
            {(!game || !event) && <LoaderComponent/>}
            {game && event && <div className={`game-player-component`} onClick={fonClick}>
                <div className={"manage"}>
                    <div className={"elem elem-1"}>
                        <span className={"black-400-16 team-name team-name-left"}>{eventService.getTeamName(game.team_1.name)}</span>
                        <div className={"team-color"} style={{backgroundColor: game.team_1.color ? game.team_1.color.color_hex : "#FFFFFF"}}></div>
                        <span className={"black-800-32 central-count"}>{game.score_1} - {game.score_2}</span>
                        <div className={"team-color"} style={{backgroundColor: game.team_2.color ? game.team_2.color.color_hex : "#FFFFFF"}}></div>
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
                            <GoalRowComponent goal={goal} event={event} team1={game.team_1} team2={game.team_2} key={key}
                                              funcs={funcs} sendSocketMessage={sendJsonMessage}/>
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
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import RatingTable from "../../overlay/RatingTable/RatingTable";
import ScoreTable from "../../overlay/ScoreTable/ScoreTable";
import Teams from "../../overlay/Teams/Teams";
import useWebSocket, {ReadyState} from "react-use-websocket";
import {eventService} from "../../../services/EventService";
import PlayerBigCard from "./PlayerBigCard";
import "./overlay.scss";


// eslint-disable-next-line react/prop-types
export const OverlayPage = ({user}) => {
    const [game, setGame] = useState(false);
    const [event, setEvent] = useState(false);
    const [restTime, setRestTime] = useState(false);
    const [restTimeEnd, setRestTimeEnd] = useState(false);
    const [timer, setTimer] = useState('0000');
    const [isPlay, setIsPlay] = useState(null);
    // eslint-disable-next-line no-undef
    const SOCKET_URL = process.env.REACT_APP_WEBSOCKET_URL;
    const { pk } = useParams();

    const getFullDigit = (value) => {
        value = value > 9 ? value.toString() : '0' + value.toString();
        return value;
    }

    useEffect(() => {
        if (pk) {
            eventService.getEvent(pk).then((response) => {
                if (response.status === 200) {
                    console.log(response.data.event)
                    setEvent(response.data.event);
                    for (let g of response.data.event.event_games) {
                        if (g.id === response.data.event.current_game_id) {
                            setGame(g);
                            console.log(g)
                            break;
                        }
                    }
                }
            })
        }
    }, [pk])

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
                console.log(seconds, minutes)
                setTimer(`${getFullDigit(minutes)}${getFullDigit(seconds)}`);
                setRestTime(event.duration.duration * 60 - currentDuration);
            }
            setIsPlay(game.is_play);
        }
    }, [game])

    useEffect(() => {
        if (restTimeEnd && restTimeEnd > restTime) {
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
                    setRestTime(restTime - 1);
                } else if (restTime - 1 < 0 && !game.time_end) {
                    setIsPlay(false);
                    clearTimeout(interval);
                }
            }, 990);
        }
    }, [restTime, isPlay])

    const { readyState } = useWebSocket(
        user && game ? `${SOCKET_URL}event-game/${game.id}/` : null,
        {
            queryParams: {
                Authorization: user
                    ? `Bearer ${localStorage.getItem('access_token')}`
                    : '',
                Refresh: user
                    ? `${localStorage.getItem('refresh_token')}`
                    : '',
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
                        setGame(data.game);
                        // eslint-disable-next-line no-case-declarations
                        let newEvent = {...event};
                        event.teams.forEach((team, i) => {
                            if (team.id === data.game.team_1.id) {
                                newEvent.teams[i] = data.game.team_1;
                            }
                            if (team.id === data.game.team_2.id) {
                                newEvent.teams[i] = data.game.team_2;
                            }
                        })
                        setEvent(newEvent);
                        break;
                    case 'event_game_message':
                        console.log(data);
                        setGame(data.game);
                        setEvent(data.event);
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
    console.log(connectionStatus)

    return (
        <div className={'wrapper ' + ((!event?.is_begin || event?.all_games_finished) && ("hide-overlay"))}>
            {(event && game) && (
                <>
                    <main>
                        <RatingTable event={event} game={game} />
                        <ScoreTable game={game} allGames={event.event_games.length} timer={timer} />
                    </main>
                    <Teams game={game} />
                    <PlayerBigCard game={game} />

                </>
            )}
        </div>
    )
}
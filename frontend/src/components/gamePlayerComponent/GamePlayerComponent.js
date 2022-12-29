import VisibleEventWrapper from "../../redux/containers/VisibleEventWrapper";
import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";


export const GamePlayerComponent = ({event, user, funcs}) => {
    const params = useParams();
    const gameId = params.gameId;
    const [game, setGame] = useState(false);

    useEffect(() => {
        if (event && !game) {
            event.event_games.map((g) => {
                if (g.id == gameId) setGame(g);
            })
        }
        console.log(game)
    }, [gameId, event])


    const ClockDigit = ({value}) => {
        return (
            <div className={"clock-digit"}>
                <span className={"black-500-28"}>{value}</span>
                <div className={"second-fon"}></div>
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
                    <div className={"elem elem-2"}>
                        <ClockDigit value={1}/>
                        <ClockDigit value={1}/>
                        <div className={"clock-middle-icon"}></div>
                        <ClockDigit value={1}/>
                        <ClockDigit value={1}/>
                    </div>
                    <div className={"elem elem-3"}>
                        <span className={`btn white-600-14 ${game.time_begin ? '' : 'lock'}`}><div className={"icon white-ball-icon"}></div>Гол</span>
                        <span className={`btn white-600-14`}><div className={"icon white-play-icon"}></div></span>
                        <span className={`btn white-600-14 ${game.time_begin ? '' : 'lock'}`}><div className={"icon white-ball-icon"}></div>Гол</span>
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
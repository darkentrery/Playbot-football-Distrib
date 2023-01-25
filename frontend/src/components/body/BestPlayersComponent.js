import {useEffect, useState} from "react";
import {authService} from "../../services/AuthService";
import {Link} from "react-router-dom";
import ProfileRoutes from "../../routes/ProfileRoutes";


export default function BestPlayersComponent () {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        let isSubscribe = true;
        authService.getUsers().then((response) => {
            if (response.status === 200) {
                setPlayers(response.data);
            }
        })
        return () => isSubscribe = false;
    }, [])

    return (
        <div className={"best-players-component"}>
            <div className={"table-head"}>
                <span className={"elem elem-1 gray-400-13"}>Топ игроков</span>
                <span className={"elem elem-2 gray-400-13"}>Рейтинг</span>
                <span className={"elem elem-3 gray-400-13"}>Победы</span>
                <span className={"elem elem-4 gray-400-13"}>% побед</span>
                <span className={"elem elem-5 gray-400-13"}>Всего игр</span>
                <span className={"elem elem-6 gray-400-13"}>Изменение рейтинга</span>
            </div>
            {players.length !== 0 && players.map((player, key) => (
                <Link className={"player"} key={key} to={ProfileRoutes.previewPlayerLink(player.id)}>
                    <span className={"elem elem-1 player-avatar-icon black-400-13"}>{key + 1}. <span className={"name"}>{player.username}</span></span>
                    <span className={"elem elem-2 black-400-13"}>354<span className={"green"}>&nbsp;+11</span></span>
                    <span className={"elem elem-3 black-400-13 green"}>{player.wins}</span>
                    <span className={"elem elem-4 black-400-13 gray"}>{player.all_games !== 0 ? Math.round(100 * player.wins / player.all_games) : 0}</span>
                    <span className={"elem elem-5 black-400-13"}>{player.all_games}</span>
                    <span className={"elem elem-6 black-400-13 rank-icon"}></span>
                </Link>
            ))}
        </div>
    )
}
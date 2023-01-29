import {Link} from "react-router-dom";
import ProfileRoutes from "../../routes/ProfileRoutes";
import {RankChartComponent} from "../rankChartComponent/RankChartComponent";
import {useEffect, useState} from "react";


export const BestPlayersComponent = ({players}) => {
    const [playersView, setPlayersView] = useState([]);
    const [flagSort, setFlagSort] = useState("rank");
    const flagsSort = {
        name: "username",
        rank: "rank",
        wins: "wins",
        percent: "percentWins",
        games: "all_games",
    }

    useEffect(() => {
        players = players.sort((a, b) => {
            if (flagSort !== flagsSort.percent) {
                if (a[flagSort] > b[flagSort]) {
                    return -1;
                } else {
                    return 1;
                }
            } else {
                let aPercent = a.all_games !== 0 ? Math.round(100 * a.wins / a.all_games) : 0;
                let bPercent = b.all_games !== 0 ? Math.round(100 * b.wins / b.all_games) : 0;
                if (aPercent > bPercent) {
                    return -1;
                } else {
                    return 1;
                }
            }
        })
        let array = [];
        players.map((item) => {
            if (item.dRank === undefined) {
                console.log(item.rank, item.ranks_history[0].rank, item.ranks_history)
                item.dRank = item.rank - item.ranks_history[0].rank;
            }
            array.push(item)
        });
        setPlayersView(array);
    }, [flagSort, players])

    return (
        <div className={"best-players-component"}>
            <div className={"table-head"}>
                <span className={"elem elem-1 gray-400-13"} onClick={() => setFlagSort(flagsSort.name)}>Игрок</span>
                <span className={"elem elem-2 gray-400-13"} onClick={() => setFlagSort(flagsSort.rank)}>Рейтинг</span>
                <span className={"elem elem-3 gray-400-13"} onClick={() => setFlagSort(flagsSort.wins)}>Победы</span>
                <span className={"elem elem-4 gray-400-13"} onClick={() => setFlagSort(flagsSort.percent)}>% побед</span>
                <span className={"elem elem-5 gray-400-13"} onClick={() => setFlagSort(flagsSort.games)}>Всего игр</span>
                <span className={"elem elem-6 gray-400-13"}>Изменение рейтинга</span>
                <span className={"elem elem-7 gray-400-13"}>П / И</span>
                <span className={"elem elem-8 gray-cup-icon"}></span>
            </div>
            {playersView.map((player, key) => (
                <Link className={"player"} key={key} to={ProfileRoutes.previewPlayerLink(player.id)}>
                    <div className={"elem elem-1"}>
                        <span className={"number black-400-13"}>{key + 1}.</span>
                        <div className={"icon player-avatar-icon"}></div>
                        <span className={"black-400-13 name"}>{player.username}</span>
                    </div>
                    <span className={"elem elem-2 black-400-13"}>
                        {player.rank}
                        <span className={`black-400-13 ${player.dRank >= 0 ? 'green' : 'red'}`}>&nbsp;{player.dRank >= 0 ? '+' : ''}{player.dRank}</span>
                    </span>
                    <span className={"elem elem-3 black-400-13 green"}>{player.wins}</span>
                    <span className={"elem elem-4 black-400-13 gray"}>{player.all_games !== 0 ? Math.round(100 * player.wins / player.all_games) : 0}</span>
                    <span className={"elem elem-5 black-400-13"}>{player.all_games}</span>
                    <span className={"elem elem-7 gray-400-13"}>{player.wins} / {player.all_games}</span>
                    <RankChartComponent ranks={player.ranks_history}/>
                </Link>
            ))}
        </div>
    )
}
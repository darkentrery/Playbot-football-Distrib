import {Link} from "react-router-dom";
import ProfileRoutes from "../../routes/ProfileRoutes";
import {RankChartComponent} from "../rankChartComponent/RankChartComponent";
import {useEffect, useState} from "react";
import {LoaderComponent} from "../loaderComponent/LoaderComponent";


export const BestPlayersComponent = ({players, loader}) => {
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
                if (a.wins_percent > b.wins_percent) {
                    return -1;
                } else {
                    return 1;
                }
            }
        })
        let array = [];
        players.map((item) => {
            if (item.dRank === undefined) {
                item.dRank = item.rank - item.ranks_history[0].rank;
            }
            array.push(item)
        });
        setPlayersView(array);
    }, [flagSort, players])

    const PlayerRow = ({player, number}) => {
        const [username, setUsername] = useState('');
        useEffect(() => {
            let username = player.username.split(' ');
            let newNames = [];
            username.map((item) => {
                if (item.length <= 12) {
                    newNames.push(item);
                } else {
                    newNames.push(`${item.slice(0, 12)}...`);
                }
            })
            setUsername(newNames.join(' '));
        }, [player])

        return (
            <Link className={"player"} to={ProfileRoutes.previewPlayerLink(player.id)}>
                <div className={"elem elem-1"}>
                    <span className={"number black-400-13"}>{number + 1}.</span>
                    <div className={"icon player-avatar-icon"}></div>
                    <span className={"black-400-13 name"}>{username}</span>
                </div>
                <span className={"elem elem-2 black-400-13"}>
                    {Math.floor(player.rank)}
                    <span className={`black-400-13 ${player.dRank >= 0 ? 'green' : 'red'}`}>&nbsp;{player.dRank >= 0 ? '+' : ''}{Math.floor(player.dRank)}</span>
                </span>
                <span className={"elem elem-3 black-400-13 green"}>{player.wins}</span>
                <span className={"elem elem-4 black-400-13 gray"}>{player.wins_percent}%</span>
                <span className={"elem elem-5 black-400-13"}>{player.all_games}</span>
                <span className={"elem elem-7 gray-400-13"}>{player.wins} / {player.all_games}</span>
                <RankChartComponent ranks={player.ranks_history} rank={(player.rank)} dRank={player.dRank}/>
            </Link>
        )
    }

    return (
        <div className={`best-players-component ${loader ? 'loader' : ''}`}>
            {loader && <LoaderComponent/>}
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
            {playersView.map((player, key) => (<PlayerRow player={player} number={key} key={key}/>))}
        </div>
    )
}
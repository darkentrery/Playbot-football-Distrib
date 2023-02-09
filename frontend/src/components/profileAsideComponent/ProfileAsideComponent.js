import {EmblemComponent} from "../emblemComponent/EmblemComponent";
import {EmblemSmallComponent} from "../emblemSmallComponent/EmblemSmallComponent";
import {useEffect, useState} from "react";
import {LoaderComponent} from "../loaderComponent/LoaderComponent";


export const ProfileAsideComponent = ({player, funcs, children}) => {
    const [fillPercent, setFillPercent] = useState(0);

    useEffect(() => {
        if (player) {
            let count = 0;
            if (player.email) count += 1;
            if (player.birthday) count += 1;
            if (player.username) count += 1;
            if (player.gender) count += 1;
            if (player.phone_number) count += 1;
            if (player.city) count += 1;
            if (player.position_1) count += 1;
            if (player.position_2) count += 1;
            if (player.about_self) count += 1;
            if (player.photo) count += 1;
            setFillPercent(Math.floor(100* count / 10));
        }
    }, [player])

    const FootballField = ({player}) => {
        const numbers = [1, 2, 3, 4, 5, 6, 7, 8 ,9 ,10 ,11];
        const numbersDict = {
            1: 6,
            2: 5,
            3: 4,
            4: 3,
            5: 2,
            6: 1,
            7: 2,
            8: 3,
            9: 4,
            10: 5,
            11: 6,
        }
        return (
            <div className={"football-field"}>
                <div className={"gate gate-1"}></div>
                <div className={"gate gate-2"}></div>
                <div className={"over-gate over-gate-1"}></div>
                <div className={"over-gate over-gate-2"}></div>
                <div className={"gate-circle gate-circle-1"}></div>
                <div className={"gate-circle gate-circle-2"}></div>
                <div className={"central-line"}></div>
                <div className={"central-circle"}></div>
                <div className={"central-point"}></div>
                {numbers.map((num) => (
                    <span className={`black-600-13 circle circle-${num} ${player.position_1 && numbersDict[num] === player.position_1.id ? 'orange-fill' : ''} ${player.position_2 && numbersDict[num] === player.position_2.id ? 'fill' : ''}`} key={num}>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{player.position_1 && numbersDict[num] === player.position_1.id ? player.position_1.acronym: ''}
                        {player.position_2 && numbersDict[num] === player.position_2.id ? player.position_2.acronym: ''}
                    </span>
                ))}
            </div>
        )
    }

    return (
        <div className={`profile-aside-component`}>
            <div className={`elem elem-1 ${!player ? 'loader' : ''}`}>
                {player && <>
                    <EmblemComponent player={player}/>
                    <span className={"black-400-14"}>Заполненность профиля&nbsp;<span className={"black-600-14"}>{fillPercent}</span>%</span>
                    <div className={"scale"}>
                        <div className={"fill-scale"} style={{width: `${fillPercent}%`}}></div>
                    </div>
                </>}
                {!player && <LoaderComponent/>}
            </div>
            <div className={"elem elem-376"}>
                <EmblemSmallComponent player={player} funcs={funcs} fillPercent={fillPercent}/>
            </div>
            {player && <>
                <div className={"elem elem-2"}>
                    <div className={"item item-left"}>
                        <span className={"gray-400-12"}>Место в рейтинге</span>
                        <span className={"icon black-table-with-middle-row-icon black-500-24"}>{player.ranking_place}</span>
                    </div>
                    <div className={"item item-right"}>
                        <span className={"gray-400-12"}>Игр за всё время</span>
                        <span className={"icon black-foot-with-ball-icon black-500-24"}>{player.all_games}</span>
                    </div>
                </div>
                <div className={"elem elem-3"}>
                    <div className={"item item-left"}>
                        <span className={"gray-400-12"}>Минут на поле</span>
                        <span className={"icon black-timer-icon black-500-24"}>{Math.round(player.total_time / 60)}</span>
                    </div>
                    <div className={"item item-right"}>
                        <span className={"gray-400-12"}>Соперников за все время</span>
                        <span className={"icon socer-player-icon black-500-24"}>{player.all_rivals}</span>
                    </div>
                </div>
                <div className={"elem elem-4"}>
                    <span className={"gray-400-12"}>Команда</span>
                    <span className={"black-500-20"}>Спартак</span>
                </div>
            </>}
            <div className={`elem elem-5 ${!player ? 'loader' : ''}`}>
                {player && <>
                    <span className={"black-400-13 above-field-text"}>Позиция на поле: </span>
                    <FootballField player={player}/>
                    {children}
                        <span className={"black-600-18 title-regards"}>Достижения</span>
                        <div className={"regards"}>
                        <div className={"icon orange-regard-icon"}></div>
                        <div className={"icon gray-regard-icon"}></div>
                        <div className={"icon gray-regard-icon"}></div>
                        <div className={"icon gray-regard-icon"}></div>
                    </div>
                </>}
                {!player && <LoaderComponent/>}
            </div>
        </div>
    )
}
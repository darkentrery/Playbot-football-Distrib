import {EmblemComponent} from "../emblemComponent/EmblemComponent";
import {EmblemSmallComponent} from "../emblemSmallComponent/EmblemSmallComponent";


export const ProfileAsideComponent = ({player, funcs, children}) => {

    const FootballField = ({player}) => {
        const numbers = [1, 2, 3, 4, 5, 6, 7, 8 ,9 ,10 ,11];
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
                    <span className={`black-600-13 circle circle-${num} ${player.position_1 && num === player.position_1.id ? 'orange-fill' : ''} ${player.position_2 && num === player.position_2.id ? 'fill' : ''}`} key={num}>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{player.position_1 && num === player.position_1.id ? player.position_1.acronym: ''}
                        {player.position_2 && num === player.position_2.id ? player.position_2.acronym: ''}
                    </span>
                ))}
            </div>
        )
    }

    return (
        <div className={`profile-aside-component`}>
            <div className={"elem elem-1"}>
                {player && <EmblemComponent player={player}/>}
                <span className={"black-400-14"}>Заполненность профиля <span className={"black-600-14"}>55</span>%</span>
                <div className={"scale"}>
                    <div className={"fill-scale"} style={{width: 50}}></div>
                </div>
            </div>
            <div className={"elem elem-376"}>
                <EmblemSmallComponent player={player} funcs={funcs}/>
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
            <div className={"elem elem-5"}>
                <span className={"black-400-13 above-field-text"}>Позиция на поле: </span>
                {player && <FootballField player={player}/>}
                {children}
                <span className={"black-600-18 title-regards"}>Достижения</span>
                <div className={"regards"}>
                    <div className={"icon orange-regard-icon"}></div>
                    <div className={"icon gray-regard-icon"}></div>
                    <div className={"icon gray-regard-icon"}></div>
                    <div className={"icon gray-regard-icon"}></div>
                </div>
            </div>
        </div>
    )
}
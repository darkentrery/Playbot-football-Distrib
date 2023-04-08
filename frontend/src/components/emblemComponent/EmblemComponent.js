import {eventService} from "../../services/EventService";


export const EmblemComponent = ({className='', player}) => {
    const serverUrl = process.env.REACT_APP_SERVER_URL;
    return (
        <div className={`emblem-component ${className}`}>
            <div className={"emblem-fon"}>
                <img className={"emblem-photo"} src={serverUrl + player.photo} alt=""/>
            </div>
            {/*<div className={"pentagon-1"}></div>*/}
            {/*<div className={"pentagon-2"}></div>*/}
            {/*<div className={"pentagon-3"}></div>*/}
            {/*<div className={"pentagon-4"}></div>*/}
            {/*<div className={"bottom-logo"}>*/}
            {/*    <div className={"logo-korobka-icon"}></div>*/}
            {/*</div>*/}
            {/*<div className={"bottom-line"}></div>*/}
            <div className={"statistic"}>
                <div className={"elem elem-1"}>
                    <span className={"black-600-22"}>{player.wins}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ПОБ</span>
                    <span className={"black-600-22"}>{player.loss}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ПОР</span>
                </div>
                <div className={"elem elem-2"}>
                    <span className={"black-600-22"}>{player.all_games}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ИГР</span>
                    <span className={"black-600-22"}>{player.count_goals}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ГОЛ</span>
                </div>
            </div>
            <span className={"player-name black-700-28"}>{eventService.getCutUsername(player.username)}</span>
            <div className={"left-label"}>
                <div className={"elem-1 black-700-28"}>{player.rank.toFixed(2)}</div>
                <div className={"elem-2"}></div>
            </div>
        </div>
    )
}
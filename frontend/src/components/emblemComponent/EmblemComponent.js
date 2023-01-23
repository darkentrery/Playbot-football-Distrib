

export const EmblemComponent = ({className='', player}) => {
    return (
        <div className={`emblem-component ${className}`}>
            <div className={"emblem-fon"}></div>
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
                    <span className={"black-600-16"}>{player.wins}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ПОБ</span>
                    <span className={"black-600-16"}>{player.loss}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ПОР</span>
                </div>
                <div className={"elem elem-2"}>
                    <span className={"black-600-16"}>{player.all_games}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ИГР</span>
                    <span className={"black-600-16"}>{player.count_goals}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ГОЛ</span>
                </div>
            </div>
            <span className={"player-name black-700-28"}>sdfsdfsdf</span>
            <div className={"left-label"}>
                <div className={"elem-1 black-700-28"}>100</div>
                <div className={"elem-2"}></div>
            </div>
        </div>
    )
}
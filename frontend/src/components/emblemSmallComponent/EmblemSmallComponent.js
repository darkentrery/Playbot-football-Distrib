import {useState} from "react";


export const EmblemSmallComponent = ({player, funcs, fillPercent}) => {
    const showEmblem = () => {
        funcs.openShowEmblem();
    }

    return (
        <div className={"emblem-small-component"}>
            <span className={"gray-400-13"}>Заполненность профиля&nbsp;<span className={"gray-600-13"}>{fillPercent}</span>%</span>
            <div className={"scale"}>
                <div className={"fill-scale"} style={{width: `${fillPercent}%`}}></div>
            </div>
            <div className={"info-card"}>
                <div className={"emblem-small"} onClick={showEmblem}>
                    <div className={"pentagon-1"}></div>
                    <div className={"pentagon-2"}></div>
                    <div className={"gor-line"}></div>
                    <span className={"black-600-18 digit"}>100</span>
                </div>
                <div className={"info"}>
                    <span className={"black-600-18"}>{player.username}</span>
                    <div className={"cells"}>
                        <div className={"cell"}>
                            <span className={"black-700-28"}>{player.wins}</span>
                            <span className={"black-600-18"}>ПОБ</span>
                        </div>
                        <div className={"border"}></div>
                        <div className={"cell"}>
                            <span className={"black-700-28"}>{player.all_games}</span>
                            <span className={"black-600-18"}>ИГР</span>
                        </div>
                        <div className={"border"}></div>
                        <div className={"cell"}>
                            <span className={"black-700-28"}>{player.loss}</span>
                            <span className={"black-600-18"}>ПОР</span>
                        </div>
                        <div className={"border"}></div>
                        <div className={"cell"}>
                            <span className={"black-700-28"}>{player.count_goals}</span>
                            <span className={"black-600-18"}>ГОЛ</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
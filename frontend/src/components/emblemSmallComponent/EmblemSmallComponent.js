

export const EmblemSmallComponent = ({player}) => {
    return (
        <div className={"emblem-small-component"}>
            <span className={"gray-400-13"}>Заполненность профиля <span className={"gray-600-13"}>55</span>%</span>
            <div className={"scale"}>
                <div className={"fill-scale"} style={{width: 50}}></div>
            </div>
            <div className={"info-card"}>
                <div className={"emblem-small"}>
                    <div className={"pentagon-1"}></div>
                    <div className={"pentagon-2"}></div>
                    <div className={"gor-line"}></div>
                    <span className={"black-600-18 digit"}>100</span>

                </div>
                <div className={"info"}>
                    <span className={"black-600-18"}>{player.username}</span>
                    <div className={"cells"}>
                        <div className={"cell"}>
                            <span className={"black-700-28"}>11</span>
                            <span className={"black-600-18"}>ПОБ</span>
                        </div>
                        <div className={"border"}></div>
                        <div className={"cell"}>
                            <span className={"black-700-28"}>11</span>
                            <span className={"black-600-18"}>ИГР</span>
                        </div>
                        <div className={"border"}></div>
                        <div className={"cell"}>
                            <span className={"black-700-28"}>11</span>
                            <span className={"black-600-18"}>ПОР</span>
                        </div>
                        <div className={"border"}></div>
                        <div className={"cell"}>
                            <span className={"black-700-28"}>11</span>
                            <span className={"black-600-18"}>ГОЛ</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
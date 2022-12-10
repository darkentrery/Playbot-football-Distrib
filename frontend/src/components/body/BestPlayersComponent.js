


export default function BestPlayersComponent () {

    return (
        <div className={"body-players"}>
            <div className={"players-table"}>
                <div className={"table-head"}>
                    <span className={"elem elem-1"}>Топ игроков</span>
                    <span className={"elem elem-2"}>Рейтинг</span>
                    <span className={"elem elem-3"}>% побед</span>
                    <span className={"elem elem-4"}>Количество игр</span>
                    <span className={"elem elem-5"}>Забитых мячей</span>
                    <span className={"elem elem-6"}>Изменение рейтинга</span>
                </div>

                <div className={"table-head-376"}>
                    <span className={"elem elem-1"}>Топ игроков</span>
                    <span className={"elem elem-2"}>Рейтинг</span>
                    <span className={"elem elem-3"}>% побед</span>
                    <span className={"elem elem-4"}>Количество игр</span>
                    <span className={"elem elem-5"}>Забитых мячей</span>
                    <span className={"elem elem-6"}>Изменение рейтинга</span>
                </div>


                <div className={"player"}>
                    <span className={"elem elem-1 player-avatar-icon"}>1. <span className={"name"}>Андрей Иванов</span></span>
                    <span className={"elem elem-2"}>354<span className={"green"}>&nbsp;+11</span></span>
                    <span className={"elem elem-3 green"}>10/10</span>
                    <span className={"elem elem-4 gray"}>88,9</span>
                    <span className={"elem elem-5 "}>27</span>
                    <span className={"elem elem-6 rank-icon"}></span>
                </div>


                <div className={"player-376"}>
                    <div className={"row row-1"}>
                        <span className={"elem elem-1 point-icon"}>Футбол с коллегами<span className={"gray"}>12:00</span></span>
                        <span className={"elem elem-2 red"}>10/10</span>
                        <span className={"elem elem-3 orange"}>88,9</span>
                    </div>
                    <div className={"row row-2"}>
                        <span className={"elem elem-1 map-point-icon"}>ул. Садово-Кудринская, 19 стр. 1</span>
                    </div>
                </div>
                <div className={"player-376"}>
                    <div className={"row row-1"}>
                        <span className={"elem elem-1 star-icon"}>Футбол с коллегами<span className={"gray"}>12:00</span></span>
                        <span className={"elem elem-2 red"}>10/10</span>
                        <span className={"elem elem-3 orange"}>88,9</span>
                    </div>
                    <div className={"row row-2"}>
                        <span className={"elem elem-1 map-point-icon"}>ул. Садово-Кудринская, 19 стр. 1</span>
                    </div>
                </div>
            </div>


        </div>
    )
}



export default function EventsComponent () {

    return (
        <div className={"body-events"}>
            <div className={"title"}>
                <span className={"t-1"}>Список событий</span>
                <div className={"t-2"}>
                    <span>Смотреть все</span>
                    <div className={"orange-right-arrow-icon"}></div>
                </div>
            </div>
            <div className={"location"}>
                <span className={"elem country"}>Россия</span>
                <span className={"elem city"}>Санкт-Петербург</span>
            </div>
            <div className={"events-table"}>
                <div className={"table-head"}>
                    <span className={"elem elem-1"}>Название</span>
                    <span className={"elem elem-2"}>Место проведения и дата начала</span>
                    <span className={"elem elem-3"}>Кол-во участников</span>
                    <span className={"elem elem-4"}>Средний рейтинг</span>
                    <span className={"elem elem-5 gray-right-arrow-icon"}></span>
                </div>
                <div className={"date"}>
                    <span className={"bold"}>12 мая <span>(вторник)</span></span>
                </div>
                <div className={"event"}>
                    <span className={"elem elem-1 point-icon"}>Футбол с коллегами</span>
                    <span className={"elem elem-2"}>ул. Тверская, 22 стр. 1<span className={"time"}>Событие началось, в 12:00</span></span>
                    <span className={"elem elem-3 green"}>10/10</span>
                    <span className={"elem elem-4 gray"}>88,9</span>
                    <span className={"elem elem-5 gray-right-arrow-icon"}></span>
                </div>
                <div className={"event"}>
                    <span className={"elem elem-1 star-icon"}>Футбол с коллегами</span>
                    <span className={"elem elem-2"}>ул. Тверская, 22 стр. 1<span className={"time"}>Событие началось, в 12:00</span></span>
                    <span className={"elem elem-3 red"}>10/10</span>
                    <span className={"elem elem-4 orange"}>88,9</span>
                    <span className={"elem elem-5 gray-right-arrow-icon"}></span>
                </div>
            </div>


        </div>
    )
}
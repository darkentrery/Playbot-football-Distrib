


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

            </div>


        </div>
    )
}
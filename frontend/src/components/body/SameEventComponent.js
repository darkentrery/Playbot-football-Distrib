import {getMonth} from "../../utils/dates";


export const SameEventComponent = ({
    event,
    className='',
}) => {
    let date = new Date();
    if (event) {
        date = new Date(event.date);
    }

    return (
        <div className={`same-event-component ${className}`}>
            <div className={"elem elem-1"}>
                <div className={"el el-1"}>
                    <div className={"time"}>
                        <div className={"orange-clock-icon"}></div>
                        <span className={"black-600-14"}>{date.getDate()} {getMonth(date)}, {event ? event.time_begin.slice(0, 5) : ''}</span>
                    </div>
                    <div className={"star-icon"}></div>
                </div>
                <span className={"el el-2 black-600-20"}>Дворовый турнир Тверская</span>
                <span className={"el el-3 black-400-16"}>ЦАО, ул. Тверская, 22 стр. 1</span>
            </div>
            <div className={"elem elem-2"}>
                <span className={"el dark-gray-avatar-icon dark-gray-400-12"}>Участники: {event ? event.event_player.length : ''}/{event.count_players}</span>
                <span className={"el dark-gray-cup-icon dark-gray-400-12"}>Средний рейтинг: 78,8</span>
            </div>
        </div>
    )
}
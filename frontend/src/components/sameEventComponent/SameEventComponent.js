import {getMonth} from "../../utils/dates";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import BaseRoutes from "../../routes/BaseRoutes";


export const SameEventComponent = ({
    event,
    className='',
}) => {
    const [date, setDate] = useState(false);

    useEffect(() => {
        if (event) {
            let date = new Date(event.date);
            setDate(`${date.getDate()} ${getMonth(date)}, ${event.time_begin.slice(0, 5)}`);
        }
    }, [event])

    return (
        <Link className={`same-event-component ${className}`} to={BaseRoutes.eventLink(event.id)}>
            {event && <>
                <div className={"elem elem-1"}>
                    <div className={"el el-1"}>
                        <div className={"time"}>
                            <div className={"orange-clock-icon"}></div>
                            <span className={"black-600-14"}>{date}</span>
                        </div>
                        <div className={"star-icon"}></div>
                    </div>
                    <span className={"el el-2 black-600-20"}>{event.name}</span>
                    <span className={"el el-3 black-400-16"}>{event.field.address.c_c_s_h_string}</span>
                </div>
                <div className={"elem elem-2"}>
                    <span className={"el dark-gray-avatar-icon dark-gray-400-12"}>Участники: {event.count_current_players}/{event.count_players}</span>
                    <span className={"el dark-gray-cup-icon dark-gray-400-12"}>Средний рейтинг: {event.rank}</span>
                </div>
            </>}
        </Link>
    )
}
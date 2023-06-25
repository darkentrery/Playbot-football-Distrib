import {getMonth, getShortWeekDay} from "../../utils/dates";
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
            setDate(`${date.getDate()} ${getMonth(date)} ${date.getFullYear()}, ${getShortWeekDay(date)}`);
        }
    }, [event])

    return (
        <Link className={`same-event-component ${className}`} to={BaseRoutes.eventLink(event.id)}>
            {event && <>
                <div className={"elem elem-1"}>
                    <div className={"el el-1"}>
                        <div className={"time"}>
                            <div className={"calendar-same-icon"}></div>
                            <span className={"black-600-14"}>{date}</span>
                        </div>
                        <div className={"new-star-icon"}></div>
                    </div>
                    <span className={"el el-2 black-600-16 same-event__title"}>{event.name}</span>
                    <span className={"el el-3 black-400-16 same-event__text"}>{event.field.address.c_c_s_h_string}</span>
                </div>
                <div className={"elem elem-2"}>
                    <span className={"el el-data-item dark-gray-600-14"}><span className="avatar-skeleton-icon"></span>{event.count_current_players}/{event.count_players}</span>
                    {/* <span className={"el el-data-item dark-gray-600-14 green-600-14"}><span className="trophy-icon"></span> новичок </span> */}
                </div>
            </>}
        </Link>
    )
}
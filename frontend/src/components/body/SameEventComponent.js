import {getMonth} from "../../utils/dates";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import BaseRoutes from "../../routes/BaseRoutes";


export const SameEventComponent = ({
    event,
    className='',
}) => {
    const [address, setAddress] = useState(false);
    const [date, setDate] = useState(false);

    useEffect(() => {
        if (event) {
            let address = {
                city: event.address && event.address.city ? event.address.city : '',
                street: event.address && event.address.street ? ', ' + event.address.street : '',
                house_number: event.address && event.address.house_number ? ', ' + event.address.house_number : '',
            }
            setAddress(`${address.city}${address.street}${address.house_number}`);
            let date = new Date(event.date);
            setDate(`${date.getDate()} ${getMonth(date)}, ${event.time_begin.slice(0, 5)}`);
        }
    }, [event])

    return (
        <Link className={`same-event-component ${className}`} to={BaseRoutes.eventLink(event.id)}>
            <div className={"elem elem-1"}>
                <div className={"el el-1"}>
                    <div className={"time"}>
                        <div className={"orange-clock-icon"}></div>
                        <span className={"black-600-14"}>{date}</span>
                    </div>
                    <div className={"star-icon"}></div>
                </div>
                <span className={"el el-2 black-600-20"}>{event.name}</span>
                <span className={"el el-3 black-400-16"}>{address}</span>
            </div>
            <div className={"elem elem-2"}>
                <span className={"el dark-gray-avatar-icon dark-gray-400-12"}>Участники: {event ? event.event_player.length : ''}/{event.count_players}</span>
                <span className={"el dark-gray-cup-icon dark-gray-400-12"}>Средний рейтинг: 78,8</span>
            </div>
        </Link>
    )
}
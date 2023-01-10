import {eventService} from "../../services/EventService";
import React, {useEffect, useState} from "react";
import BaseRoutes from "../../routes/BaseRoutes";
import {Link} from "react-router-dom";
import VisibleNoEvents from "../../redux/containers/VisibleNoEvents";
import {getMonth, getWeekDay} from "../../utils/dates";


export default function EventsComponent ({city, user}) {
    const [events, setEvents] = useState([]);
    const [firstRequest, setFirstRequest] = useState(0);

    useEffect(() => {
        if (user) {
            setFirstRequest(1);
            eventService.getEvents(user && user.city ? user.city : city).then((response) => {
                if (response.status === 200) {
                    let data = [];
                    response.data.map((item, key) => {
                        if (key === 0 || item.date !== response.data[key - 1].date) {
                            data.push({date: item.date, events: []});
                        }
                    })
                    response.data.map((item) => {
                        let address = {
                            country: item.address && item.address.country ? item.address.country : '',
                            city: item.address && item.address.city ? ', ' + item.address.city : '',
                            street: item.address && item.address.street ? ', ' + item.address.street : '',
                            house_number: item.address && item.address.house_number ? ', ' + item.address.house_number : '',
                        }
                        item.address = `${address.country}${address.city}${address.street}${address.house_number}`;
                        data.map((row) => {
                            if (row.date === item.date && !item.cancel) row.events.push(item);
                        })
                    })
                    console.log(data)
                    setEvents(data);
                    setFirstRequest(2);
                }
            })
        }
    }, [user])

    const EventRow = ({event}) => {
        return (<>
            <Link className={"event"} to={BaseRoutes.eventLink(event.id)}>
                <span className={`elem elem-1 ${event.event_step.length >= 1 ? 'point-icon' : ''}`}>{event.name}</span>
                <span className={"elem elem-2"}>{event.address}
                    <span className={"time"}>Событие {event.event_step.length >= 1 ? 'началось' : 'начнется'}, в {event.time_begin.slice(0, 5)}</span>
                </span>
                <span className={"elem elem-3 green"}>{event.event_player.length}/{event.count_players}</span>
                <span className={"elem elem-4 gray"}>88,9</span>
                <span className={"elem elem-5 gray-right-arrow-icon"}></span>
            </Link>
            <Link className={"event-376"} to={BaseRoutes.eventLink(event.id)}>
                <div className={"row row-1"}>
                    <span className={`elem elem-1 ${event.event_step.length >= 1 ? 'point-icon' : ''}`}>{event.name}
                        <span className={"gray"}>{event.time_begin.slice(0, 5)}</span>
                    </span>
                    <span className={"elem elem-2 red"}>{event.event_player.length}/{event.count_players}</span>
                    <span className={"elem elem-3 orange"}>88,9</span>
                </div>
                <div className={"row row-2"}>
                    <span className={"elem elem-1 map-point-icon"}>{event.address}</span>
                </div>
            </Link>
        </>)
    }

    const DateBlock = ({item}) => {
        if (item.events.length !== 0) {
            let date = new Date(item.date);
            return (<>
                <div className={"date"}>
                    <span className={"bold"}>{date.getDate()} {getMonth(date)} <span>({getWeekDay(date)})</span></span>
                </div>
                {item.events.map((row, r) => (<EventRow event={row} key={r}/>))}
            </>)
        }
    }
    
    return (
        <div className={"body-events"}>
            {!events.length && firstRequest === 2 && <VisibleNoEvents/>}

            {events.length !== 0 &&
                <div className={"events-table"}>
                    <div className={"table-head"}>
                        <span className={"elem elem-1"}>Название</span>
                        <span className={"elem elem-2"}>Место проведения и дата начала</span>
                        <span className={"elem elem-3"}>Кол-во участников</span>
                        <span className={"elem elem-4"}>Средний рейтинг</span>
                        <span className={"elem elem-5 gray-right-arrow-icon"}></span>
                    </div>

                    <div className={"table-head-376"}>
                        <span className={"elem elem-1"}>Событие</span>
                        <span className={"elem elem-2"}>Кол-во уч.</span>
                        <span className={"elem elem-3"}>Рейтинг</span>
                    </div>

                    {events.map((item, key) => (<DateBlock item={item} key={key}/>))}
                </div>
            }
        </div>
    )
}
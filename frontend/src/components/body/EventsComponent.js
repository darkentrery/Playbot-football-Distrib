import {eventService} from "../../services/EventService";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import VisibleNoEvents from "../../redux/containers/VisibleNoEvents";
import {getMonth, getWeekDay} from "../../utils/dates";
import {EventItem376Component} from "../eventItem376Component/EventItem376Component";
import {getAddressStringFormat} from "../../services/LocationService";
import EventRoutes from "../../routes/EventRoutes";


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
                        data.map((row) => {
                            if (row.date === item.date && !item.cancel) row.events.push(item);
                        })
                    })
                    let newData = [];
                    data.map((row) => {
                        if (row.events.length) {
                            newData.push(row);
                        }
                    })
                    setEvents(newData);
                    setFirstRequest(2);
                }
            })
        }
    }, [user])

    const EventRow = ({event}) => {
        const [color, setColor] = useState('');
        const [address, setAddress] = useState('');
        const [isEnd, setIsEnd] = useState(false);

        useEffect(() => {
            if (event) {
                setAddress(getAddressStringFormat(event.address));
                let percent = event.event_player.length / event.count_players;
                if (event.time_end) {
                    setIsEnd(true);
                    setColor('gray');
                } else {
                    setIsEnd(false);
                    if (percent > 0.8) {
                        setColor('red');
                    } else if (percent > 0.5 && percent <= 0.8) {
                        setColor('yellow');
                    } else {
                        setColor('green');
                    }
                }
            }

        }, [event])

        return (<>
            <Link className={"event"} to={EventRoutes.eventLink(event.id)}>
                <span className={`elem elem-1 ${isEnd ? 'gray-400-13' : 'black-400-13'}`}>
                    {eventService.isFavorite(user, event) && <div className={"star-icon"}></div>}
                    {event.event_step.length >= 1 && !isEnd && <div className={"pulse-yellow-point"}></div>}
                    {event.name}
                </span>
                <span className={`elem elem-2 ${isEnd ? 'gray-400-13' : 'black-400-13'}`}>
                    {address}
                    {!isEnd && <span className={"gray-400-13"}>{event.event_step.length >= 1 ? '' : 'Событие начнется в, '}{event.time_begin.slice(0, 5)}</span>}
                    {isEnd && <span className={"gray-400-13"}>Событие завершено</span>}
                </span>
                {!isEnd && <span className={`elem elem-3 ${event.is_paid ? 'black-400-13' : 'gray-400-13'}`}>{event.is_paid ? event.price + ' р.' : 'Бесплатно'}</span>}
                {isEnd && <span className={`elem elem-3 gray-400-13`}>{event.is_paid ? event.price + ' р.' : 'Бесплатно'}</span>}
                <span className={`elem elem-4 ${isEnd ? 'gray-400-13' : 'black-400-13'} ${color}`}>{event.event_player.length}/{event.count_players}</span>
                <span className={`elem elem-5 ${isEnd ? 'gray-400-13' : 'black-400-13'}`}>{event.rank.toFixed(1).replace('.', ',')}</span>
                <span className={"elem elem-6 gray-right-arrow-icon"}></span>
            </Link>
            <EventItem376Component event={event} isFavorite={eventService.isFavorite(user, event)}/>
        </>)
    }

    const DateBlock = ({item}) => {
        if (item.events.length) {
            let date = new Date(item.date);
            return (<>
                <div className={"date"}>
                    <span className={"black-600-16"}>{date.getDate()} {getMonth(date)} <span className={"black-400-16"}>({getWeekDay(date)})</span></span>
                </div>
                {item.events.map((row, r) => (<EventRow event={row} key={r}/>))}
            </>)
        }
    }
    
    return (
        <div className={"events-component"}>
            {!events.length && firstRequest === 2 && <VisibleNoEvents/>}

            {events.length !== 0 &&
                <div className={"events-table"}>
                    <div className={"table-head"}>
                        <span className={"elem elem-1 gray-400-13"}>Название</span>
                        <span className={"elem elem-2 gray-400-13"}>Место проведения и дата начала</span>
                        <span className={"elem elem-3 gray-400-13"}>Стоимость  участия</span>
                        <span className={"elem elem-4 gray-400-13"}>Кол-во участников</span>
                        <span className={"elem elem-5 gray-400-13"}>Средний рейтинг</span>
                        <span className={"elem elem-6"}></span>
                    </div>

                    <div className={"table-head-376"}>
                        <span className={"elem elem-1 gray-400-13"}>Событие</span>
                        <span className={"elem elem-2 avatar-icon disabled"}></span>
                        <span className={"elem elem-3 gray-cup-icon"}></span>
                    </div>

                    {events.map((item, key) => (<DateBlock item={item} key={key}/>))}
                </div>
            }
        </div>
    )
}
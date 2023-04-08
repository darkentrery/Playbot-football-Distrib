import {eventService} from "../../services/EventService";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import VisibleNoEvents from "../../redux/containers/VisibleNoEvents";
import {getLocalTime, getMonth, getWeekDay} from "../../utils/dates";
import {EventItem376Component} from "../eventItem376Component/EventItem376Component";
import {getAddressStringFormat} from "../../services/LocationService";
import EventRoutes from "../../routes/EventRoutes";
import {LoaderComponent} from "../loaderComponent/LoaderComponent";


export default function EventsComponent ({city, user, isAuth}) {
    const [events, setEvents] = useState([]);
    const [firstRequest, setFirstRequest] = useState(0);

    useEffect(() => {
        setFirstRequest(1);
        if (isAuth !== null) {
            eventService.getEvents(user && user.address ? user.address.city : city).then((response) => {
                if (response.status === 200) {
                    let data = [];
                    response.data.forEach((item, key) => {
                        if (key === 0 || item.date !== response.data[key - 1].date) {
                            data.push({date: item.date, events: []});
                        }
                    })
                    response.data.forEach((item) => {
                        data.forEach((row) => {
                            let now = new Date(Date.now());
                            let eventDate = new Date(row.date);
                            eventDate.setDate(eventDate.getDate() + 1);
                            if (row.date === item.date && !item.cancel && now < eventDate) {
                                row.events.push(item);
                            }
                        })
                    })
                    let newData = [];
                    data.forEach((row) => {
                        if (row.events.length) {
                            row.events.sort((a, b) => {
                                if (a.is_end && !b.is_end) {
                                    return 1;
                                } else {
                                    return -1;
                                }
                            })
                            newData.push(row);
                        }
                    })
                    setEvents(data);
                    setFirstRequest(2);
                }
            })
        }
    }, [user, isAuth, city])

    const EventRow = ({event}) => {
        const [color, setColor] = useState('');
        const [address, setAddress] = useState('');

        useEffect(() => {
            if (event) {
                setAddress(getAddressStringFormat(event.address));
                let percent = event.count_current_players / event.count_players;
                if (event.is_end) {
                    setColor('gray');
                } else {
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
                <span className={`elem elem-1 ${event.is_end ? 'gray-400-13' : 'black-400-13'}`}>
                    {user !== false && eventService.isFavorite(user, event) && <div className={"yellow-star-icon"}></div>}
                    {event.is_begin && !event.is_end && <div className={"pulse-yellow-point"}></div>}
                    {event.name}
                </span>
                <span className={`elem elem-2 ${event.is_end ? 'gray-400-13' : 'black-400-13'}`}>
                    {address}
                    {!event.is_end && <span className={"gray-400-13"}>{event.is_begin ? '' : 'Событие начнется в, '}{getLocalTime(event.time_begin)}</span>}
                    {event.is_end && <span className={"gray-400-13"}>Событие завершено</span>}
                </span>
                {!event.is_end && <span className={`elem elem-3 ${event.is_paid ? 'black-400-13' : 'gray-400-13'}`}>{event.is_paid ? event.price + ' р.' : 'Бесплатно'}</span>}
                {event.is_end && <span className={`elem elem-3 gray-400-13`}>{event.is_paid ? event.price + ' р.' : 'Бесплатно'}</span>}
                <span className={`elem elem-4 ${event.is_end ? 'gray-400-13' : 'black-400-13'} ${color}`}>{event.count_current_players}/{event.count_players}</span>
                <span className={`elem elem-5 ${event.is_end ? 'gray-400-13' : 'black-400-13'}`}>{event.rank.toFixed(2).replace('.', ',')}</span>
                <span className={"elem elem-6 gray-right-arrow-icon"}></span>
            </Link>
            <EventItem376Component event={event} isFavorite={user !== false ? eventService.isFavorite(user, event) : false}/>
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
        <div className={`events-component ${!events.length && firstRequest !== 2 ? 'loader' : ''}`}>
            {!events.length && firstRequest === 2 && <VisibleNoEvents/>}
            {!events.length && firstRequest !== 2 && <LoaderComponent/>}

            {!!events.length &&
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
import {eventService} from "../../services/EventService";
import React, {useEffect, useState} from "react";
import BaseRoutes from "../../routes/BaseRoutes";
import {Link} from "react-router-dom";
import VisibleNoEvents from "../../redux/containers/VisibleNoEvents";
import {getMonth, getWeekDay} from "../../utils/dates";
import {EventItem376Component} from "../eventItem376Component/EventItem376Component";


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

        useEffect(() => {
            if (event) {
                if (typeof event.address !== "string") {
                    let newAddress = {
                        country: event.address && event.address.country ? event.address.country : '',
                        city: event.address && event.address.city ? event.address.city : '',
                        street: event.address && event.address.street ? event.address.street : '',
                        house_number: event.address && event.address.house_number ? event.address.house_number : '',
                    }
                    let array = [];
                    // if (fullAddress) {
                    //     if (newAddress.country) array.push(newAddress.country);
                    //     if (newAddress.city) array.push(newAddress.city);
                    // }
                    if (newAddress.street) array.push(newAddress.street);
                    if (newAddress.house_number) array.push(newAddress.house_number);
                    setAddress(array.join(", "));
                }
                let percent = event.event_player.length / event.count_players;
                if (percent > 0.8) {
                    setColor('red');
                } else if (percent > 0.5 && percent <= 0.8) {
                    setColor('yellow');
                } else {
                    setColor('green');
                }
            }

        }, [event])

        return (<>
            <Link className={"event"} to={BaseRoutes.eventLink(event.id)}>
                <span className={`elem elem-1 black-400-13`}>
                    {event.event_step.length >= 1 && <div className={"pulse-yellow-point"}></div>}
                    {event.name}
                </span>
                <span className={"elem elem-2 black-400-13"}>
                    {address}
                    <span className={"gray-400-13"}>{event.event_step.length >= 1 ? '' : 'Событие начнется в, '}{event.time_begin.slice(0, 5)}</span>
                </span>
                <span className={`elem elem-3 ${event.is_paid ? 'black-400-13' : 'gray-400-13'}`}>{event.is_paid ? event.price + ' р.' : 'Бесплатно'}</span>
                <span className={`elem elem-4 black-400-13 ${color}`}>{event.event_player.length}/{event.count_players}</span>
                <span className={"elem elem-5 black-400-13 gray"}>{event.rank.toFixed(1).replace('.', ',')}</span>
                <span className={"elem elem-6 black-400-13 gray-right-arrow-icon"}></span>
            </Link>
            <EventItem376Component event={event}/>
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
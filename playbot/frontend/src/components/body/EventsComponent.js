import EventService from "../../services/EventService";
import React, {useEffect, useState} from "react";
import NoEventsComponent from "./NoEventsComponent";
import BaseRoutes from "../../routes/BaseRoutes";
import {Link} from "react-router-dom";


export default function EventsComponent () {
    const eventService = new EventService();
    const [events, setEvents] = useState([]);

    useEffect(() => {
        if (!events.length) {
            eventService.getEvents().then((response) => {
                if (response.status === 200) {
                    let data = [];
                    response.data.map((item, key) => {
                        if (key === 0 || item.date !== response.data[key - 1].date) {
                            data.push({date: new Date(item.date)})
                        }
                        data.push({event: item})
                    })
                    setEvents(data);
                }
            })
        }
    }, [events])

    const monthsNames = [
       'января',
       'февраля',
       'марта',
       'апреля',
       'мая',
       'июня',
       'июля',
       'августа',
       'сентября',
       'октября',
       'ноября',
       'декабря',
    ];

    const weekDay = [
        "воскресенье",
        "понеделльник",
        "вторник",
        "среда",
        "четверг",
        "пятница",
        "суббота",
    ]
    
    return (
        <div className={"body-events"}>
            {!events.length && <NoEventsComponent/>}

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

                    {events.length && events.map((item, key) => {
                        let date = item.date;
                        if (item.date) {
                            return (
                                <div className={"date"} key={key}>
                                    <span className={"bold"}>{date.getDate()} {monthsNames[date.getMonth()]} <span>({weekDay[date.getDay()]})</span></span>
                                </div>
                            )
                        } else {
                            let event = item.event;
                            let path = '';
                            if (!window.location.pathname.includes("events")) path = 'events/'
                            return (
                                <div className={"event"} key={key}>
                                    <Link className={"elem elem-1 point-icon"} to={path + BaseRoutes.eventLink(event.id)}>{event.name}</Link>
                                    <span className={"elem elem-2"}>{event.address}<span className={"time"}>Событие началось, в 12:00</span></span>
                                    <span className={"elem elem-3 green"}>10/{event.count_players}</span>
                                    <span className={"elem elem-4 gray"}>88,9</span>
                                    <span className={"elem elem-5 gray-right-arrow-icon"}></span>
                                </div>
                            )
                        }
                    })}

                    {events.length && events.map((item, key) => {
                        let date = item.date;
                        if (item.date) {
                            return (
                                <div className={"date-376"} key={key}>
                                    <span className={"bold"}>{date.getDate()} {monthsNames[date.getMonth()]} <span>({weekDay[date.getDay()]})</span></span>
                                </div>
                            )
                        } else {
                            let event = item.event;
                            let path = '';
                            if (!window.location.pathname.includes("events")) path = 'events/'
                            return (
                                <div className={"event-376"} key={key}>
                                    <div className={"row row-1"}>
                                        <Link className={"elem elem-1 point-icon"} to={path + BaseRoutes.eventLink(event.id)}>{event.name}<span className={"gray"}>12:00</span></Link>
                                        <span className={"elem elem-2 red"}>10/{event.count_players}</span>
                                        <span className={"elem elem-3 orange"}>88,9</span>
                                    </div>
                                    <div className={"row row-2"}>
                                        <span className={"elem elem-1 map-point-icon"}>{event.address}</span>
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>
            }
        </div>
    )
}
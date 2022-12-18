import React from "react-dom";
import {getMonth, getWeekDay} from "../../utils/dates";
import {ButtonsBoardOrganizerComponent} from "./ButtonsBoardOrganizerComponent";
import {ButtonsBoardPlayerComponent} from "./ButtonsBoardPlayerComponent";
import {useEffect, useState} from "react";


export default function BoardEventComponent ({event, user, funcs}) {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        if (event) setDate(new Date(event.date));
    }, [event])

    return (
        <div className={"board-event-component"}>
            <div className={"board-event-1280"}>
                <div className={"elem elem-1"}>
                    <span className={"el el-1 dark-gray-cup-icon"}>78,8</span>
                    <span className={"el el-2 dark-gray-avatar-icon"}>{event ? event.event_player.length : ''}/{event.count_players}</span>
                    <span className={"el el-3 dark-gray-star-icon"}>В избранное</span>
                </div>
                <span className={"elem elem-2"}>{event.name}</span>
                <span className={"elem elem-3"}>{event && event.event_step.length >= 1 ? 'Событие началось.' : ''} {date.getDate()} {getMonth(date)} {date.getFullYear()}, {event ? event.time_begin.slice(0, 5) : ''} {getWeekDay(date)}</span>
                {event && user.isAuth && event.organizer.id === user.user.id && <ButtonsBoardOrganizerComponent event={event} funcs={funcs}/>}
                {event && !user.isAuth && <ButtonsBoardPlayerComponent className={"elem elem-4"} event={event} user={user} funcs={funcs}/>}
                {event && user.isAuth && event.organizer.id !== user.user.id && <ButtonsBoardPlayerComponent className={"elem elem-4"} event={event} user={user} funcs={funcs}/>}
            </div>

            <div className={"board-event-376"}>
                <div className={"elem elem-1"}>
                    <span className={"el el-1 dark-gray-cup-icon"}>78,8</span>
                    <span className={"el el-2 dark-gray-avatar-icon"}>{event ? event.event_player.length : ''}/{event.count_players}</span>
                    <span className={"el el-3 dark-gray-message-icon"}>8</span>
                    <span className={"el el-4 dark-gray-star-icon"}></span>
                </div>
                <span className={"elem elem-2"}>{event.name}</span>
                <span className={"elem elem-3"}>{event && event.event_step.length >= 1 ? 'Событие началось.' : ''} {date.getDate()} {getMonth(date)} {date.getFullYear()}, {event ? event.time_begin.slice(0, 5) : ''} {getWeekDay(date)}</span>
                {event && user.isAuth && event.organizer.id === user.user.id && <ButtonsBoardOrganizerComponent event={event} funcs={funcs}/>}
                {event && !user.isAuth && <ButtonsBoardPlayerComponent className={"elem elem-4"} event={event} user={user} funcs={funcs}/>}
                {event && user.isAuth && event.organizer.id !== user.user.id && <ButtonsBoardPlayerComponent className={"elem elem-4"} event={event} user={user} funcs={funcs}/>}
            </div>
        </div>
    )
}
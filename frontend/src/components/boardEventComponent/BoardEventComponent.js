import React from "react-dom";
import {getLocalTime, getMonth, getWeekDay} from "../../utils/dates";
import {ButtonsBoardOrganizerComponent} from "../body/ButtonsBoardOrganizerComponent";
import {ButtonsBoardPlayerComponent} from "../body/ButtonsBoardPlayerComponent";
import {useEffect, useState} from "react";
import {authDecoratorWithoutLogin} from "../../services/AuthDecorator";
import {eventService} from "../../services/EventService";


export default function BoardEventComponent ({event, user, funcs}) {
    const [isFavorite, setIsFavorite] = useState(false);
    const [date, setDate] = useState(new Date());
    const [isTooltip, setIsTooltip] = useState(false);
    const [tooltip, setTooltip] = useState(false);
    const [block, setBlock] = useState(false);

    useEffect(() => {
        if (event) setDate(new Date(event.date));
        if (user.user && event) setIsFavorite(eventService.isFavorite(user.user, event));
    }, [event, user])

    const addToFavorites = () => {
        if (user.isAuth && !block) {
            if (!isTooltip) {
                setIsTooltip(true);
                setTooltip(isFavorite ? 'Удалено из избранного!' : 'Добавлено в избранное!')
                setTimeout(() => {
                    setIsTooltip(false);
                }, 1000)
            }
            setBlock(true);
            if (isFavorite) {
                setIsFavorite(false);
                authDecoratorWithoutLogin(eventService.removeFromFavorites, {'id': event.id}).then((response) => {
                    if (response.status === 200) {
                        funcs.setAuth(true, response.data);
                        setBlock(false);
                    }
                })
            } else {
                setIsFavorite(true);
                authDecoratorWithoutLogin(eventService.addToFavorites, {'id': event.id}).then((response) => {
                    if (response.status === 200) {
                        funcs.setAuth(true, response.data);
                        setBlock(false);
                    }
                })
            }
        }
    }

    return (
        <div className={"board-event-component"}>
            {event && <>
                <span className={"elem-2-376 black-700-18"}>{event.name}</span>
                {!event.time_end && <span className={"elem-3-376 black-500-14"}>{date.getDate()} {getMonth(date)} {date.getFullYear()}, {getLocalTime(event.time_begin)} {getWeekDay(date)}</span>}
                {event.time_end && <span className={"elem-3-376 black-500-14"}>{date.getDate()} {getMonth(date)} {date.getFullYear()}, {getLocalTime(event.time_begin)} {getWeekDay(date)}</span>}
                <div className={"elem elem-1"}>
                    <span className={"el gray-wallet-icon black-400-16"}>{event.is_paid ? event.price + ' р.' : 'Бесплатно'}</span>
                    <span className={"el el-1 dark-gray-cup-icon black-400-16"}>{event.rank}</span>
                    <span className={"el el-2 dark-gray-avatar-icon black-400-16"}>{event.count_current_players}/{event.count_players}</span>
                    <span className={"el el-4 black-400-16 football-field-icon"}>{event.format_label}</span>
                    <span
                        className={`el el-3 el-1280 ${isFavorite ? 'yellow-star-icon' : 'dark-gray-star-icon'} black-400-16`}
                        onClick={addToFavorites}
                    >
                        {isFavorite ? 'В избранном' : 'В избранное'}
                    </span>
                    <span className={`el el-3 el-744 ${isFavorite ? 'yellow-star-icon' : 'dark-gray-star-icon'} black-400-16`} onClick={addToFavorites}></span>
                </div>
                <span className={"elem elem-2-1280 black-700-28"}>{event.name}</span>
                {!event.time_end && <span className={"elem elem-3-1280 black-500-18"}>{event.is_begin ? 'Событие началось.' : ''} {date.getDate()} {getMonth(date)} {date.getFullYear()}, {getLocalTime(event.time_begin)} {getWeekDay(date)}</span>}
                {event.time_end && <span className={"elem elem-3-1280 black-500-18"}>{'Событие закончилось.'} {date.getDate()} {getMonth(date)} {date.getFullYear()}, {getLocalTime(event.time_end)} {getWeekDay(date)}</span>}
                {user.isAuth && eventService.isOrganizer(event, user.user) ?
                    <ButtonsBoardOrganizerComponent event={event} funcs={funcs}/> :
                    <ButtonsBoardPlayerComponent className={"elem elem-4"} event={event} user={user} funcs={funcs}/>}
                <span className={`tooltip ${isTooltip ? '' : 'hidden'}`}>{tooltip}</span>
            </>}
        </div>
    )
}
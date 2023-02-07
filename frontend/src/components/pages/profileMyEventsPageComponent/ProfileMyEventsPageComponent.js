import VisibleProfileWrapper from "../../../redux/containers/VisibleProfileWrapper";
import {CheckSliderComponent} from "../../checkSliderComponent/CheckSliderComponent";
import React, {useEffect, useState} from "react";
import EventRoutes from "../../../routes/EventRoutes";
import {Link} from "react-router-dom";
import {EventItem376Component} from "../../eventItem376Component/EventItem376Component";
import {NoEventsProfileComponent} from "../../noEventsProfileComponent/NoEventsProfileComponent";
import {Profile376MenuComponent} from "../../profile376MenuComponent/Profile376MenuComponent";
import {ProfileTableBarComponent} from "../../profileTableBarComponent/ProfileTableBarComponent";
import {getAddressStringFormat} from "../../../services/LocationService";
import {getStringDate} from "../../../utils/dates";


export const ProfileMyEventsPageComponent = ({
    player,
    user,
    funcs,
}) => {
    const [isOrganizer, setIsOrganizer] = useState(false);
    const types = ["Все события", "Игроки",]
    const [favorites, setFavorites] = useState(types[0]);

    const EventRow1280 = ({event}) => {
        const [address, setAddress] = useState('');

        useEffect(() => {
            if (event) {
                setAddress(getAddressStringFormat(event.address));
            }
        }, [event])

        return (
            <Link className={"event-row-1280"} to={EventRoutes.eventLink(event.id)}>
                <span className={"elem elem-1 black-400-13"}>{event.name}</span>
                <div className={"elem elem-2"}>
                    <span className={"black-400-13"}>{address}</span>
                    <span className={"gray-400-13"}>{getStringDate(event.date)} в {event.time_begin.slice(0, 5)}</span>
                </div>
                <span className={"elem elem-3 gray-400-13"}>{event.is_paid ? event.price + ' р.' : 'Бесплатно'}</span>
                <span className={"elem elem-4 gray-400-13"}>{event.event_player.length}/{event.count_players}</span>
                <span className={"elem elem-5 gray-400-13"}>{event.rank.toFixed(1).replace('.', ',')}</span>
            </Link>
        )
    }

    const EventRow = ({event}) => {
        return (<>
            <EventRow1280 event={event}/>
            <EventItem376Component event={event}/>
        </>)
    }

    return (
        <VisibleProfileWrapper>
            {player && user && <div className={`profile-my-events-page-component`}>
                <Profile376MenuComponent pk={user.id}/>
                <ProfileTableBarComponent value={favorites} setValue={setFavorites} values={types}>
                    <CheckSliderComponent text={"Я организатор"} value={isOrganizer} setValue={setIsOrganizer}
                                          sizingClass={"elem-2"}/>
                </ProfileTableBarComponent>
                <div className={"table-head-1280"}>
                    <span className={"elem elem-1 gray-400-13"}>Название</span>
                    <span className={"elem elem-2 gray-400-13"}>Место проведения и дата начала</span>
                    <span className={"elem elem-3 gray-400-13"}>Стоимость участия</span>
                    <span className={"elem elem-4 gray-400-13"}>Кол-во участников</span>
                    <span className={"elem elem-5 gray-400-13"}>Средний рейтинг</span>
                </div>
                <div className={"table-head-744"}>
                    <span className={"elem elem-1 gray-400-13"}>Событие</span>
                    <div className={"elem elem-2 avatar-icon disabled"}></div>
                    <div className={"elem elem-3 gray-cup-icon"}></div>
                </div>
                {player && <div className={"table-body"}>
                    {!isOrganizer && player.event_player.length !== 0 && player.event_player.map((event, key) => (
                        <EventRow event={event.event} key={key}/>)
                    )}
                    {isOrganizer && player.event.length !== 0 && player.event.map((event, key) => (
                        <EventRow event={event} key={key}/>
                    ))}
                    {!isOrganizer && player.event_player.length === 0 &&
                        <NoEventsProfileComponent openCreateEvent={funcs.openCreateEvent}/>}
                    {isOrganizer && player.event.length === 0 &&
                        <NoEventsProfileComponent openCreateEvent={funcs.openCreateEvent}/>}
                </div>}
            </div>}
        </VisibleProfileWrapper>
    )
}
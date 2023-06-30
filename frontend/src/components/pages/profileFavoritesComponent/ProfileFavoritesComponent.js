import VisibleProfileWrapper from "../../../redux/containers/VisibleProfileWrapper";
import React, {useEffect, useState} from "react";
import EventRoutes from "../../../routes/EventRoutes";
import {Link} from "react-router-dom";
import {EventItem376Component} from "../../eventItem376Component/EventItem376Component";
import {Profile376MenuComponent} from "../../profile376MenuComponent/Profile376MenuComponent";
import {getAddressStringFormat} from "../../../services/LocationService";
import {eventService} from "../../../services/EventService";
import {getLocalTime, getStringDate} from "../../../utils/dates";
import {ProfileTableBarComponent} from "../../profileTableBarComponent/ProfileTableBarComponent";
import {LoaderComponent} from "../../loaderComponent/LoaderComponent";


export const ProfileFavoritesComponent = ({
    player,
    user,
    funcs,
}) => {
    const types = ["События", "Игроки",]
    const [favorites, setFavorites] = useState(types[0]);

    const EventRow1280 = ({event}) => {
        const [color, setColor] = useState('');
        const [address, setAddress] = useState('');
        const [isEnd, setIsEnd] = useState(false);

        useEffect(() => {
            if (event) {
                setAddress(getAddressStringFormat(event.address));
                let percent = event.count_current_players / event.count_players;
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

        return (user && event && <>
            <Link className={"event-row-1280"} to={EventRoutes.eventLink(event.id)}>
                <span className={`elem elem-2 ${isEnd ? 'gray-400-13' : 'black-400-13'}`}>
                    {address}
                    {<span className={isEnd ? 'gray-400-13' : 'black-400-13'}>{getStringDate(event.date)} в {getLocalTime(event.time_begin)}</span>}
                </span>
                {!isEnd && <span className={`elem elem-3 ${event.is_paid ? 'black-400-13' : 'gray-400-13'}`}>{event.is_paid ? event.price + ' р.' : 'Бесплатно'}</span>}
                {isEnd && <span className={`elem elem-3 gray-400-13`}>{event.is_paid ? event.price + ' р.' : 'Бесплатно'}</span>}
                <span className={`elem elem-4 ${isEnd ? 'gray-400-13' : 'black-400-13'} ${color}`}>{event.count_current_players}/{event.count_players}</span>
                <span className={`elem elem-5 ${isEnd ? 'gray-400-13' : 'black-400-13'}`}>{event.rank}</span>
            </Link>
            <EventItem376Component event={event} isFavorite={eventService.isFavorite(user, event)}/>
        </>)
    }

    return (
        <VisibleProfileWrapper>
            <div className={`profile-favorites-component ${!player || !user ? 'loader' : ''}`}>
                {user && player && <>
                    <Profile376MenuComponent pk={user.id}/>
                    <ProfileTableBarComponent value={favorites} setValue={setFavorites} values={types}/>
                    {favorites === types[0] && <>
                        <div className={"table-head-1280"}>
                            {/* <span className={"elem elem-1 gray-400-13"}>Название</span> */}
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
                            {player.favorite_events.map((event, key) => (<EventRow1280 event={event} key={key}/>))}
                        </div>}
                    </>}
                </>}
                {(!player || !user) && <LoaderComponent/>}
            </div>
        </VisibleProfileWrapper>
    )
}
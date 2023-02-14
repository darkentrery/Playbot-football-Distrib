import React, {useEffect, useRef, useState} from "react";
import {eventService} from "../../services/EventService";
import {EventItem376Component} from "../eventItem376Component/EventItem376Component";
import {PlayerRowComponent} from "../playerRowComponent/PlayerRowComponent";
import $ from "jquery";
import {authService} from "../../services/AuthService";


export const MainSearchComponent = ({
    className='',
    isOpen=true,
    setIsOpen = () => {},
    user,
    city,
}) => {
    const [events, setEvents] = useState([]);
    const [players, setPlayers] = useState([]);
    const [eventsView, setEventsView] = useState([]);
    const [eventsPastView, setEventsPastView] = useState([]);
    const [eventsFutureView, setEventsFutureView] = useState([]);
    const [playersView, setPlayersView] = useState([]);
    const ref = useRef()


    useEffect(() => {
        if (isOpen) {
            eventService.getEvents().then((response) => {
                if (response.status === 200) {
                    setEvents(response.data);
                }
            })
            authService.getUsers().then((response) => {
                if (response.status === 200) {
                    let array = [];
                    response.data.forEach((player) => {
                        if (player.event_player.length) array.push(player);
                    })
                    setPlayers(array);
                }
            })
        }
    }, [isOpen])

    const search = (e) => {
        let val = e.target.value;
        let array = [];
        let arrayPast = [];
        let arrayFuture = [];
        events.forEach((item) => {
            if (item.name.toLowerCase().includes(val.toLowerCase())) {
                if (item.is_end) {
                    arrayPast.push(item);
                } else if (item.is_begin && !item.is_end) {
                    array.push(item);
                } else {
                    arrayFuture.push(item);
                }
            }
        })
        setEventsView(array);
        setEventsPastView(arrayPast);
        setEventsFutureView(arrayFuture);
        array = [];
        players.forEach((item) => {
            if (item.username.toLowerCase().includes(val.toLowerCase())) array.push(item);
        })
        setPlayersView(array);
    }

    document.addEventListener('click', (e) => {
        if ($(e.target).closest('.main-search-component').length === 0) {
            if (playersView.length !== 0 || eventsView.length !== 0) {
                setPlayersView([]);
                setEventsView([]);
                setEventsFutureView([]);
                setEventsPastView([]);
            }
        }
    })

    return (
        <div className={`main-search-component ${className} ${isOpen ? '' : 'hidden'}`}>
            <input className={"search-field"} type="text" onChange={search} ref={ref}/>
            <div className={"btn-close"} onClick={() => setIsOpen(false)}></div>
            <div className={"orange-search-icon"}></div>
            <div className={`dropdown-menu-wrapper ${(!playersView.length && !eventsView.length && !eventsPastView.length) || !ref.current.value ? 'hidden' : ''}`}>
                <div className={"dropdown-menu scroll"}>
                    {!!eventsView.length && <div className={"dropdown-item label-item gray-400-13"}>LIVE – идут в данный момент</div>}
                    {eventsView.map((event, key) => (
                        <EventItem376Component event={event} key={key}/>
                    ))}
                    {!!eventsFutureView.length && <div className={"dropdown-item label-item gray-400-13"}>ПРЕДСТОЯЩИЕ</div>}
                    {eventsFutureView.map((event, key) => (
                        <EventItem376Component event={event} key={key}/>
                    ))}
                    {!!eventsPastView.length && <div className={"dropdown-item label-item gray-400-13"}>ЗАВЕРШЕННЫЕ</div>}
                    {eventsPastView.map((event, key) => (
                        <EventItem376Component event={event} key={key}/>
                    ))}
                    {!!playersView.length && <div className={"dropdown-item label-item gray-400-13"}>ИГРОКИ</div>}
                    {playersView.map((player, key) => (
                        <PlayerRowComponent player={player} key={key} className={"player-item"}/>
                    ))}
                </div>
            </div>
        </div>
    )
}
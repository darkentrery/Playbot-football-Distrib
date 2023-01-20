import React, {useEffect, useRef, useState} from "react";
import {eventService} from "../../services/EventService";
import {EventItem376Component} from "../eventItem376Component/EventItem376Component";
import {PlayerRowComponent} from "../playerRowComponent/PlayerRowComponent";
import $ from "jquery";


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
    const [playersView, setPlayersView] = useState([]);
    const ref = useRef()


    useEffect(() => {
        if (isOpen) {
            eventService.getEvents(user && user.city ? user.city : city).then((response) => {
                if (response.status === 200) {
                    setEvents(response.data);
                    let array = [];
                    response.data.map((event) => {
                        event.event_player.map((player) => {
                            if (!array.includes(player.player)) array.push(player.player);
                        })
                    })
                    array = array.filter((item, i) => {
                        if (i === 0) {
                            return true;
                        } else {
                            return item.id !== array[i - 1].id
                        }
                    })
                    setPlayers(array);
                }
            })
        }
    }, [isOpen])

    const search = (e) => {
        let val = e.target.value;
        let array = [];
        events.map((item, key) => {
            if (item.name.toLowerCase().includes(val.toLowerCase())) array.push(item);
        })
        setEventsView(array);
        array = [];
        players.map((item, key) => {
            if (item.username.toLowerCase().includes(val.toLowerCase())) array.push(item);
        })
        setPlayersView(array);
    }

    document.addEventListener('click', (e) => {
        if ($(e.target).closest('.main-search-component').length === 0) {
            if (playersView.length !== 0 || eventsView.length !== 0) {
                setPlayersView([]);
                setEventsView([]);
            }
        }
    })

    return (
        <div className={`main-search-component ${className} ${isOpen ? '' : 'hidden'}`}>
            <input className={"search-field"} type="text" onChange={search} ref={ref}/>
            <div className={"btn-close"} onClick={() => setIsOpen(false)}></div>
            <div className={"orange-search-icon"}></div>
            <div className={`dropdown-menu-wrapper ${playersView.length === 0 && eventsView.length === 0 || !ref.current.value ? 'hidden' : ''}`}>
                <div className={"dropdown-menu scroll"}>
                    {eventsView.length > 0 && <div className={"dropdown-item label-item gray-400-13"}>СОБЫТИЯ</div>}
                    {eventsView.map((event, key) => (
                        <EventItem376Component event={event} key={key}/>
                    ))}
                    {playersView.length > 0 && <div className={"dropdown-item label-item gray-400-13"}>ИГРОКИ</div>}
                    {playersView.map((player, key) => (
                        <PlayerRowComponent player={player} key={key} className={"player-item"}/>
                    ))}
                </div>
            </div>
        </div>
    )
}
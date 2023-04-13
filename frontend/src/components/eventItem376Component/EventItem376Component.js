import {Link} from "react-router-dom";
import BaseRoutes from "../../routes/BaseRoutes";
import React, {useEffect, useState} from "react";
import {getAddressStringFormat} from "../../services/LocationService";
import {getLocalTime} from "../../utils/dates";


export const EventItem376Component = ({event, isFavorite=false}) => {
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


    return (
        <Link className={`event-item-376-component`} to={BaseRoutes.eventLink(event.id)}>
            <div className={"row row-1"}>
                {isFavorite && <div className={"yellow-star-icon"}></div>}
                {event.is_begin && !event.is_end && <div className={"pulse-yellow-point"}></div>}
                <div className={`elem elem-1 ${event.is_end ? 'gray-400-13' : 'black-400-13'}`}>{event.name}
                    {!event.is_end && <span className={"gray-400-13"}>{getLocalTime(event.time_begin)}</span>}
                    {event.is_end && <span className={"gray-400-13"}>Событие завершено</span>}
                </div>
                <span className={`elem elem-2 ${event.is_end ? 'gray-400-13' : 'black-400-13'} ${color}`}>{event.count_current_players}/{event.count_players}</span>
                <span className={`elem elem-3 ${event.is_end ? 'gray-400-13' : 'black-400-13'}`}>{event.rank}</span>
            </div>
            <div className={"row row-2"}>
                <span className={`elem elem-1 map-point-icon ${event.is_end ? 'gray-400-13' : 'black-400-13'}`}>{address}</span>
            </div>
        </Link>
    )
}
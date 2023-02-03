import {Link} from "react-router-dom";
import BaseRoutes from "../../routes/BaseRoutes";
import React, {useEffect, useState} from "react";
import {getAddressStringFormat} from "../../services/LocationService";


export const EventItem376Component = ({event, isFavorite=false}) => {
    const [color, setColor] = useState('');
    const [address, setAddress] = useState('');
    const [isEnd, setIsEnd] = useState(false);

    useEffect(() => {
        if (event) {
            setAddress(getAddressStringFormat(event.address));
            let percent = event.event_player.length / event.count_players;
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


    return (
        <Link className={`event-item-376-component`} to={BaseRoutes.eventLink(event.id)}>
            <div className={"row row-1"}>
                {isFavorite && <div className={"star-icon"}></div>}
                {event.event_step.length >= 1 && !isEnd && <div className={"pulse-yellow-point"}></div>}
                <div className={`elem elem-1 ${isEnd ? 'gray-400-13' : 'black-400-13'}`}>{event.name}
                    {!isEnd && <span className={"gray-400-13"}>{event.time_begin.slice(0, 5)}</span>}
                    {isEnd && <span className={"gray-400-13"}>Событие завершено</span>}
                </div>
                <span className={`elem elem-2 ${isEnd ? 'gray-400-13' : 'black-400-13'} ${color}`}>{event.event_player.length}/{event.count_players}</span>
                <span className={`elem elem-3 ${isEnd ? 'gray-400-13' : 'black-400-13'}`}>{event.rank.toFixed(1).replace('.', ',')}</span>
            </div>
            <div className={"row row-2"}>
                <span className={`elem elem-1 map-point-icon ${isEnd ? 'gray-400-13' : 'black-400-13'}`}>{address}</span>
            </div>
        </Link>
    )
}
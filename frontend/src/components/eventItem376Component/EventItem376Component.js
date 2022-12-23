import {Link} from "react-router-dom";
import BaseRoutes from "../../routes/BaseRoutes";
import React, {useEffect, useState} from "react";


export const EventItem376Component = ({event}) => {
    const [address, setAddress] = useState(false);

    useEffect(() => {
        if (event) {
            let address = {
                country: event.address && event.address.country ? event.address.country : '',
                city: event.address && event.address.city ? ', ' + event.address.city : '',
                street: event.address && event.address.street ? ', ' + event.address.street : '',
                house_number: event.address && event.address.house_number ? ', ' + event.address.house_number : '',
            }
            setAddress(`${address.country}${address.city}${address.street}${address.house_number}`);
        }
    }, [event])

    return (
        <div className={`event-item-376-component`}>
            <div className={"row row-1"}>
                <Link className={`elem elem-1 black-400-13 ${event.event_step.length >= 1 ? 'point-icon' : ''}`} to={BaseRoutes.eventLink(event.id)}>{event.name}
                    <span className={"gray-400-13"}>{event.time_begin.slice(0, 5)}</span>
                </Link>
                <span className={"elem elem-2 red"}>{event.event_player.length}/{event.count_players}</span>
                <span className={"elem elem-3 orange"}>88,9</span>
            </div>
            <div className={"row row-2"}>
                <span className={"elem elem-1 map-point-icon black-400-13"}>{address}</span>
            </div>
        </div>
    )
}
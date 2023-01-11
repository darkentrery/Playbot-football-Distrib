import {Link} from "react-router-dom";
import BaseRoutes from "../../routes/BaseRoutes";
import React from "react";


export const EventItem376Component = ({event}) => {
    if (typeof event.address !== "string") {
        let address = {
            country: event.address && event.address.country ? event.address.country : '',
            city: event.address && event.address.city ? ', ' + event.address.city : '',
            street: event.address && event.address.street ? ', ' + event.address.street : '',
            house_number: event.address && event.address.house_number ? ', ' + event.address.house_number : '',
        }
        event.address = `${address.country}${address.city}${address.street}${address.house_number}`;
    }

    return (
        <Link className={`event-item-376-component`} to={BaseRoutes.eventLink(event.id)}>
            <div className={"row row-1"}>
                <div className={`elem elem-1 black-400-13 ${event.event_step.length >= 1 ? 'point-icon' : ''}`}>{event.name}
                    <span className={"gray-400-13"}>{event.time_begin.slice(0, 5)}</span>
                </div>
                <span className={"elem elem-2 red"}>{event.event_player.length}/{event.count_players}</span>
                <span className={"elem elem-3 orange"}>88,9</span>
            </div>
            <div className={"row row-2"}>
                <span className={"elem elem-1 map-point-icon black-400-13"}>{event.address}</span>
            </div>
        </Link>
    )
}
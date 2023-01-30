import {Link} from "react-router-dom";
import BaseRoutes from "../../routes/BaseRoutes";
import React, {useEffect, useState} from "react";


export const EventItem376Component = ({event, fullAddress=false}) => {
    const [color, setColor] = useState('');
    const [address, setAddress] = useState('');

    useEffect(() => {
        if (event) {
            if (typeof event.address !== "string") {
                let newAddress = {
                    country: event.address && event.address.country ? event.address.country : '',
                    city: event.address && event.address.city ? event.address.city : '',
                    street: event.address && event.address.street ? event.address.street : '',
                    house_number: event.address && event.address.house_number ? event.address.house_number : '',
                }
                let array = [];
                if (fullAddress) {
                    if (newAddress.country) array.push(newAddress.country);
                    if (newAddress.city) array.push(newAddress.city);
                }
                if (newAddress.street) array.push(newAddress.street);
                if (newAddress.house_number) array.push(newAddress.house_number);
                setAddress(array.join(", "));
            }
            let percent = event.event_player.length / event.count_players;
            if (percent > 0.8) {
                setColor('red');
            } else if (percent > 0.5 && percent <= 0.8) {
                setColor('yellow');
            } else {
                setColor('green');
            }
        }
    }, [event])


    return (
        <Link className={`event-item-376-component`} to={BaseRoutes.eventLink(event.id)}>
            <div className={"row row-1"}>
                {event.event_step.length >= 1 && <div className={"pulse-yellow-point"}></div>}
                <div className={`elem elem-1 black-400-13`}>{event.name}
                    <span className={"gray-400-13"}>{event.time_begin.slice(0, 5)}</span>
                </div>
                <span className={`elem elem-2 ${color}`}>{event.event_player.length}/{event.count_players}</span>
                <span className={"elem elem-3 orange"}>{event.rank.toFixed(1).replace('.', ',')}</span>
            </div>
            <div className={"row row-2"}>
                <span className={"elem elem-1 map-point-icon black-400-13"}>{address}</span>
            </div>
        </Link>
    )
}
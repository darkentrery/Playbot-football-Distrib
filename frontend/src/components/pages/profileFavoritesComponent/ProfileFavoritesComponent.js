import VisibleProfileWrapper from "../../../redux/containers/VisibleProfileWrapper";
import {CheckSliderComponent} from "../../checkSliderComponent/CheckSliderComponent";
import {useEffect, useState} from "react";
import EventRoutes from "../../../routes/EventRoutes";
import {Link} from "react-router-dom";
import {EventItem376Component} from "../../eventItem376Component/EventItem376Component";
import {Profile376MenuComponent} from "../../profile376MenuComponent/Profile376MenuComponent";


export const ProfileFavoritesComponent = ({
    player,
    user,
    funcs,
}) => {
    const [isOrganizer, setIsOrganizer] = useState(false);

    const EventRow1280 = ({event}) => {
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

        let date = new Date(event.date);

        return (
            <Link className={"event-row-1280"} to={EventRoutes.eventLink(event.id)}>
                <span className={"elem elem-1 black-400-13"}>{event.name}</span>
                <div className={"elem elem-2"}>
                    <span className={"black-400-13"}>{address}</span>
                    <span className={"gray-400-13"}>{date.getDate()}.{date.getMonth()}.{date.getFullYear().toString().slice(2,4)} в {event.time_begin.slice(0, 5)}</span>
                </div>
                <span className={"elem elem-3 gray-400-13"}>Стоимость участия</span>
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
            {player && <div className={`profile-favorites-component`}>
                <Profile376MenuComponent pk={user.id}/>
                <div className={"table-bar"}>
                    <div className={"elem elem-1"}>
                        <span className={"black-600-14"}>События</span>
                        <div className={"gray-down-arrow-icon"}></div>
                    </div>
                </div>
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
                    {!isOrganizer && player.favorite_events.map((event, key) => (<EventRow event={event} key={key}/>))}
                    {isOrganizer && player.favorite_events.map((event, key) => (<EventRow event={event} key={key}/>))}
                </div>}
            </div>}
        </VisibleProfileWrapper>
    )
}
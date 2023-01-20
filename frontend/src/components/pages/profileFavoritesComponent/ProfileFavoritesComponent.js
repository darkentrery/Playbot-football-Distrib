import VisibleProfileWrapper from "../../../redux/containers/VisibleProfileWrapper";
import {CheckSliderComponent} from "../../checkSliderComponent/CheckSliderComponent";
import {useState} from "react";
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
        let address = '';
        if (event.address) {
            address = {
                street: event.address.street ? event.address.street : '',
                house: event.address.house_number ? event.address.house_number : '',
            }
            address = `${address.street} ${address.house}`
        }
        let date = new Date(event.date);

        return (
            <Link className={"event-row-1280"} to={EventRoutes.eventLink(event.id)}>
                <span className={"elem elem-1 black-400-13"}>{event.name}</span>
                <div className={"elem elem-2"}>
                    <span className={"black-400-13"}>{address}</span>
                    <span className={"gray-400-13"}>{date.getDate()}.{date.getMonth()}.{date.getFullYear().toString().slice(2,4)} в {event.time_begin.slice(0, 5)}</span>
                </div>
                <span className={"elem elem-3 gray-400-13"}>Стоимость участия</span>
                <span className={"elem elem-4 gray-400-13"}>0/10</span>
                <span className={"elem elem-5 gray-400-13"}>88,9</span>
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
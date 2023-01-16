import VisibleProfileWrapper from "../../../redux/containers/VisibleProfileWrapper";
import {CheckSliderComponent} from "../../checkSliderComponent/CheckSliderComponent";
import {useState} from "react";
import EventRoutes from "../../../routes/EventRoutes";
import {Link} from "react-router-dom";


export const ProfileFavoritesComponent = ({
    player,
    user,
    funcs,
}) => {
    const [isOrganizer, setIsOrganizer] = useState(false);

    const EventRow = ({event}) => {
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
            <Link className={"event-row"} to={EventRoutes.eventLink(event.id)}>
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

    return (
        <VisibleProfileWrapper>
            <div className={`profile-favorites-component`}>
                <div className={"table-bar"}>
                    <div className={"elem elem-1"}>
                        <span className={"black-600-14"}>События</span>
                        <div className={"gray-down-arrow-icon"}></div>
                    </div>
                </div>
                <div className={"table-head"}>
                    <span className={"elem elem-1 gray-400-13"}>Название</span>
                    <span className={"elem elem-2 gray-400-13"}>Место проведения и дата начала</span>
                    <span className={"elem elem-3 gray-400-13"}>Стоимость участия</span>
                    <span className={"elem elem-4 gray-400-13"}>Кол-во участников</span>
                    <span className={"elem elem-5 gray-400-13"}>Средний рейтинг</span>
                </div>
                {player && <div className={"table-body"}>
                    {!isOrganizer && player.event_player.map((event, key) => (<EventRow event={event.event} key={key}/>))}
                    {isOrganizer && player.event.map((event, key) => (<EventRow event={event} key={key}/>))}
                </div>}


            </div>
        </VisibleProfileWrapper>
    )
}
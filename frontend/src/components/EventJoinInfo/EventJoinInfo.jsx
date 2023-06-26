import "./EventJoinInfo.scss";
import { useState, useEffect } from "react";
import {getLocalTime, getMonth, getShortWeekDay} from "../../utils/dates";
import WalletIcon from '../../assets/icon/wallet.svg';
import UsdIcon from '../../assets/icon/currency-usd.svg';
import CalendarIcon from '../../assets/icon/calendar.svg';

export const EventJoinInfo = ({event}) => {
    const [date, setDate] = useState(new Date());


    useEffect(() => {
        if (event) setDate(new Date(event.date));
    }, [event])
    return (
        <div className="event-join-action-info">
            <div className="event-join-action-calendar">
                <img src={CalendarIcon} width={16} height={18} alt="calendar"/>
                <div>{getLocalTime(event.time_begin)},  {date.getDate()} {getMonth(date)}, {getShortWeekDay(date)}</div>
            </div>
            {!event.is_paid
            ?
                <div className="event-join-action-price">
                    <img src={WalletIcon} width={20} height={20} alt="free"/>
                    <div className="event-join-action-text">Бесплатно</div>
                </div>
            : null}
            {event.is_paid
            ?
                <div className="event-join-action-price">
                    <img src={UsdIcon} width={14} height={20} alt="free"/>
                    <div className="event-join-action-text event-join-action-text-paid">{event.price}</div>
                </div>
            : null}
        </div>
    )
}

export default EventJoinInfo
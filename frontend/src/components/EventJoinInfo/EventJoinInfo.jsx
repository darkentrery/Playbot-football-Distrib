import "./EventJoinInfo.scss";
import { useState, useEffect } from "react";
import {getLocalTime, getMonth, getShortWeekDay} from "../../utils/dates";
import WalletIcon from '../../assets/icon/wallet.svg';
import UsdIcon from '../../assets/icon/currency-usd.svg';
import CalendarIcon from '../../assets/icon/calendar.svg';
import WarningIcon from '../../assets/icon/warning.svg';
import { eventService } from "../../services/EventService";

export const EventJoinInfo = ({event, is376 = false, user = false}) => {
    const [date, setDate] = useState(new Date());
    console.log(event)

    const freeSlots = event.count_players - event.count_current_players

    const noSlots = freeSlots === 0
    const lowSlots = freeSlots <= 3 && freeSlots != 0
    const userInQueue = event.event_queues.some((e) => e.player.id === user.id)


    useEffect(() => {
        if (event) setDate(new Date(event.date));
    }, [event])
    return (
        <div className="event-join-action-info">
            <div className="event-join-action-calendar">
                <img src={CalendarIcon} width={24} height={21} alt="calendar"/>
                <div>{getLocalTime(event.time_begin)},  {date.getDate()} {getMonth(date)}, {getShortWeekDay(date)}</div>
            </div>
            {!event.is_paid
            ?
                <div className="event-join-action-price">
                    <img src={WalletIcon} width={24} height={24} alt="free"/>
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
            {is376 &&
            <>
                {noSlots && !lowSlots && !userInQueue &&
                    <div className="event-join-action-warning">
                        <img src={WarningIcon} height={24} width={24} alt="warning" />
                        <div className="event-join-action-text">Нет свободных слотов</div>
                    </div>
                }

                {lowSlots && !noSlots && !userInQueue &&
                    <div className="event-join-action-warning">
                        <img src={WarningIcon} height={24} width={24} alt="warning" />
                        <div className="event-join-action-text">{freeSlots} {freeSlots == 1 ? "свободный слот" : "свободных слота"}</div>
                    </div>
                }

                {userInQueue &&
                    <div className="event-join-action-warning">
                        <img src={WarningIcon} height={24} width={24} alt="warning" />
                        <div className="event-join-action-text">Вы в листе ожидания</div>
                    </div>
                }

            </>
            }
        </div>
    )
}

export default EventJoinInfo
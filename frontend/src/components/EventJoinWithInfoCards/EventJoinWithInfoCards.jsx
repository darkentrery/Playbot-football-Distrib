import { useState, useEffect } from 'react';
import {getLocalTime, getMonth, getShortWeekDay} from "../../utils/dates";
import { eventService } from '../../services/EventService';
import { ButtonsBoardOrganizerComponent } from '../body/ButtonsBoardOrganizerComponent';
import { ButtonsBoardPlayerComponent } from '../body/ButtonsBoardPlayerComponent';
import './EventJoinWithInfoCards.scss';
import ClockIcon from '../../assets/icon/clock.png';
import AvatarIcon from '../../assets/icon/avatar-skeleton.svg';
import TrophyIcon from '../../assets/icon/trophy.svg';
import DiagramIcon from '../../assets/icon/diagram.svg';
import GenderIcon from '../../assets/icon/gender.svg';
import RatingStarIcon from '../../assets/icon/rating-star.svg';
import WalletIcon from '../../assets/icon/wallet.svg';
import UsdIcon from '../../assets/icon/currency-usd.svg';
import CalendarIcon from '../../assets/icon/calendar.svg';

export const EventJoinWithInfoCards = ({
    event,
    user,
    funcs,
}) => {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        if (event) setDate(new Date(event.date));
    }, [event])
    return (
        <>
            {event &&
            <div className="event-join-top">
                <div className="event-cards-info">
                {event.duration && event.duration.duration &&
                    <div className="event-info-card">
                        <img src={ClockIcon} alt="clock" height={15} />
                        <div>{event.duration.duration} мин</div>
                    </div>
                }
                <div className="event-info-card">
                    <img src={AvatarIcon} alt="avatar" width={15} height={17} />
                    <div>{event.count_current_players + "/" + event.count_players}
                        {event.event_queues.length
                            ? <span className="event-info-card-in-queue">({event.event_queues.length})</span>
                            : null
                        }
                    </div>
                </div>
                <div className="event-info-card">
                    <img src={TrophyIcon} alt="skill lvl" width={18} height={15} />
                    <div className='event-info-card-green-text'>новичок</div>
                </div>
                <div className="event-info-card">
                    <img src={DiagramIcon} alt="Age diagram" width={20} height={20} />
                    <div>от 18 до 80 лет</div>
                </div>
                <div className="event-info-card">
                    <img src={GenderIcon} alt="Gender" width={20} height={20} />
                    <div>мужской</div>
                </div>
                <div className="event-info-card">
                    <img src={RatingStarIcon} alt="Rating" width={20} height={20} />
                    <div>25-89</div>
                </div>
            </div>
            <div className="event-join-action">
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
                </div>
                <div className="event-join-action-buttons">
                {user.isAuth && eventService.isOrganizer(event, user.user) 
                ?
                    <ButtonsBoardOrganizerComponent event={event} funcs={funcs}/> 
                :
                    <ButtonsBoardPlayerComponent className={"elem elem-4"} event={event} user={user} funcs={funcs}/>
                }
                </div>
            </div>
            
            </div>}
        </>
        
    )
}

export default EventJoinWithInfoCards
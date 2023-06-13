import "./EventCardsInfo.scss";
import ClockIcon from '../../assets/icon/clock.png';
import AvatarIcon from '../../assets/icon/avatar-skeleton.svg';
import TrophyIcon from '../../assets/icon/trophy.svg';
import DiagramIcon from '../../assets/icon/diagram.svg';
import GenderIcon from '../../assets/icon/gender.svg';
import RatingStarIcon from '../../assets/icon/rating-star.svg';

export const EventCardsInfo = ({event}) => {
    return (
        <div className="event-cards-info">
            {event.duration.duration &&  
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
    )
}
import "./EventCardsInfo.scss";
import ClockIcon from '../../assets/icon/clock.png';
import AvatarIcon from '../../assets/icon/avatar-skeleton.svg';
import TrophyIcon from '../../assets/icon/trophy.svg';
import DiagramIcon from '../../assets/icon/diagram.svg';
import GenderIcon from '../../assets/icon/gender.svg';
import RatingStarIcon from '../../assets/icon/rating-star.svg';

export const EventCardsInfo = ({event}) => {
    const minAge = event.min_age
    const maxAge = event.max_age
    const genders = event.genders
    const minPlayersRating = event.min_players_rank
    const maxPlayersRating = event.max_players_rank
    const maxRating = 5000

    return (
        <div className="event-cards-info">
            { event.duration_opt?.duration &&  
                <div className="event-info-card">
                    <img src={ClockIcon} alt="clock" height={15} />
                    <div>{event.duration_opt.duration} мин</div>
                </div>
            }
            { event.count_current_players !== 0 &&
                <div className="event-info-card">
                    <img src={AvatarIcon} alt="avatar" width={15} height={17} />
                    <div>{event.count_current_players + "/" + event.count_players}
                        {event.event_queues.length
                            ? <span className="event-info-card-in-queue">({event.event_queues.length})</span>
                            : null
                        }
                    </div>
                </div>
            }
            {/* Пока-что не отображать. */}
            {/* <div className="event-info-card">
                <img src={TrophyIcon} alt="skill lvl" width={18} height={15} />
                <div className='event-info-card-green-text'>новичок</div>
            </div> */}
            { minAge || maxAge ?
                <div className="event-info-card">
                    <img src={DiagramIcon} alt="Age diagram" width={20} height={20} />
                    {   minAge && maxAge 
                        ? <div>от {minAge} до {maxAge} лет</div>
                        : null
                    }

                    {   minAge && !maxAge 
                        ? <div>от {minAge} лет</div>
                        : null
                    }

                    {   !minAge && maxAge 
                        ? <div>до {maxAge} лет</div>
                        : null
                    }
                </div>
                : null
            }
            { genders.length !== 2 && genders[0] &&
                <div className="event-info-card">
                    <img src={GenderIcon} alt="Gender" width={20} height={20} />
                    <div>{genders[0].id == 1 ? "мужской" : "женский"}</div>
                </div>
            }
            
            { minPlayersRating > 0 || maxPlayersRating < maxRating && maxPlayersRating !== 0 ?

                <div className="event-info-card">
                    <img src={RatingStarIcon} alt="Rating" width={20} height={20} />
                    {
                        minPlayersRating > 0 && maxPlayersRating === maxRating
                        ? <div>от {minPlayersRating}</div>
                        : null
                    }
                    {
                        minPlayersRating == 0 && maxPlayersRating < maxRating
                        ? <div>до {maxPlayersRating}</div>
                        : null
                    }
                    {
                        minPlayersRating > 0 && maxPlayersRating < maxRating
                        ? <div>{minPlayersRating}-{maxPlayersRating}</div>
                        : null
                    }
                </div>
                
                : null
            }
        </div>
    )
}
import {getLocalTime, getMonth, getShortWeekDay} from "../../utils/dates";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import BaseRoutes from "../../routes/BaseRoutes";
import NavigateIcon from "../../assets/icon/tabler-map-pin.png"
import noFieldPhotoIcon from "../../assets/icon/temp-event-image.png";

export const SameEventComponent = ({
    event,
    className='',
}) => {
    const [date, setDate] = useState(false);
    const serverUrl = process.env.REACT_APP_SERVER_URL;
    useEffect(() => {
        if (event) {
            let date = new Date(event.date);
            setDate(`${date.getDate()} ${getMonth(date)}, ${getLocalTime(event.time_begin)}, ${getShortWeekDay(date)}`);
        }
    }, [event])
    
    let fieldImage
    if (event) {
        if (event.field?.field_photos?.[0]?.photo ) {
            fieldImage = serverUrl + event.field.field_photos[0].photo
        } else {
            fieldImage = noFieldPhotoIcon
        }
    }
    

    return (
        <>
            {event && 
            <Link className={`same-event ${className}`} to={BaseRoutes.eventLink(event.id)}>
                <div className="same-event__top">
                    <img src={fieldImage} alt="field photo" />
                    <div className="same-event__top-fog"></div>
                    <div className="same-event__top-date">
                        <div className="calendar-same-icon"></div>
                        {date}
                    </div>
                </div>
                <div className="same-event__info">
                    <div className="same-event__info-title">
                        <img src={NavigateIcon} width={24} height={24} alt="navigate icon" />
                        {event.field.name}
                    </div>
                    <div className="same-event__info-cards-list">
                        <div className="same-event__info-card-item">
                            <div className="avatar-skeleton-icon"></div>
                            <div className="same-event__info-card-item-text">
                                {event.count_current_players}/{event.count_players}
                            </div>
                        </div>
                        <div className="same-event__info-card-item">
                            <div className="black-ball-icon"></div>
                            <div className="same-event__info-card-item-text">
                                {event.field.format.name.replace("x", " x ")}
                            </div>
                        </div>
                    </div>
                </div>
            </Link> 
            }
        </>
    )
}
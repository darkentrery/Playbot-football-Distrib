import { eventService } from '../../services/EventService';
import { format } from "date-fns";
import ru from 'date-fns/locale/ru';

export const EventTopAdminEditBar = ({
    funcs,
    event,
    user
}) => {
    
    const editEvent = () => {
        if (event && user.isAuth && eventService.isOrganizer(event, user.user)) {
            funcs.openEditEvent();
        } else {
            funcs.openLogin();
        }
        funcs.removeMap();
    }

    const isPublishDelayed = event.is_delay_publish

    let publishTime;

    if (isPublishDelayed) {
        publishTime = format(new Date(event.publish_time), `dd MMMM yyyy 'в' HH:mm`, { locale: ru });
    }

    let isNoDataItems = !isPublishDelayed && !event.is_news_line && true
    return (
        <div className='event-admin-bar'>
            <div className={"event-admin-bar-data " + (isNoDataItems && "no-data-items-376")}>
                {event.name && 
                <div className={"event-component-title" }>
                    {event.name}
                </div>
                }
                <div className="event-admin-bar-data-inner">
                    <div className="event-admin-bar-data-item">
                        <div className="event-admin-bar-data-item-name">
                            Плейсмент
                        </div>
                        <div className="event-admin-bar-data-item-text">
                            {event.is_news_line ? "В главной ленте" : "В телеграмм чате"}
                        </div>
                    </div>
                    {isPublishDelayed && 
                    <div className="event-admin-bar-data-item">
                        <div className="event-admin-bar-data-item-name">
                            Отложенная публикация
                        </div>
                        <div className="event-admin-bar-data-item-text">
                            {publishTime}
                        </div>
                    </div>
                    }
                </div>
            </div>
            <div className={"event-admin-bar-edit elem-1280 elem-1"} onClick={editEvent}>
                <span className={"el black-edit-icon link"} >Редактировать</span>
            </div>
        </div>
    )
}

export default EventTopAdminEditBar
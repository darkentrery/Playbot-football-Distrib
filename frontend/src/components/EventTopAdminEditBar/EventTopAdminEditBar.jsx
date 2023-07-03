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

    const isTelegramAnonse = event?.public_in_channel 
    const isLentaAnonse = event?.is_news_line

    let isNoDataItems = !isPublishDelayed && !event.is_news_line && !isTelegramAnonse && true
    return (
        <div className='event-admin-bar'>
            <div className={"event-admin-bar-data " + (isNoDataItems && "no-data-items-376")}>
                {/* {event.name && 
                <div className={"event-component-title" }>
                    {event.name}
                </div>
                } */}
                <div className="event-admin-bar-data-inner">
                    <div className="event-admin-bar-data-item">
                        <div className="event-admin-bar-data-item-name">
                            {(isLentaAnonse || isTelegramAnonse) ? "Плейсмент" : null}
                        </div>
                        <div className="event-admin-bar-data-item-text">
                            {(isLentaAnonse && !isTelegramAnonse) ? "В главной ленте" : null}
                            {(!isLentaAnonse && isTelegramAnonse) ? "В чате телеграмм" : null}
                            {(isLentaAnonse && isTelegramAnonse) ? "В ленте, телеграмме" : null}
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
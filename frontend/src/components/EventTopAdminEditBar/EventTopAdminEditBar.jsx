import './EventTopAdminEditBar.scss';
import { eventService } from '../../services/EventService';

export const EventTopAdminEditBar = ({
    placement = 'В главной ленте',
    delayedPublish = '30 мая 2023 в 12:00',
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
    return (
        <div className='event-admin-bar'>
            <div className="event-admin-bar-data">
                {event.name && 
                <div className="event-component-title">
                    {event.name}
                </div>
                }
                <div className="event-admin-bar-data-item">
                    <div className="event-admin-bar-data-item-name">
                        Плейсмент
                    </div>
                    <div className="event-admin-bar-data-item-text">
                        {placement}
                    </div>
                </div>
                <div className="event-admin-bar-data-item">
                    <div className="event-admin-bar-data-item-name">
                        Отложенная публикация
                    </div>
                    <div className="event-admin-bar-data-item-text">
                        {delayedPublish}
                    </div>
                </div>
            </div>
            <div className={"event-admin-bar-edit elem-1280 elem-1"}>
                <span className={"el black-edit-icon link"} onClick={editEvent}>Редактировать</span>
            </div>
        </div>
    )
}

export default EventTopAdminEditBar
import './EventTopAdminEditBar.scss';

export const EventTopAdminEditBar = ({
    placement = 'В главной ленте',
    delayedPublish = '30 мая 2023 в 12:00',
    onClick = () => {}
}) => {
    return (
        <div className='event-admin-bar'>
            <div className="event-admin-bar-data">
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
                <span className={"el black-edit-icon link"} onClick={onClick}>Редактировать</span>
            </div>
        </div>
    )
}

export default EventTopAdminEditBar
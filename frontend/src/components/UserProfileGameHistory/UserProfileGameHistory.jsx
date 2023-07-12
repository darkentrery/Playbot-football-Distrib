import './UserProfileGameHistory.scss';
import { UserProfileGameHistorySingle } from './UserProfileGameHistorySingle';

export const UserProfileGameHistory = ({ events }) => {

    if (!events?.length) {
        return null;
    }
    return (
        <div className="user-profile__game-history">
            <div className="user-profile__game-history-title">
                История игр
            </div>
            <div className="user-profile__game-history-list">
                {events?.map(event => {
                    if (event && event?.event && event?.event?.field) {
                        return (
                            <UserProfileGameHistorySingle
                                format={event.event.field.format.name}
                                fieldName={event.event.field.name}
                                date={event.event.date}
                                rate={25} // TODO изменение рейтинга
                                key={event.event.id}
                                id={event.event.id}
                            />
                        )
                    }
                })}
            </div>
        </div>
    )
}
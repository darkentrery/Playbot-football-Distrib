import { SameEventComponent } from '../sameEventComponent/SameEventComponent';
import './UserProfileFutureGames.scss';

export const UserProfileFutureGames = ({ events }) => {
    console.log(events)
    return (
        <div className="user-profile-future-games">
            <div className="user-profile-future-games__title">
                Предстоящие игры
            </div>
            <div className="user-profile-future-games__list">
                {events?.map(event => (
                    <>
                        <SameEventComponent className='user-profile-future-games__item' event={event.event} />
                    </>

                ))}
            </div>
        </div>
    )
}
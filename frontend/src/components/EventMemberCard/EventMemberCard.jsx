import './EventMemberCard.scss';
import avatarMemberIcon from '../../assets/icon/avatar-2.png'
import { Link } from 'react-router-dom';
import ProfileRoutes from '../../routes/ProfileRoutes';

export const EventMemberCard = ({
    name,
    avatar = null,
    rating,
    id
}) => {
    let userAvatar = avatar ? avatar : avatarMemberIcon
    return (
        <Link to={ProfileRoutes.myProfileLink(id)}>
            <div className="event-members-item">
                <img src={userAvatar} alt="avatar" width={37} height={46} className="event-members-item__img" />
                <div className="event-members-item__info">
                    <div className="event-members-item__info-name">
                        {name}
                    </div>
                    <div className="event-members-item__info-rating">
                        {rating}
                    </div>
                </div>
            </div>
        </Link>
    )
}
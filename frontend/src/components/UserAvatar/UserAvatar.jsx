import './UserAvatar.scss';
import avatarDevIcon from '../../assets/icon/temp-preview-photo.png';

export const UserAvatar = ({className = ''}) => {
    return (
        <div className={"user-avatar " + className}>
            <img src={avatarDevIcon} alt="user"/>
        </div>
    )
}

export default UserAvatar

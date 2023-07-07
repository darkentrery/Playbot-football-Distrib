import './UserPhotoCards.scss';
import NoPhotoImage from '../../assets/icon/big-card-alt.png'

export const UserPhotoSmall = ({ url = null }) => {
    return (
        <div className="user-photo__small-card">

            {url ?
                <img src={url} alt="user photo" />
                : <img src={NoPhotoImage} alt="error" style={{marginBottom: "auto"}}/>
            }
        </div>
    )
}
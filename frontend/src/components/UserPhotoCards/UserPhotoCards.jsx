import './UserPhotoCards.scss';
import NoPhotoImage from '../../assets/icon/big-card-alt.png'

export const UserPhotoSmall = ({ url = null }) => {
    const serverUrl = process.env.REACT_APP_SERVER_URL;
    return (
        <div className="user-photo__small-card">

            {url ?
                <img src={serverUrl + url} alt="user photo" />
                : <img src={NoPhotoImage} alt="error" style={{marginBottom: "auto"}}/>
            }
        </div>
    )
}
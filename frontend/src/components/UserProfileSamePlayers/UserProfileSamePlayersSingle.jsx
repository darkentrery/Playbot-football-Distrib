import { UserPhotoSmall } from "../UserPhotoCards/UserPhotoCards"
import { Link } from "react-router-dom"
import ProfileRoutes from "../../routes/ProfileRoutes"

export const UserProfileSamePlayersSingle = ({ id, username, rating, photoUrl }) => {

    return (
        <Link to={ProfileRoutes.myProfileLink(id)}>
            <div className="user-profile__same-players-item">
                <UserPhotoSmall url={photoUrl} />

                <div className="user-profile__same-player-info">
                    <div className="user-profile__same-player-name">
                        {username}
                    </div>
                    <div className="user-profile__same-player-elo">
                        {rating}
                    </div>
                </div>
            </div>
        </Link>

    )
}
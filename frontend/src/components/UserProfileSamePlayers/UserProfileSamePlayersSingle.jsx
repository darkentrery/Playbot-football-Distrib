import { UserPhotoSmall } from "../UserPhotoCards/UserPhotoCards"

export const UserProfileSamePlayersSingle = ({username, rating, photoUrl}) => {
    return (
        <div className="user-profile__same-players-item">
            <UserPhotoSmall url={photoUrl}/>

            <div className="user-profile__same-player-info">
                <div className="user-profile__same-player-name">
                    {username}
                </div>
                <div className="user-profile__same-player-elo">
                    {rating}
                </div>
            </div>
        </div>
    )
}
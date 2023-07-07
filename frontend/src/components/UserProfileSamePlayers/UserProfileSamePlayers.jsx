import './UserProfileSamePlayers.scss';
import { UserProfileSamePlayersSingle } from "./UserProfileSamePlayersSingle"

export const UserProfileSamePlayers = ({users}) => {
    users = users?.slice(0, 2)
    return (
        <div className="user-profile__same-players">
            <div className="user-profile__same-players-title">
                Похожие профили
            </div>

            <div className="user-profile__same-players-list">
                {users?.map(user => (
                    <UserProfileSamePlayersSingle 
                        username={user.username}
                        rating={user.rank}
                        photoUrl={undefined}
                        key={user.id}
                    />
                ))}
            </div>
        </div>
    )
}
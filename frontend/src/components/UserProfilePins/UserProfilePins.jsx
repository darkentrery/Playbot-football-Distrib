import { getMonth } from '../../utils/dates';
import './UserProfilePins.scss';

export const UserProfilePins = ({ dateJoined, playedTogether, totalGames }) => {
    const date = new Date(dateJoined)
    
    const year = date.getFullYear()
    const month = getMonth(date)
    return (
        <>
            <div className="user-profile__pins-376">

                {dateJoined ? (
                    <div className="user-profile__pin-376">
                        Играет с {month} {year}
                    </div>
                )
                    : null
                }

                {playedTogether !== 0 && (
                    <div className="user-profile__pin-376">
                        Вы играли вместе
                        <span className='user-profile__pin-orange-376'>
                            {playedTogether} раза
                        </span>
                    </div>
                )}

                { totalGames === 0 && (
                    <div className="user-profile__pin-376">
                        Еще не участвовал ни в одной игре
                    </div>
                )}
            </div>
        </>
    )
}
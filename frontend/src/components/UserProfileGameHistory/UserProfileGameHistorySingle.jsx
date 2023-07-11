import { Link } from "react-router-dom"
import TempAchievIcon from "../../assets/icon/temp-achiev-2.png"
import { getMonth } from "../../utils/dates"
import EventRoutes from "../../routes/EventRoutes"

export const UserProfileGameHistorySingle = ({ date, format, fieldName, rate = 25, id }) => {
    date = new Date(date)
    const day = date.getDate()

    const month = getMonth(date)
    const url = EventRoutes.eventLink(id)
    return (
        <>
            <Link to={url}>
                <div className="user-profile__game-history-item">
                    <div className="user-profile__game-history-date">
                        {day} {month}
                    </div>

                    <div className="user-profile__game-history-format">
                        {format}
                    </div>

                    <div className="user-profile__game-history-field">
                        {fieldName}
                    </div>

                    <div className={["user-profile__game-history-elo", rate > 0 ? "green" : "red"].join(' ')}>
                        {rate > 0 ? "+" : "-"}{rate}
                    </div>

                    <img src={TempAchievIcon} className="user-profile__game-history-arrow" width={31} height={40} alt="achiev" />
                </div>
            </Link>
        </>
    )
}
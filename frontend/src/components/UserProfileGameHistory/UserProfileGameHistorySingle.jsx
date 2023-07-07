import TempAchievIcon from "../../assets/icon/temp-achiev-2.png"
import { getMonth } from "../../utils/dates"

export const UserProfileGameHistorySingle = ({date, format, fieldName, rate = 25}) => {
    date = new Date(date)
    const day = date.getDate()

    const month = getMonth(date)
    return (
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

            <a href="#" className="user-profile__game-history-arrow">
                <img src={TempAchievIcon} width={31} height={40} alt="achiev" />
            </a>
        </div>
    )
}
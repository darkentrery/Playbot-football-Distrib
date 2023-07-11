import { Link, useParams } from "react-router-dom";
import NoPhotoIcon from "../../assets/icon/big-card-alt.png"
import './UserProfileHeader.scss';
import ProfileRoutes from "../../routes/ProfileRoutes";
import { calculateAge } from "../../utils/dates";

export const UserProfileHeader = ({ username, photo, rating, ratingPlace, age, isProfileOwner }) => {
    const { pk } = useParams()
    const serverUrl = process.env.REACT_APP_SERVER_URL;

    const date = new Date(age)
    age = calculateAge(date)

    return (
        <div className="user-profile__header-376">
            <div className="user-profile__header-user-photo-wrapper-376" style={{border: photo ? "none" : "", background: photo ? "none" : ""}}>
                {photo
                    ? <img src={serverUrl + photo}/>
                    : <img src={NoPhotoIcon} style={{marginBottom: "auto"}}/>
                }
            </div>
            <div className="user-profile__header-info-376">
                <div className="user-profile__header-info-name-376">
                    {username}
                </div>
                <div className="user-profile__header-info-stats-376">

                    {rating !== null && (
                        <div className="user-profile__header-info-stat-376">
                            <div className="user-profile__header-info-stat-name-376">
                                Рейтинг
                            </div>
                            <div className="user-profile__header-info-stat-value-376">
                                {rating}
                            </div>
                        </div>
                    )}

                    {ratingPlace !== null && (
                        <div className="user-profile__header-info-stat-376">
                            <div className="user-profile__header-info-stat-name-376">
                                Место
                            </div>
                            <div className="user-profile__header-info-stat-value-376">
                                #{ratingPlace}
                            </div>
                        </div>
                    )}

                    {age !== null && (
                        <div className="user-profile__header-info-stat-376">
                            <div className="user-profile__header-info-stat-name-376">
                                Возраст
                            </div>
                            <div className="user-profile__header-info-stat-value-376">
                                {age}
                            </div>
                        </div>
                    )}
                    {isProfileOwner && (
                        <div className="user-profile__header-info-edit-icon">
                            <Link
                                to={ProfileRoutes.profilePersonalDataLink(pk)}
                            >
                                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_11222_94015)">
                                        <path d="M6.5 7.87695H5.5C4.96957 7.87695 4.46086 8.08767 4.08579 8.46274C3.71071 8.83781 3.5 9.34652 3.5 9.87695V18.877C3.5 19.4074 3.71071 19.9161 4.08579 20.2912C4.46086 20.6662 4.96957 20.877 5.5 20.877H14.5C15.0304 20.877 15.5391 20.6662 15.9142 20.2912C16.2893 19.9161 16.5 19.4074 16.5 18.877V17.877" stroke="#1B1B1B" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M15.5 5.87706L18.5 8.87706M19.885 7.46206C20.2788 7.06821 20.5001 6.53404 20.5001 5.97706C20.5001 5.42008 20.2788 4.88591 19.885 4.49206C19.4912 4.09821 18.957 3.87695 18.4 3.87695C17.843 3.87695 17.3088 4.09821 16.915 4.49206L8.5 12.8771V15.8771H11.5L19.885 7.46206Z" stroke="#1B1B1B" strokeLinecap="round" strokeLinejoin="round" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_11222_94015">
                                            <rect width="24" height="24" fill="white" transform="translate(0 0.5)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
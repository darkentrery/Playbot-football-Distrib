import NoPhotoIcon from "../../assets/icon/mira.png"


export const UserProfileHeader = () => {
    return (
        <div className="user-profile__header-376">
            <div className="user-profile__header-user-photo-wrapper-376">
                <img src={NoPhotoIcon} />
            </div>
            <div className="user-profile__header-info-376">
                <div className="user-profile__header-info-name-376">
                    ALEX_MIRAN
                </div>
                <div className="user-profile__header-info-stats-376">

                    <div className="user-profile__header-info-stat-376">
                        <div className="user-profile__header-info-stat-name-376">
                            Рейтинг
                        </div>
                        <div className="user-profile__header-info-stat-value-376">
                            345
                        </div>
                    </div>

                    <div className="user-profile__header-info-stat-376">
                        <div className="user-profile__header-info-stat-name-376">
                            Место
                        </div>
                        <div className="user-profile__header-info-stat-value-376">
                            #15
                        </div>
                    </div>

                    <div className="user-profile__header-info-stat-376">
                        <div className="user-profile__header-info-stat-name-376">
                            Возраст
                        </div>
                        <div className="user-profile__header-info-stat-value-376">
                            25
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
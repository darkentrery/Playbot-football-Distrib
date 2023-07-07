import './UserProfileAchievements.scss';
import TempAchievIcon from '../../assets/icon/temp-achiev.png'


export const UserProfileAchievements = () => {
    return (
        <div className="user-profile__achiev-376">
            <div className="user-profile__achiev-title-376">
                Достижения
            </div>
            <div className="user-profile__achiev-list-376">
                <img src={TempAchievIcon} alt="achiev" width={48} height={61}/>
                <img src={TempAchievIcon} alt="achiev" width={48} height={61}/>
                <img src={TempAchievIcon} alt="achiev" width={48} height={61}/>
                <img src={TempAchievIcon} alt="achiev" width={48} height={61}/>
                <img src={TempAchievIcon} alt="achiev" width={48} height={61}/>
                <img src={TempAchievIcon} alt="achiev" width={48} height={61}/>
            </div>
        </div>
    )
}
import { useDispatch, useSelector } from 'react-redux';
import { useState } from "react";
import { YesNoComponent } from "../yesNoComponent/YesNoComponent";
import { showLoadPhotoWindow } from '../../redux/actions/actions';
import { cancelUserPhotoModeration } from '../../redux/reducers/loadPhotoReducer';


export const ProfilePersonalPhoto = () => {
    const dispatch = useDispatch()
    const [showCancelLoadPopup, setShowCancelLoadPopup] = useState(false);
    const [isErrorTooltip, setIsErrorTooltip] = useState(false)
    const serverUrl = process.env.REACT_APP_SERVER_URL;
    const { media } = useSelector(state => state.user?.user);
    const { player } = useSelector(state => state.event);
    const photo = player.photo;
    const isModerationFinished = !!player.photo && player.is_accept_photo;
    const photoOnModeration = !!player.photo && !player.is_accept_photo;
    const photoErrors = player.photo_errors;
    const loadPhotoErrorMsg = media?.moderation?.message;

    const handleLoadPhotoClick = () => {
        dispatch(showLoadPhotoWindow(true));
    }

    const handleCancelLoadPhotoClick = () => {
        dispatch(cancelUserPhotoModeration(player));
    }

    return (
        <> {/* test */}
            <YesNoComponent
                isOpen={showCancelLoadPopup}
                closeSuccess={() => setShowCancelLoadPopup(false)}
                title={"Отменить загрузку фото"}
                text={"Вы уверены, что хотите отменить загрузку фотографии?"}
                clickSuccess={handleCancelLoadPhotoClick}
            />
            {/* фотка есть */}
            {photoOnModeration && isModerationFinished && !photoErrors &&
                <div className='photo-bar'>
                    <div className="photo-bar-user-photo-wrapper">
                        <div className="photo-bar-user-photo">
                            {/*{photoOnModeration && typeof photoOnModeration !== "string" &&*/}
                            {/*    <img alt="not fount" src={URL.createObjectURL(photoOnModeration)} />}*/}
                            {/*{photo && typeof photo === "string" &&*/}
                            <img alt="not fount" src={serverUrl + photo} />
                            {/*}*/}
                        </div>
                        <div className="photo-bar-user-photo-text black-600-16">
                            Фотография профиля на сезон 23/24
                        </div>
                    </div>
                </div>
            }
            {/* на модерации */}
            {!isModerationFinished && photoOnModeration &&
                <div className="photo-bar on-moderation">
                    <span className="black-400-14">Фотография профиля:</span>
                    <label className="upload-photo" onClick={() => { setShowCancelLoadPopup(true) }}>
                        {/*{typeof photoOnModeration !== "string" &&*/}
                        {/*    <img height={40} width={40} alt="not fount" className="upload-photo-image" src={URL.createObjectURL(photoOnModeration)} />}*/}
                        {/*{typeof photoOnModeration === "string" &&*/}
                        <img height={40} width={40} alt="not fount" className="upload-photo-image" src={serverUrl + photo} />
                        {/*}*/}
                        <div className="upload-photo-text">
                            <span className="gray-400-14">Фотография находится <br /> на модерации</span>
                            <span className="orange-400-14" style={{ cursor: "pointer" }}>Отменить загрузку</span>
                        </div>
                    </label>
                </div>
            }

            {/*нету фото, нету модерации */}
            {!photo && !photoOnModeration && !isModerationFinished &&
                <div className="photo-bar">
                    <span className="black-400-14">Фотография профиля:</span>
                    <label className="upload-photo" onClick={handleLoadPhotoClick}>
                        {!photo && <div className="upload-photo-image no-photo-icon"></div>}
                        {/*{photo && typeof photo !== "string" &&*/}
                        {/*    <img alt="not fount" className="upload-photo-image" src={URL.createObjectURL(photo)} />}*/}
                        {/*{photo && typeof photo === "string" &&*/}
                        {/*    <img alt="not fount" className="upload-photo-image" src={serverUrl + photo} />}*/}
                        <div className="upload-photo-text">
                            <span className="gray-400-14">Файл не выбран</span>
                            <span className="orange-400-14">Загрузить фото</span>
                        </div>
                    </label>
                </div>
            }
            {/* ошибка при модерации */}
            {photoOnModeration && !isModerationFinished && photoErrors.length !== 0 &&
                <div className="photo-bar moderation-failed">
                    <span className="black-400-14">Фотография профиля:</span>
                    {isErrorTooltip &&
                        <div className='photo-bar-moderation-tip-content photo-bar-moderation-tip-content-mobile gray-400-14'>
                            {loadPhotoErrorMsg}
                        </div>
                    }
                    <label className="upload-photo">
                        {/*{typeof photoOnModeration !== "string" &&*/}
                        {/*    <img alt="not fount" className="upload-photo-image" src={URL.createObjectURL(photoOnModeration)} />}*/}
                        {/*{typeof photoOnModeration === "string" &&*/}
                        <img alt="not fount" className="upload-photo-image" src={serverUrl + photoOnModeration} />
                        {/*}*/}
                        <div className="upload-photo-text">
                            <span className="gray-400-14">Файл не прошёл модерацию</span>
                            <span className="orange-400-14" onClick={handleLoadPhotoClick}>Загрузить новое фото</span>
                        </div>
                        {loadPhotoErrorMsg ?
                            <>
                                <div className='photo-bar-moderation-tip red-circle-warning-icon' onClick={() => { setIsErrorTooltip(!isErrorTooltip) }}></div>
                                <div className="photo-bar-moderation-tip-content gray-400-14">
                                    {loadPhotoErrorMsg}
                                </div>
                            </>
                            : null
                        }
                    </label>
                </div>
            }
        </>

    )
}

export default ProfilePersonalPhoto
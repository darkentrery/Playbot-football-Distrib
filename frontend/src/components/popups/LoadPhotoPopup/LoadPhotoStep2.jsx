import { confirmPhotoAction, setStateToDefault } from '../../../redux/reducers/loadPhotoReducer';
import { useDispatch } from "react-redux";
import { LoaderComponent } from '../../loaderComponent/LoaderComponent';
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";


const LoadPhotoStep2 = ({ photo, serverUrl, isAdmin }) => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user);
    const selectedUser = useSelector(state => state.loadPhoto.selectedUserByAdmin);
    
    const handleChangePhotoClick = () => {
        dispatch(setStateToDefault())
    }

    const handleConfirmPhotoClick = () => {
        if (isAdmin) {
            dispatch(confirmPhotoAction(selectedUser));
        } else {
            dispatch(confirmPhotoAction(user));
        }
    }

    const [loader, setLoader] = useState(true);

    const [photo1Loading, setPhoto1Loading] = useState(true);
    const [photo2Loading, setPhoto2Loading] = useState(true)

    useEffect(() => {
        if (!photo1Loading && !photo2Loading) {
            setLoader(false)
        }
    }, [photo1Loading, photo2Loading])
    return (

        <>
            {loader && <LoaderComponent />}
            <div className="load-user-photo-preview">
                <div className="load-user-photo-preview-frame">
                    <div className="load-user-photo-preview-top-frame" onLoad={() => setPhoto1Loading(false)}>
                        {
                            photo && typeof photo === "string" &&
                            <img className='load-user-photo-preview-user-img' src={serverUrl + photo} alt="user photo" onLoad={() => setPhoto2Loading(false)} />
                        }
                        {
                            photo && typeof photo !== "string" &&
                            <img className='load-user-photo-preview-user-img' src={URL.createObjectURL(photo)} alt="user photo" onLoad={() => setPhoto2Loading(false)} />
                        }
                        <div className="load-user-photo-preview-top-frame-fog"></div>
                    </div>
                    <div className="load-user-photo-preview-bottom">
                        <div className="load-user-photo-preview-username">
                            {isAdmin ? selectedUser.username : user.username}
                        </div>
                        <div className="load-user-photo-preview-bottom-stats">
                            <div className='load-user-photo-preview-stats'>
                                <div className='load-user-photo-preview-stats-name'>56</div>
                            </div>
                            <div className='load-user-photo-preview-stats load-user-photo-preview-stats-right'>
                                <div className='load-user-photo-preview-stats-name'>СМ</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="load-user-photo-preview-text-step-2">
                {isAdmin
                    ? <span>Так будет выглядеть карточка игрока в сезоне 2023.</span>
                    : <span dangerouslySetInnerHTML={{ __html: 'Так будет выглядеть ваша карточка в сезоне 2023. <br/> Вы <strong>не сможете</strong> изменить фотографию до начала <strong>следующего сезона</strong>.' }} />
                }
            </div>
            <div className="load-user-photo-preview-buttons-step-2">
                <button className="load-user-photo-preview-step-2-accept" onClick={handleConfirmPhotoClick}>
                    Подтвердить фото
                </button>
                <button className="load-user-photo-preview-step-2-decline" onClick={handleChangePhotoClick}>
                    Изменить фото
                </button>
            </div>
        </>

    )
}

export default LoadPhotoStep2

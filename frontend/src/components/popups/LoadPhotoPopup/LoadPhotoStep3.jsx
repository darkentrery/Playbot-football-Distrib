import { useDispatch } from "react-redux";
import GreenCheckRoundedIcon from "../../../assets/icon/check-small-rounded.svg"
import { setIsAdminLoad, setStateToDefault, setStep } from "../../../redux/reducers/loadPhotoReducer";
import { LoaderComponent } from "../../loaderComponent/LoaderComponent";
import { useState, useEffect } from "react";

const LoadPhotoStep3 = ({ hidePopup, isAdmin }) => {
    const dispatch = useDispatch()
    const [loader, setLoader] = useState(true);
    const [photo1Loading, setPhoto1Loading] = useState(true);

    const handleLoadMoreClick = () => {
        dispatch(setStateToDefault())
        dispatch(setStep(1))
        dispatch(setIsAdminLoad(true))
    }

    useEffect(() => {
        if (!photo1Loading) {
            setLoader(false)
        }
    }, [photo1Loading])
    return (
        <>
            {loader && <LoaderComponent />}
            <img src={GreenCheckRoundedIcon} height={52} width={52} alt="green check" onLoad={() => { setPhoto1Loading(false) }} />
            <div className='load-user-photo-step3-text-1'>
                {isAdmin ? "Фотография успешно обновлена." : "Фотография отправлена на модерацию"}
            </div>
            <div className='load-user-photo-step3-text-2'>
                {!isAdmin && "Она появится на вашей карточке в профиле после одобрения модератором"}
            </div>
            {!isAdmin &&
                <button onClick={hidePopup} className='load-user-photo-step3-button'>
                    Закрыть
                </button>}
            {isAdmin &&
                <div className="load-user-photo-step3-admin-button">
                    <button onClick={hidePopup} className='load-user-photo-step3-button'>
                        Закрыть
                    </button>
                    <button onClick={handleLoadMoreClick} className='load-user-photo-step3-button'>
                        Загрузить ещё
                    </button>
                </div>
            }
        </>
    )
}

export default LoadPhotoStep3

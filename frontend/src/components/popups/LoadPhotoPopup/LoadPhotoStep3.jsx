import GreenCheckRoundedIcon from "../../../assets/icon/check-small-rounded.svg"
import { LoaderComponent } from "../../loaderComponent/LoaderComponent";
import { useState, useEffect } from "react";

const LoadPhotoStep3 = ({hidePopup}) => {
    const [loader, setLoader] = useState(true);

    const [photo1Loading, setPhoto1Loading] = useState(true);

    useEffect(() => {
        if (!photo1Loading) {
            setLoader(false)
        }
    }, [photo1Loading])
    return (
        <>
            {loader && <LoaderComponent/>}
            <img src={GreenCheckRoundedIcon} height={52} width={52} alt="green check" onLoad={() => {setPhoto1Loading(false)}}/>
            <div className='load-user-photo-step3-text-1'>
                Фотография отправлена на модерацию
            </div>
            <div className='load-user-photo-step3-text-2'>
                Она появится на вашей карточке в профиле после одобрения модератором
            </div>
            <button onClick={hidePopup} className='load-user-photo-step3-button'>
                Закрыть
            </button>
        </>
    )
}

export default LoadPhotoStep3

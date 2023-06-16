import TempPreviewPng from "../../../assets/icon/temp-preview-photo.png"
import GreenCheckRoundedIcon from "../../../assets/icon/check-small-rounded.svg"

const LoadPhotoStep3 = () => {
    return (
        <>
            <img src={GreenCheckRoundedIcon} height={52} width={52} alt="green check" />
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


const LoadPhotoStep2 = () => {
    return (
        <>
            <div className="load-user-photo-preview">
                <div className="load-user-photo-preview-frame">
                    <div className="load-user-photo-preview-top-frame">
                        <img className='load-user-photo-preview-user-img' src={TempPreviewPng} alt="" />
                        <div className="load-user-photo-preview-top-frame-fog"></div>
                    </div>
                    <div className="load-user-photo-preview-bottom">
                        <div className="load-user-photo-preview-username">
                            ALEX_MIRAN
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
                Так будет выглядеть ваша карточка в сезоне 2023. Вы <b>не сможете</b> изменить фотографию до начала <b>следующего сезона.</b>
            </div>
            <div className="load-user-photo-preview-buttons-step-2">
                <button className="load-user-photo-preview-step-2-accept">
                    Подтвердить фото
                </button>
                <button className="load-user-photo-preview-step-2-decline">
                    Изменить фото
                </button>
            </div>
        </>

    )
}

export default LoadPhotoStep2

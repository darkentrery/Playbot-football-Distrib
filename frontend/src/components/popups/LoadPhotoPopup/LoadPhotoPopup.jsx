import './LoadPhotoPopup.scss';
import { useDispatch, useSelector } from 'react-redux';
import Modal from "react-modal";

import GoodPhotoExPng from "../../../assets/icon/good-photo-example.png"
import BadPhotoExPng from "../../../assets/icon/bad-photo-example.png"
import TempPreviewPng from "../../../assets/icon/temp-preview-photo.png"
import AvatarDecorSquareIcon from "../../../assets/icon/avatar-decor-square.svg"
import GreenCheckRoundedIcon from "../../../assets/icon/avatar-decor-square.svg"

export const LoadPhotoPopup = ({ isOpen }) => {
    const dispatch = useDispatch();
    const { step } = useSelector(state => state.loadPhoto)
    return (
        <Modal
            isOpen={isOpen}
            className={"popup-fon"}
            contentLabel="Example Modal"
            ariaHideApp={false}
        >
            <div className='popup-fon'>
                {step == 1 &&
                    <div className="load-user-photo">
                        <div className='load-user-photo-title'>
                            Загрузить фото
                        </div>
                        <div className="load-user-photo-examples">
                            <div className="load-user-photo-example">
                                <img src={GoodPhotoExPng} width={239} height={220} alt="good photo example" />
                                <div className="load-photo-example-text">
                                    ✅ player face visible
                                </div>
                                <div className="load-photo-example-text">
                                    ✅ looking at the camera
                                </div>
                                <div className="load-photo-example-text">
                                    ✅ good quality
                                </div>
                                <div className="load-photo-example-text">
                                    ✅ contrasting background
                                </div>
                                <div className="load-photo-example-text">
                                    ✅ no copyright problem
                                </div>
                            </div>
                            <div className="load-user-photo-example">
                                <img src={BadPhotoExPng} width={239} height={220} alt="bad photo example" />
                                <div className="load-photo-example-text">
                                    🚫 image cut off
                                </div>
                                <div className="load-photo-example-text">
                                    🚫 not looking at the camera
                                </div>
                                <div className="load-photo-example-text">
                                    🚫 bad quality
                                </div>
                                <div className="load-photo-example-text">
                                    🚫 merged background
                                </div>
                                <div className="load-photo-example-text">
                                    🚫 copyright problem
                                </div>
                            </div>
                        </div>
                        <input id='load-user-photo-input' type='file' />
                        <label for="load-user-photo-input" className="load-user-photo-button">
                            <div className='no-photo-icon'></div>
                            <span className='gray-400-14'>Выбрать файл</span>
                        </label>
                        <div className='load-photo-supported-formats gray-400-14'>
                            Поддерживаемые форматы: PNG, JPG, HEIC
                        </div>
                    </div>
                }
                {step == 2 &&
                    <div className='load-user-photo'>
                        <div className="load-user-photo-title">
                            Подтвердите фото
                        </div>
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
                    </div>
                }
                {
                    step === 3 &&
                    <div className='load-user-photo'>
                        <img src="" alt="" />
                        <div></div>
                        <div></div>
                        <button></button>
                    </div>
                }
            </div>
        </Modal>
    )
}

export default LoadPhotoPopup
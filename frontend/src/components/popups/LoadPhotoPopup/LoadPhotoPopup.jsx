import './LoadPhotoPopup.scss';
import { useDispatch, useSelector } from 'react-redux';
import Modal from "react-modal";
import { showLoadPhotoWindow } from '../../../redux/actions/actions';
import { setStateToDefault } from '../../../redux/reducers/loadPhotoReducer';
import LoadPhotoStep1 from './LoadPhotoStep1';
import LoadPhotoStep2 from './LoadPhotoStep2';
import LoadPhotoStep3 from './LoadPhotoStep3';

export const LoadPhotoPopup = ({ isOpen }) => {
    const dispatch = useDispatch();


    const { step, photo, error, isLoading } = useSelector(state => state.loadPhoto)

    const hidePopup = () => {
        dispatch(setStateToDefault())
        dispatch(showLoadPhotoWindow(false))
    }

    return (
        <Modal
            isOpen={isOpen}
            className={"popup-fon"}
            contentLabel="Example Modal"
            ariaHideApp={false}
        >
            <div className='popup-fon'>
                <div className={"load-user-photo loader"}>
                    {step === 1 &&
                        <>
                            <div className='cross-icon' onClick={hidePopup}></div>
                            <div className='load-user-photo-title'>
                                Загрузить фото
                            </div>
                            <LoadPhotoStep1 error={error} isLoading={isLoading} photo={photo} />
                        </>

                    }
                    {step === 2 &&
                        <>
                            <div className='cross-icon' onClick={hidePopup}></div>
                            <div className='load-user-photo-title'>
                                Загрузить фото
                            </div>
                            <LoadPhotoStep2 />
                        </>
                    }
                    {step === 3 &&
                        <>
                            <LoadPhotoStep3 />
                        </>
                    }
                </div>
            </div>
        </Modal>
    )
}

export default LoadPhotoPopup
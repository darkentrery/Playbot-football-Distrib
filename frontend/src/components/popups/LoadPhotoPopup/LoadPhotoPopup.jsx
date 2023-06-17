import { useDispatch, useSelector } from 'react-redux';
import Modal from "react-modal";
import { showLoadPhotoWindow } from '../../../redux/actions/actions';
import { setStateToDefault } from '../../../redux/reducers/loadPhotoReducer';
import LoadPhotoStep1 from './LoadPhotoStep1';
import LoadPhotoStep2 from './LoadPhotoStep2';
import LoadPhotoStep3 from './LoadPhotoStep3';

export const LoadPhotoPopup = ({ isOpen }) => {
    const dispatch = useDispatch();
    const serverUrl = process.env.REACT_APP_SERVER_URL;

    const { step, photo, error, isLoading, isAdminLoad} = useSelector(state => state.loadPhoto)

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
                <div className={"load-user-photo loader" + (step === 3 ? " load-user-photo-step3" : "")}>
                    {step === 1 &&
                        <>
                            <div className='cross-icon' onClick={hidePopup}></div>
                            <div className='load-user-photo-title'>
                                Загрузить фото
                            </div>
                            <LoadPhotoStep1 error={error} isLoading={isLoading} photo={photo} serverUrl={serverUrl} isAdmin={isAdminLoad}/>
                        </>

                    }
                    {step === 2 &&
                        <>
                            <div className='cross-icon' onClick={hidePopup}></div>
                            <div className='load-user-photo-title'>
                                Подтвердите фото
                            </div>
                            <LoadPhotoStep2 photo={photo} serverUrl={serverUrl} isAdmin={isAdminLoad}/>
                        </>
                    }
                    {step === 3 &&
                        <>
                            <LoadPhotoStep3 hidePopup={hidePopup} isAdmin={isAdminLoad} />
                        </>
                    }
                </div>
            </div>
        </Modal>
    )
}

export default LoadPhotoPopup
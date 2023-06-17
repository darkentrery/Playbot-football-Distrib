import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import GoodPhotoExPng from "../../../assets/icon/good-photo-example.jpg"
import BadPhotoExPng from "../../../assets/icon/bad-photo-example.png"
import { LoaderComponent } from '../../loaderComponent/LoaderComponent';
import { setError, loadPhotoAction } from '../../../redux/reducers/loadPhotoReducer';

const LoadPhotoStep1 = ({ error, isLoading, photo, serverUrl}) => {
    const dispatch = useDispatch();
    const [loader, setLoader] = useState(true);

    const [photo1Loading, setPhoto1Loading] = useState(true);
    const [photo2Loading, setPhoto2Loading] = useState(true);

    useEffect(() => {
        if (!photo1Loading && !photo2Loading) {
            setLoader(false)
        }
    }, [photo1Loading, photo2Loading])

    const handlePhotoLoad = (e) => {
        dispatch(loadPhotoAction(e.target.files[0]))
    }

    const handleRetryClick = () => {
        dispatch(setError(false));
    }
    return (

        <>
            {loader && <LoaderComponent />}
            <div className="load-user-photo-examples">
                <div className="load-user-photo-example">
                    <img src={GoodPhotoExPng} width={239} height={220} alt="good photo example" onLoad={() => setPhoto1Loading(false)} />
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
                    <img src={BadPhotoExPng} width={239} height={220} alt="bad photo example" onLoad={() => setPhoto2Loading(false)} />
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
            {
                !error
                    ?
                    <>
                        <input onChange={handlePhotoLoad} id='load-user-photo-input' type='file' accept='image/*' disabled={isLoading} />
                        <label htmlFor="load-user-photo-input" className="load-user-photo-button">
                            {
                                !photo && <div className='no-photo-icon'></div>
                            }
                            {
                                photo && typeof photo === "string" && <img src={serverUrl + photo} width={40} height={40} alt="" />
                            }
                            {
                                photo && typeof photo !== "string" && <img src={URL.createObjectURL(photo)} width={40} height={40} alt="" />
                            }
                            <span className='gray-400-14' style={{ textDecoration: isLoading && "none" }}>{isLoading ? "Файл загружается" : "Выбрать файл"}</span>
                            {isLoading && <div className='loading-circle-icon'></div>}
                        </label>
                    </>
                    :
                    <>
                        <div className="load-user-photo-error">
                            <div className="red-warning-icon"></div>
                            <div className="load-user-photo-error-text">
                                Не удалось загрузить фото. <br /> {error}
                            </div>
                        </div>
                    </>
            }
            <div className={'load-photo-supported-formats gray-400-14' + (error ? " load-user-photo-error-format" : "")}>
                Поддерживаемые форматы: PNG, JPG, HEIC
            </div>
            {error &&
                <button className='load-user-photo-error-btn' onClick={handleRetryClick}>
                    Повторить попытку
                </button>
            }
        </>
    )
}

export default LoadPhotoStep1

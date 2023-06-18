import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import GoodPhotoExPng from "../../../assets/icon/good-photo-example.jpg"
import BadPhotoExPng from "../../../assets/icon/bad-photo-example.png"
import { LoaderComponent } from '../../loaderComponent/LoaderComponent';
import { setError, loadPhotoAction, setSelectedUserByAdmin } from '../../../redux/reducers/loadPhotoReducer';
import {authService} from "../../../services/AuthService";

const LoadPhotoStep1 = ({ error, isLoading, photo, serverUrl, isAdmin }) => {
    const dispatch = useDispatch();
    const selectedUser = useSelector(state => state.loadPhoto.selectedUserByAdmin);
    const user = useSelector(state => state.user.user);
    const [loader, setLoader] = useState(true);
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const { isOpenLoadPhoto } = useSelector(state => state.windows);

    const [photo1Loading, setPhoto1Loading] = useState(true);
    const [photo2Loading, setPhoto2Loading] = useState(true);

    useEffect(() => {
        if (isOpenLoadPhoto) {
            authService.getUsers().then((response) => {
                setUsers(response.data)
                console.log(response.data)
            });
        }
    }, [isOpenLoadPhoto])

    useEffect(() => {
        if (!photo1Loading && !photo2Loading) {
            setLoader(false)
        }
    }, [photo1Loading, photo2Loading])

    const [searchValue, setSearchValue] = useState('');

    const handlePhotoLoad = (e) => {
        if (isAdmin) {
            dispatch(loadPhotoAction(e.target.files[0], {username: searchValue}));
        } else {
            dispatch(loadPhotoAction(e.target.files[0], user));
        }
    }

    const handleRetryClick = () => {
        dispatch(setError(false));
    }

    const handleSearchInput = (e) => {
        dispatch(setSelectedUserByAdmin({}));
        setSearchValue(e);
        let filtered = users.filter(user => user.username.toUpperCase().includes(e.toUpperCase()) && user.username !== selectedUser.username).slice(0, 3);
        setFilteredUsers(filtered);
    }

    const handleSearchSelect = (user) => {
        setSearchValue(user.username);
        dispatch(setSelectedUserByAdmin(user));
    }

    const disableInput = isAdmin && !selectedUser.username && true
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
            {isAdmin &&
                <div className="load-user-photo-as-admin">
                    <div className='black-400-20 load-user-photo-as-admin-title'>Введите username игрока</div>
                    <div className='load-user-photo-as-admin-input-wrapper'>
                        <input type="text"  value={searchValue} onChange={(e) => handleSearchInput(e.currentTarget.value)} placeholder='Username' />
                        {filteredUsers[0] && !selectedUser?.username && searchValue &&
                            <div className='load-user-photo-as-admin-user-list-wrapper'>

                                <div className='load-user-photo-as-admin-user-list'>
                                    {filteredUsers?.map(user => (
                                        <div className='load-user-photo-as-admin-user-item' onClick={() => handleSearchSelect(user)} style={{ borderRadius: filteredUsers.length === 1 && "8px" }} key={user.id}>
                                            {user.username}
                                        </div>
                                    ))}
                                </div>

                            </div>
                        }
                    </div>
                </div>}
            {
                !error
                    ?
                    <>
                        <input onChange={handlePhotoLoad} id='load-user-photo-input' type='file' accept='image/*' disabled={isLoading || disableInput && true} />
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

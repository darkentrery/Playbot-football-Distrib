import { useDispatch } from 'react-redux';
import './ProfilePersonalPhoto.scss';
import { useState } from "react";
import { showLoadPhotoWindow } from '../../redux/actions/actions';

export const ProfilePersonalPhoto = ({photo, setPhoto}) => {
    const dispatch = useDispatch()
    const serverUrl = process.env.REACT_APP_SERVER_URL;

    const handleLoadPhotoClick = () => {
        dispatch(showLoadPhotoWindow(true))
    }
    return (
        <div className={"photo-bar"}>
            <span className={"black-400-14"}>Фотография профиля:</span>
            <label className={"upload-photo"} onClick={handleLoadPhotoClick}>
                {!photo && <div className={"el-1 no-photo-icon"}></div>}
                {photo && typeof photo !== "string" &&
                    <img alt="not fount" className={"el-1 my-photo"} src={URL.createObjectURL(photo)} />}
                {photo && typeof photo === "string" &&
                    <img alt="not fount" className={"el-1 my-photo"} src={serverUrl + photo} />}
                <div className={"el-2"}>
                    <span className={"gray-400-14"}>Файл не выбран</span>
                    <span className={"orange-400-14"}>Загрузить фото</span>
                </div>
            </label>
        </div>
    )
}

export default ProfilePersonalPhoto
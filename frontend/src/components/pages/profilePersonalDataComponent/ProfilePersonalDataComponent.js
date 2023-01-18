import VisibleProfileWrapper from "../../../redux/containers/VisibleProfileWrapper";
import {InputComponent} from "../../inputComponent/InputComponent";
import React, {useEffect, useRef, useState} from "react";
import {choiceBirthDate} from "../../../utils/dates";
import ReactDatetimeClass from "react-datetime";
import DropDownComponent from "../../dropDownComponent/DropDownComponent";
import {SelectCityComponent} from "../../selectCityComponent/SelectCityComponent";
import {authService} from "../../../services/AuthService";
import {authDecoratorWithoutLogin} from "../../../services/AuthDecorator";
import {Link} from "react-router-dom";
import ProfileRoutes from "../../../routes/ProfileRoutes";


export const ProfilePersonalDataComponent = ({
    player,
    user,
    funcs,
}) => {
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [date, setDate] = useState(null);
    const [gender, setGender] = useState(null);
    const [phone, setPhone] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [position1, setPosition1] = useState(null);
    const [position2, setPosition2] = useState(null);
    const [aboutSelf, setAboutSelf] = useState(null);
    const [plusPosition, setPlusPosition] = useState(false);
    const [dateError, setDateError] = useState(false);
    const [update, setUpdate] = useState(false);
    const [city, setCity] = useState(null);
    const [data, setData] = useState(false);
    const positions = ["Позиция 1", "Позиция 2", "Позиция 3", "Позиция 4", "Позиция 5", "Позиция 6", "Позиция 7", "Позиция 8", "Позиция 9", "Позиция 10", "Позиция 11"];
    const refDate = useRef();

    useEffect(() => {
        let currentPhoto = null;
        if (typeof photo !== "string") currentPhoto = photo;
        let newDate;
        if (date) {
            let match = date.match(/\d{2}[.]\d{2}[.]\d{4}/);
            if (match !== null) {
                newDate = `${date.slice(6, 10)}-${date.slice(3, 5)}-${date.slice(0, 2)}`;
            } else {
                newDate = date;
            }
        }
        let newData = {
            'id': player.id,
            'username': username,
            'birthday': newDate,
            'email': email,
            'gender': gender,
            'phone_number': phone,
            'city': city,
            'position_1': position1,
            'position_2': position2,
            'photo': currentPhoto,
            'about_self': aboutSelf,
        }
        setData(newData);
    }, [username, date, email, gender, phone, city, position1, position2, photo, aboutSelf])

    const cleanData = () => {
        setPlusPosition(false);
    }

    useEffect(() => {
        if (player) {
            setEmail(player.email);
            setGender(player.gender);
            setUsername(player.username);
            if (player.birthday) setDate(`${player.birthday.slice(8, 10)}.${player.birthday.slice(5, 7)}.${player.birthday.slice(0, 4)}`);
            setAboutSelf(player.about_self);
            setCity(player.city);
            if (player.position_1) setPosition1(player.position_1.name);
            if (player.position_2) {
                setPosition2(player.position_2.name);
                setPlusPosition(true);
            }
            setPhoto(player.photo);
        }
    }, [player])

    const inputAbout = (e) => {
        setAboutSelf(e.target.value);
    }

    const updateUser = () => {
        if (!update) {
            cleanData();
            setUpdate(true);
            authDecoratorWithoutLogin(authService.updateUser, data).then((response) => {
                if (response.status === 200) {
                    funcs.setPlayer(response.data);
                    setUpdate(false);
                }
                console.log(response)
            })
        }
    }


    return (
        <VisibleProfileWrapper>
            <div className={"profile-personal-data-component"}>
                <div className={"top-bar"}>
                    <span className={`elem-1-1280 btn ${update ? 'disabled' : ''}`} onClick={updateUser}>Сохранить изменения</span>
                    <span className={`elem-1-744 btn ${update ? 'disabled' : ''}`} onClick={updateUser}>Сохранить</span>
                    <div className={`elem-2`}>
                        <div className={"black-eye-icon"}></div>
                        <Link className={"black-500-14 el-1"} to={ProfileRoutes.previewPlayerLink(player.id)}>Смотреть превью</Link>
                    </div>
                </div>
                <div className={"photo-bar"}>
                    <span className={"black-400-14"}>Фотография профиля:</span>
                    <input id={"input__photo"} type="file" accept={"image/*"} onChange={(e) => setPhoto(e.target.files[0])} placeholder={""}/>
                    <label className={"upload-photo"} htmlFor={"input__photo"}>
                        {!photo && <div className={"el-1 no-photo-icon"}></div>}
                        {photo && typeof photo !== "string" && <img alt="not fount" className={"el-1 my-photo"} src={URL.createObjectURL(photo)} />}
                        {photo && typeof photo === "string" && <img alt="not fount" className={"el-1 my-photo"} src={'http://127.0.0.1:8000' + photo} />}
                        <div className={"el-2"}>
                            <span className={"gray-400-14"}>Файл загружен</span>
                            <span className={"orange-400-14"}>Выбрать файл</span>
                        </div>
                    </label>
                </div>
                <div className={"fields-form"}>
                    <InputComponent leftIcon={"avatar-icon disabled"} className={"elem elem-1"} placeholder={"Username"}
                        value={username} setValue={setUsername}/>
                    <div className={"elem elem-2"}>
                        <ReactDatetimeClass
                            className={`div-input date ${dateError ? 'error' : ''}`}
                            timeFormat={false}
                            dateFormat={"DD.MM.YYYY"}
                            closeOnSelect={true}
                            inputProps={{placeholder: 'Дата рождения'}}
                            onChange={(e) => choiceBirthDate(e, setDate, refDate)}
                            ref={refDate}
                            value={date ? date : ''}
                        />
                        <span className={`input-message date-message ${dateError ? 'error' : ''}`}>{dateError}</span>
                    </div>
                    <InputComponent leftIcon={"email-icon"} className={"elem elem-3"} placeholder={"Почта"} value={email}
                        setValue={setEmail}/>
                    <DropDownComponent
                        value={gender} setValue={setGender} leftIcon={'gender-man-icon'} sizingClass={"elem elem-4"}
                        content={["Муж.", "Жен."]}
                        placeholder={"Пол"}
                    />
                    <InputComponent leftIcon={"phone-icon"} className={"elem elem-5"} placeholder={"Телефон"} value={phone}
                        setValue={setPhone}/>
                    <SelectCityComponent className={"elem elem-6"} value={city} setValue={setCity} placeholder={"Город"}/>
                    <div className={"elem elem-8-744 link"}>
                        <div className={"orange-plus-icon"}></div>
                        <span className={"orange-400-14"}>Добавить район</span>
                    </div>
                    <DropDownComponent
                        value={position1} setValue={setPosition1} leftIcon={'man-in-target-icon'} sizingClass={"elem elem-7"}
                        content={positions}
                        placeholder={"Позиция на поле"}
                    />
                    <div className={"elem elem-8-1280 link"}>
                        <div className={"orange-plus-icon"}></div>
                        <span className={"orange-400-14"}>Добавить район</span>
                    </div>
                    <div className={`elem elem-9 link ${plusPosition ? 'hidden' : ''}`} onClick={() => setPlusPosition(!plusPosition)}>
                        <div className={"orange-plus-icon"}></div>
                        <span className={"orange-400-14"}>Добавить позицию</span>
                    </div>
                    <DropDownComponent
                        value={position2} setValue={setPosition2} leftIcon={'man-in-target-icon'} sizingClass={`elem elem-10 ${plusPosition ? '' : 'hidden'}`}
                        content={positions}
                        placeholder={"Позиция на поле"}
                    />
                    <textarea className={"elem elem-11 map-point-icon"} name="" id="" cols="30" rows="10" onChange={inputAbout}
                              placeholder={"Пара слов о себе"} value={aboutSelf ? aboutSelf : ''}
                    ></textarea>

                </div>
                <div className={"change-password"}>
                    <div className={"orange-lock-icon"}></div>
                    <span className={"orange-400-14 link"}>Сменить пароль</span>
                </div>
            </div>
        </VisibleProfileWrapper>
    )
}
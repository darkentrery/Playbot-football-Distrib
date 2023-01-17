import VisibleProfileWrapper from "../../../redux/containers/VisibleProfileWrapper";
import {InputComponent} from "../../inputComponent/InputComponent";
import React, {useEffect, useRef, useState} from "react";
import {choiceBirthDate} from "../../../utils/dates";
import ReactDatetimeClass from "react-datetime";
import DropDownComponent from "../../dropDownComponent/DropDownComponent";
import {SelectCityComponent} from "../../selectCityComponent/SelectCityComponent";


export const ProfilePersonalDataComponent = ({
    player,
    user,
    funcs,
}) => {
    const [username, setUsername] = useState(false);
    const [email, setEmail] = useState(false);
    const [date, setDate] = useState(false);
    const [gender, setGender] = useState(false);
    const [phone, setPhone] = useState(false);
    const [photo, setPhoto] = useState(false);
    const [position1, setPosition1] = useState(false);
    const [position2, setPosition2] = useState(false);
    const [aboutSelf, setAboutSelf] = useState(false);
    const [plusPosition, setPlusPosition] = useState(false);
    const [dateError, setDateError] = useState(false);
    const [city, setCity] = useState(false);
    const [data, setData] = useState(false);

    useEffect(() => {
        console.log(photo)
    }, [username, date, email, gender, phone, city, position1, position2, photo])
    const refDate = useRef();

    const inputAbout = (e) => {
        setAboutSelf(e.target.value);
    }


    return (
        <VisibleProfileWrapper>
            <div className={"profile-personal-data-component"}>
                <div className={"top-bar"}>
                    <span className={`elem-1 btn`}>Сохранить изменения</span>
                    <div className={`elem-2`}>
                        <div className={"black-eye-icon"}></div>
                        <span className={"black-500-14 el-1"}>Смотреть превью</span>
                    </div>
                </div>
                <div className={"photo-bar"}>
                    <span className={"black-400-14"}>Фотография профиля:</span>
                    <input id={"input__photo"} type="file" accept={"image/*"} onChange={(e) => setPhoto(e.target.files[0])} placeholder={""}/>
                    <label className={"upload-photo"} htmlFor={"input__photo"}>
                        {!photo && <div className={"el-1 no-photo-icon"}></div>}
                        {photo && <img alt="not fount" className={"el-1 my-photo"} src={URL.createObjectURL(photo)} />}
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
                    <DropDownComponent
                        value={position1} setValue={setPosition1} leftIcon={'man-in-target-icon'} sizingClass={"elem elem-7"}
                        content={["Муж.", "Жен."]}
                        placeholder={"Позиция на поле"}
                    />
                    <div className={"elem elem-8 link"}>
                        <div className={"orange-plus-icon"}></div>
                        <span className={"orange-400-14"}>Добавить район</span>
                    </div>
                    <div className={`elem elem-9 link ${plusPosition ? 'hidden' : ''}`} onClick={() => setPlusPosition(!plusPosition)}>
                        <div className={"orange-plus-icon"}></div>
                        <span className={"orange-400-14"}>Добавить позицию</span>
                    </div>
                    <DropDownComponent
                        value={position1} setValue={setPosition1} leftIcon={'man-in-target-icon'} sizingClass={`elem elem-10 ${plusPosition ? '' : 'hidden'}`}
                        content={["Муж.", "Жен."]}
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
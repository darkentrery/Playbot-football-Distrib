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
import {Profile376MenuComponent} from "../../profile376MenuComponent/Profile376MenuComponent";
import {LoaderComponent} from "../../loaderComponent/LoaderComponent";
import {errorsUtil} from "../../../utils/errorsUtil";
import ProfilePersonalPhoto from "../../ProfilePersonalPhoto/ProfilePersonalPhoto";
import { UserProfileNavMobile } from "../../UserProfileNavMobile/UserProfileNavMobile";


export const ProfilePersonalDataComponent = ({
    player,
    user,
    funcs,
}) => {
    const [photo, setPhoto] = useState(null);
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    const [date, setDate] = useState(null);
    const [gender, setGender] = useState(null);
    const [phone, setPhone] = useState(null);
    const [position1, setPosition1] = useState(null);
    const [position2, setPosition2] = useState(null);
    const [aboutSelf, setAboutSelf] = useState(null);
    const [plusPosition, setPlusPosition] = useState(false);
    const [dateError, setDateError] = useState(false);
    const [usernameError, setUsernameError] = useState(null);
    const [emailError, setEmailError] = useState(null);
    const [phoneError, setPhoneError] = useState(null);
    const [update, setUpdate] = useState(false);
    const [city, setCity] = useState(null);
    const [errorCity, setErrorCity] = useState(null);
    const [data, setData] = useState(false);
    const positions = ["Вратарь", "Крайний защитник", "Центральный защитник", "Крайний полузащитник", "Центральный полузащитник", "Нападающий"];
    const [positions1, setPositions1] = useState(positions);
    const [positions2, setPositions2] = useState(positions);
    const refDate = useRef();
    const serverUrl = process.env.REACT_APP_SERVER_URL;
    const setErrors = {
        email: setEmailError,
        username: setUsernameError,
        phone_number: setPhoneError,
    }

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
            'address': city,
            'position_1': position1,
            'position_2': position2,
            'photo': currentPhoto,
            'about_self': aboutSelf,
        }
        setData(newData);
        let array = [];
        positions.map((position) => {
            if (position !== position2) array.push(position);
        })
        setPositions1(array);
        array = [];
        positions.map((position) => {
            if (position !== position1) array.push(position);
        })
        setPositions2(array);
    }, [username, date, email, gender, phone, city, position1, position2, photo, aboutSelf])

    const cleanData = () => {
        setPlusPosition(false);
        for (let key in setErrors) {
            setErrors[key](null);
        }
    }

    useEffect(() => {
        if (player) {
            setEmail(player.email);
            setGender(player.gender);
            setUsername(player.username);
            if (player.birthday) setDate(`${player.birthday.slice(8, 10)}.${player.birthday.slice(5, 7)}.${player.birthday.slice(0, 4)}`);
            setAboutSelf(player.about_self);
            if (!!player.address) {
                setCity(player.address.city);
            }
            if (player.position_1) setPosition1(player.position_1.name);
            if (player.position_2) {
                setPosition2(player.position_2.name);
                setPlusPosition(true);
            }
            setPhoto(player.photo);
        }
    }, [player])

    const inputAbout = (e) => {
        if (e.target.value.length > 100) {
            setAboutSelf(e.target.value.slice(0, 100));
        } else {
            setAboutSelf(e.target.value);
        }
    }

    const updatePassword = () => {
        funcs.openUpdatePassword();
    }

    const updateUser = () => {
        if (city) {
            if (!update) {
                cleanData();
                setUpdate(true);
                authDecoratorWithoutLogin(authService.updateUser, data).then((response) => {
                    if (response.status === 200) {
                        funcs.openSuccessUpdateUser();
                        funcs.setPlayer(response.data);
                        funcs.setAuth(true, response.data);
                        setUpdate(false);
                    } else {
                        setUpdate(false);
                        for (let field in setErrors) {
                            if (response.data[field]) {
                                let error = errorsUtil.getError(field, response.data[field][0]);
                                setErrors[field](error);
                            }
                        }
                    }
                })
            }
        } else {
            setErrorCity("Выберите город!");
        }
    }

    const deleteAccount = () => {
        funcs.openDeleteAccount();
    }

    return (
        <VisibleProfileWrapper>
            <div className={`profile-personal-data-component ${!player || !user ? 'loader' : ''}`}>
                {player && user && <>
                    <UserProfileNavMobile type={"settings"}/>
                    <div className={"top-bar"}>
                        <span className={`elem-1-1280 btn ${update ? 'disabled' : ''}`} onClick={updateUser}>Сохранить изменения</span>
                        <span className={`elem-1-744 btn ${update ? 'disabled' : ''}`} onClick={updateUser}>Сохранить</span>
                        <Link className={`elem-2`} to={ProfileRoutes.previewPlayerLink(player.id)}>
                            <div className={"black-eye-icon"}></div>
                            <span className={"black-500-14 el-1"} >Смотреть превью</span>
                        </Link>
                    </div>
                    <ProfilePersonalPhoto photo={photo} setPhoto={setPhoto}/>
                    <div className={"fields-form"}>
                        
                        {/* <InputComponent leftIcon={"phone-icon"} className={"elem elem-5"} placeholder={"Телефон"}
                                        value={phone} setValue={setPhone} errorText={phoneError}/>
                        <SelectCityComponent className={"elem elem-6"} value={city} setValue={setCity}
                                             placeholder={"Город"} errorText={errorCity} setErrorText={setErrorCity}
                        /> */}
                        <InputComponent leftIcon={"avatar-icon disabled"} className={"elem elem-1"} placeholder={"Username"}
                                        value={username} setValue={setUsername} errorText={usernameError}
                        />
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
                        <InputComponent leftIcon={"email-icon"} className={"elem elem-3"} placeholder={"Почта"}
                                        value={email} setValue={setEmail} errorText={emailError}
                        />
                        <DropDownComponent
                            value={gender} setValue={setGender} leftIcon={'gender-man-icon'} sizingClass={"elem elem-4"}
                            content={["Парень", "Девушка"]} placeholder={"Пол"}
                        />
                        <DropDownComponent
                            value={position1} setValue={setPosition1} leftIcon={'man-in-target-icon'}
                            sizingClass={"elem elem-7"} content={positions1} placeholder={"Позиция на поле"}
                        />
                        <div className={"elem elem-8-1280 link"}>
                            <div className={"orange-plus-icon"}></div>
                            <span className={"orange-400-14"}>Играть за район</span>
                        </div>
                    </div>
                    <div className={"change-password"}>
                        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.06293 0.509913C7.41435 0.587446 6.79331 0.805302 6.25222 1.14513C5.95139 1.33408 5.40115 1.85073 5.19991 2.13319C4.91304 2.53589 4.71764 2.95894 4.59067 3.45228C4.53276 3.67726 4.52517 3.81876 4.51256 4.91061L4.49861 6.11978H4.1644C3.96507 6.11978 3.75618 6.1379 3.64673 6.16466C3.10826 6.29636 2.69351 6.68705 2.5525 7.19537C2.4825 7.44764 2.4825 14.1721 2.5525 14.4244C2.69351 14.9327 3.10826 15.3234 3.64673 15.4551C3.80754 15.4945 4.40754 15.5 8.5 15.5C12.5925 15.5 13.1925 15.4945 13.3533 15.4551C13.8917 15.3234 14.3065 14.9327 14.4475 14.4244C14.5175 14.1721 14.5175 7.44764 14.4475 7.19537C14.3065 6.68705 13.8917 6.29636 13.3533 6.16466C13.2438 6.1379 13.0349 6.11978 12.8356 6.11978H12.5014L12.4874 4.91061C12.4748 3.81876 12.4672 3.67726 12.4093 3.45228C12.2157 2.70016 11.8792 2.13199 11.3138 1.60277C10.734 1.06009 10.128 0.744535 9.34292 0.576483C9.0823 0.5207 8.30916 0.480482 8.06293 0.509913ZM9.2226 1.51339C9.7887 1.65304 10.2195 1.88995 10.6385 2.29192C10.9353 2.5767 11.1441 2.87484 11.2896 3.22156C11.4695 3.65035 11.475 3.69848 11.4888 4.95458L11.5015 6.11978H8.5H5.49849L5.51042 4.95458C5.52141 3.8768 5.52728 3.77256 5.58856 3.56525C5.74728 3.0285 5.99416 2.63022 6.40426 2.24939C6.88647 1.80154 7.35248 1.58442 8.12537 1.44755C8.30844 1.4151 8.99005 1.45602 9.2226 1.51339ZM13.2645 7.1329C13.3119 7.16614 13.3797 7.22975 13.4151 7.27428C13.4791 7.3548 13.4795 7.3728 13.4876 10.7681C13.4967 14.546 13.5096 14.3057 13.2901 14.4628L13.1721 14.5473H8.5H3.82786L3.70992 14.4628C3.49191 14.3067 3.50493 14.5385 3.50493 10.8127C3.50493 8.49685 3.51536 7.41689 3.53824 7.36017C3.58251 7.25042 3.68663 7.14715 3.80151 7.09902C3.87859 7.06674 4.71605 7.06091 8.53675 7.06613C13.1708 7.07246 13.1784 7.07255 13.2645 7.1329Z" fill="#D19C6C"/>
                        </svg>

                        <span className={"orange-400-14 link"} onClick={updatePassword}>Сменить пароль</span>
                    </div>
                    <div className={"change-password"}>
                        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.5 14.5L2.5 2.5M14.5 2.5L2.5 14.5" stroke="#D19C6C" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className={"orange-400-14 link"} onClick={deleteAccount}>Удалить аккаунт</span>
                    </div>
                    <div className={"bottom-bar-376"}>
                        <span className={`elem-1 btn ${update ? 'disabled' : ''}`} onClick={updateUser}>Сохранить изменения</span>
                        {/* <Link className={"black-eye-icon"} to={ProfileRoutes.previewPlayerLink(player.id)}></Link> */}
                    </div>
                </>}
                {(!player || !user) && <LoaderComponent/>}
            </div>
        </VisibleProfileWrapper>
    )
}
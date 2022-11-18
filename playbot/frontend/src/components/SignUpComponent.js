import React, {useState, useEffect, useContext, useRef} from "react";
import AuthService from "../services/AuthService";
import TelegramLoginComponent from "./TelegramLoginComponent";
import { isMobile } from 'react-device-detect';
import {
    OpenChoiceCityContext,
    OpenLoginContext,
    OpenSignUpContext,
    OpenSuccessSignUpContext
} from "../context/AuthContext";
import Modal from "react-modal";
import docPolicy from "../assets/documents/policy.docx";
import docOffer from "../assets/documents/offer.docx";
import $ from "jquery";


export default function SignUpComponent () {
    const authService = new AuthService();
    const [username, setUsername] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState(false);
    const [phoneCode, setPhoneCode] = useState("+7");
    const [email, setEmail] = useState(false);
    const [password, setPassword] = useState(false);
    const [passwordConfirm, setPasswordConfirm] = useState(false);
    const [allowPolicy, setAllowPolicy] = useState(false);
    const [allowOffer, setAllowOffer] = useState(false);
    const [data, setData] = useState(false);
    const [loginData, setLoginData] = useState(false);
    const [isIPhone, setIsIphone] = useState(false);
    const [isDropdown, setIsDropdown] = useState(false);
    const [countryTag, setCountryTag] = useState([]);
    const [countries, setCountries] = useState(false);
    const [banner, setBanner] = useState(false);

    const {openSignUp, setOpenSignUp} = useContext(OpenSignUpContext);
    const {openLogin, setOpenLogin} = useContext(OpenLoginContext);
    const {openChoiceCity, setOpenChoiceCity} = useContext(OpenChoiceCityContext);
    const {openSuccessSignUp, setOpenSuccessSignUp} = useContext(OpenSuccessSignUpContext);
    const refUsername = useRef();
    const refPhoneNumber = useRef();
    const refEmail = useRef();
    const refPassword = useRef();
    const refPasswordConfirm = useRef();
    const refAllowPolicy = useRef();
    const refAllowOffer = useRef();
    const refPhoneCode = useRef();
    const refArrowIcon = useRef();
    const refCountryBody = useRef();
    const refs = [refUsername, refPhoneNumber, refEmail, refPassword, refPasswordConfirm];
    const refsDict = {
        "username": refUsername,
        "phoneNumber": refPhoneNumber,
        "email": refEmail,
        "password": refPassword,
        "passwordConfirm": refPasswordConfirm,
        "allowPolicy": refAllowPolicy,
        "allowOffer": refAllowOffer,
    };



    function phoneInput(event) {
        let value = event.target.value.replace(/\D/g, "");
        if (value.length > 10) value = value.slice(0, 10);
        let formatValue = '';
        if (value.length > 0 && value.length < 4) {
            formatValue = `(${value}`;
        } else if (value.length > 3 && value.length < 7) {
            formatValue = `(${value.slice(0, 3)})-${value.slice(3, 6)}`;
        } else if (value.length > 6) {
            formatValue = `(${value.slice(0, 3)})-${value.slice(3, 6)}-${value.slice(6, 10)}`;
        }
        event.target.value = formatValue;
        setPhoneNumber(value);
    }

    const openDropdown = () => {
        setIsDropdown(!isDropdown);
        if ($(refArrowIcon.current).hasClass("down-arrow-icon")) {
            refArrowIcon.current.className = "up-arrow-icon";
            $(refPhoneNumber.current).addClass('open');
        } else {
            refArrowIcon.current.className = "down-arrow-icon";
            $(refPhoneNumber.current).removeClass('open');
        }
    }

    const choicePhoneCode = (e) => {
        let parent = $(e.target).closest('.dropdown-elem');
        setBanner(parent.find('img').attr('src'));
        console.log(parent.find('.code').html())
        setPhoneCode(parent.find('.code').html());
        openDropdown();
    }

    useEffect(() => {
        if (openSignUp && !authService.addIPhoneBottomMargin('.sign-up-l-bottom')) setIsIphone(!isIPhone);
        if (!countries && openSignUp) {
            authService.getCountries(setBanner).then((response) => {
                setCountries(response);
            })
        }
    }, [openSignUp, isIPhone])

    useEffect(() => {
        let bodyFormData = new FormData();
        let bodyLoginFormData = new FormData();
        bodyFormData.append('username', username);
        if (phoneNumber) {
            bodyFormData.append('phone_number', `${phoneCode}${phoneNumber}`);
        }
        bodyFormData.append('email', email);
        bodyFormData.append('password', password);
        bodyLoginFormData.append('email', email);
        bodyLoginFormData.append('password', password);
        setData(bodyFormData);
        setLoginData(bodyLoginFormData);
    }, [username, phoneNumber, email, password, passwordConfirm, allowPolicy, allowOffer, phoneCode])

    const closeWindow = () => {
        setUsername(false);
        setPhoneNumber(false);
        setEmail(false);
        setPassword(false);
        setPasswordConfirm(false);
        setAllowPolicy(false);
        setAllowOffer(false);
        setData(false);
        setIsDropdown(false);
        refArrowIcon.current.className = "down-arrow-icon";
        $(refPhoneNumber.current).removeClass('open');
        setOpenSignUp(!openSignUp);
    }

    const toLogin = () => {
        closeWindow();
        setOpenLogin(!openLogin);
    }

    const suggestPassword = () => {
        let elem = $(refPassword.current).children('.generate-password');
        if (elem.hasClass('disabled')) {
            elem.removeClass('disabled');
            let newPassword = Math.random().toString(36).slice(2, 10);
            elem.find('.new-password').html(newPassword);
        } else {
            elem.addClass('disabled');
        }
    }

    const usePassword = () => {
        let elem = $(refPassword.current).children('.generate-password');
        let newPassword = elem.find('.new-password').html();
        $(refPassword.current).children('input').val(newPassword);
        $(refPasswordConfirm.current).children('input').val(newPassword);
        setPassword(newPassword);
        setPasswordConfirm(newPassword);
    }

    const hiddenSuggestPassword = (e) => {
        let elem = $(refPassword.current).children('.generate-password');
        if ($(e.target).attr('placeholder') !== "Пароль *" && !elem.hasClass('disabled')) {
            elem.addClass('disabled');
        }
    }

    const openAllowPolicy = () => {
        let link = document.createElement("a");
        link.download = `Политика конфиденциальности.docx`;
        link.href = docPolicy
        link.click();
        // URL.revokeObjectURL(link.href);
    }

    const openAllowOffer = () => {
        let link = document.createElement("a");
        link.download = `Пользовательское соглашение.docx`;
        link.href = docOffer
        link.click();
    }

    const sendForm = () => {
        console.log(username, phoneNumber, email, password, passwordConfirm, allowPolicy, allowOffer);
        let errors = authService.signUpRequestValidation(username, phoneNumber, email, password, passwordConfirm, allowPolicy, allowOffer, refs, refsDict);
        console.log(errors);
        if (!errors.length){
            authService.signUp(data).then((response) => {
                errors = authService.signUpResponseValidation(response, refsDict);
                if (!errors.size) {
                    closeWindow();
                    setOpenSuccessSignUp(!openSuccessSignUp);
                    if (isMobile) {
                        authService.login(loginData).then((response) => {
                            setOpenChoiceCity(!openChoiceCity);
                            setOpenSuccessSignUp(!openSuccessSignUp);
                        })

                    }
                }
            })
        }
    }

    return(
        <Modal
            isOpen={openSignUp}
            // onAfterOpen={afterOpenModal}
            // onRequestClose={closeModal}
            // style={customStyles}
            className={"popup-fon"}
            contentLabel="Example Modal"
            ariaHideApp={false}
        >
            <div className={"popup-frame sign-up"} onClick={hiddenSuggestPassword}>
                <div className={"popup-left"}>
                    <div className={"sign-up-l-body"}>
                        <div className={"sign-up-l-elem head"}>
                            <span className={"sign-up-title"}>Регистрация</span>
                            <div onClick={closeWindow} className={"btn-close sign-up-close left"}></div>
                        </div>
                        <div className={"sign-up-l-elem div-input"} ref={refUsername}>
                            <input className={"name-icon"} type="text" placeholder={"Username *"} onChange={(event) => setUsername(event.target.value)}/>
                            <span className={"input-message"}></span>
                        </div>
                        <div className={"sign-up-l-elem phone-field"} ref={refPhoneNumber}>
                            <div className={"dropdown-country"}>
                                <span className={"dropdown-label"} ref={refPhoneCode} onClick={openDropdown}>
                                    <img src={banner} alt=""/>
                                </span>
                                <div className={"down-arrow-icon"} ref={refArrowIcon} onClick={openDropdown}></div>
                                <div className={`dropdown-menu ${isDropdown ? 'open' : ''}`}>
                                    <input className={"search-icon"} type="text" placeholder={"Найти страну"}
                                           onChange={(event) => authService.searchCountry(event, refCountryBody, countryTag, setCountryTag, setPhoneCode)}/>
                                    <div className={"dropdown-body"} ref={refCountryBody}>
                                        {countries && countries.map((item, key) => {
                                            return (
                                                <div className={"dropdown-elem"} onClick={choicePhoneCode}>
                                                    <span className={"country"}>{item[0]}</span>
                                                    <span className={"code"}>{item[1]}</span>
                                                    <img className={"banner"} src={item[2]} alt=""/>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                            <input className={"phone-input"} type="text" placeholder={"Телефон"}  onChange={(event) => phoneInput(event)}/>
                        </div>
                        <div className={"sign-up-l-elem div-input"} ref={refEmail}>
                            <input className={"email-icon"} type="text" placeholder={"Почта *"} onChange={(event) => setEmail(event.target.value)}/>
                            <span className={"input-message"}></span>
                        </div>
                        <div className={"sign-up-l-elem div-input elem-5"} ref={refPassword}>
                            <input className={"password-icon"} type="password" placeholder={"Пароль *"} onClick={suggestPassword} onChange={(event) => setPassword(event.target.value)}/>
                            <span className={"input-message"}></span>
                            <div className={"generate-password disabled"} onClick={usePassword}>
                                <span>Сгенерированный пароль: <span className={"new-password"}></span></span>
                            </div>
                        </div>
                        <div className={"sign-up-l-elem div-input"} ref={refPasswordConfirm}>
                            <input className={"password-icon"} type="password" placeholder={"Потвердите пароль *"} onChange={(event) => setPasswordConfirm(event.target.value)}/>
                            <span className={"input-message"}></span>
                        </div>
                        <div className={"sign-up-l-elem"} ref={refAllowPolicy}>
                            <div className={"div-input-checkbox"}>
                                <div className={"checkbox-div"}></div>
                                <input id={"id-policy"} type="checkbox" onChange={(event) => setAllowPolicy(!allowPolicy)}/>
                                <label className={"checkbox-label"} htmlFor={"id-policy"}></label>
                                <span className={"link"} onClick={openAllowPolicy}>Я согласен с политикой конфеденциальности</span>
                            </div>
                        </div>
                        <div className={"sign-up-l-elem"} ref={refAllowOffer}>
                            <div className={"div-input-checkbox"}>
                                <div className={"checkbox-div"}></div>
                                <input id={"id-offer"} type="checkbox" onChange={(event) => setAllowOffer(!allowOffer)}/>
                                <label className={"checkbox-label"} htmlFor={"id-offer"}></label>
                                <span className={"link"} onClick={openAllowOffer}>Я согласен с условиями договора-оферты</span>
                            </div>
                        </div>
                        <div className={"sign-up-l-elem bottom"}>
                            <button className={"btn btn-reg"} onClick={sendForm}>Зарегистрироваться</button>
                        </div>
                    </div>
                    <div className={"sign-up-l-bottom"}>
                        <div className={"sign-up-l-bottom-elem"}>
                            <span className={"link-sign-up-login"}>
                                У меня уже есть аккаунт,&nbsp;
                                <span onClick={toLogin} className={"link text-bold"}>Войти</span>
                            </span>
                        </div>
                        <div className={"sign-up-l-bottom-elem"}>
                            <div className={"line"}></div>
                        </div>
                        <div className={"sign-up-l-bottom-elem telegram"}>
                            <TelegramLoginComponent/>
                        </div>
                    </div>
                </div>
                <div className={"popup-right"}>
                    <div className={"popup-img sign-up-img"}>
                        <div className={"first"}>
                            <div onClick={closeWindow} className={"btn-close sign-up-close"}></div>
                        </div>
                        <div className={"second"}>
                            <svg className={"circle-1"} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="8" cy="8" r="8" fill="#EFB041"/>
                            </svg>
                            <svg  className={"circle-2"} viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="4" cy="4" r="4" fill="#EFB041"/>
                            </svg>
                        </div>
                        <div className={"third"}>
                            <div className={"sign-up-right-text"}>Попробуй себя в любительском футболе</div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

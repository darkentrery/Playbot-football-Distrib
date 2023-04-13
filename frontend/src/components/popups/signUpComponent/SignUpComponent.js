import React, {useState, useEffect, useRef} from "react";
import AuthService from "../../../services/AuthService";
import TelegramLoginComponent from "../../TelegramLoginComponent";
import Modal from "react-modal";
import $ from "jquery";
import {getLocationsAddressByCoordsGoogle} from "../../../services/LocationService";
import {RightFonComponent} from "../../rightFonComponent/RightFonComponent";
import {Link} from "react-router-dom";
import BaseRoutes from "../../../routes/BaseRoutes";
import {blockBodyScroll} from "../../../utils/manageElements";


export default function SignUpComponent ({isOpen, isIPhone, closeComponent, openLogin, openSuccessSignUp, showMap}) {
    const authService = new AuthService();
    const [username, setUsername] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState(false);
    const [phoneCode, setPhoneCode] = useState("+7");
    const [email, setEmail] = useState(false);
    const [password, setPassword] = useState(false);
    const [address, setAddress] = useState(false);
    const [passwordConfirm, setPasswordConfirm] = useState(false);
    const [allowPolicy, setAllowPolicy] = useState(false);
    const [allowOffer, setAllowOffer] = useState(false);
    const [isDropdown, setIsDropdown] = useState(false);
    const [countryTag, setCountryTag] = useState([]);
    const [countries, setCountries] = useState(false);
    const [banner, setBanner] = useState(false);

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
    const refBottom = useRef();
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

    function phoneInput(elem) {
        let value = elem.value.replace(/\D/g, "").slice(1, 11);
        let formatValue = `${phoneCode}`;
        if (value.length > 0 && value.length < 4) {
            formatValue = `${phoneCode} (${value}`;
        } else if (value.length > 3 && value.length < 7) {
            formatValue = `${phoneCode} (${value.slice(0, 3)})-${value.slice(3, 6)}`;
        } else if (value.length > 6) {
            formatValue = `${phoneCode} (${value.slice(0, 3)})-${value.slice(3, 6)}-${value.slice(6, 10)}`;
        }
        elem.value = formatValue;
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
        let  code = parent.find('.code').html();
        setPhoneCode(code);
        let formatPhone = code + $(refPhoneNumber.current).find('.phone-input').html().slice(2, 15);
        $(refPhoneNumber.current).find('.phone-input').val(formatPhone);
        openDropdown();
    }

    const clickPhoneInput = (e) => {
        if ($(e.target).val().length === 0) $(e.target).val(phoneCode);
    }

    useEffect(() => {
        if (!countries && isOpen) {
            authService.getCountries(setBanner).then((response) => {
                setCountries(response);
            })
        }
        if (isOpen) {
            navigator.geolocation.getCurrentPosition((response) => {
                let coords = [response.coords.latitude, response.coords.longitude];
                console.log(address)
                if (!address) {
                    getLocationsAddressByCoordsGoogle(coords).then((address) => {
                        console.log(address)
                        setAddress(address);
                    })
                }
            }, (error) => {
                console.log(error)
            });
        }
        blockBodyScroll(isOpen);
    }, [isOpen])

    const closeWindow = () => {
        setUsername(false);
        setPhoneNumber(false);
        setEmail(false);
        setPassword(false);
        setPasswordConfirm(false);
        setAllowPolicy(false);
        setAllowOffer(false);
        setIsDropdown(false);
        setAddress(false);
        refArrowIcon.current.className = "down-arrow-icon";
        $(refPhoneNumber.current).removeClass('open');
        closeComponent();
    }

    const toMenu = () => {
        closeWindow();
        showMap();
    }

    const toLogin = () => {
        closeWindow();
        openLogin();
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

    const hiddenFrames = (e) => {
        let elem = $(refPassword.current).children('.generate-password');
        if ($(e.target).attr('placeholder') !== "Пароль *" && !elem.hasClass('disabled')) {
            elem.addClass('disabled');
        }
        if (isDropdown && !$(e.target).hasClass('dropdown-elem') && !$(e.target).hasClass('search-icon')) {
            setIsDropdown(!isDropdown);
            refArrowIcon.current.className = "down-arrow-icon";
            $(refPhoneNumber.current).removeClass('open');
        }
        if ($(e.target)[0].nodeName !== "INPUT") $('.btn.btn-reg').focus();
    }

    const sendForm = () => {
        let user = {
            "username": username,
            "email": email,
            "password": password,
            "address": address
        }
        if (phoneNumber) {
            user.phone_number = `${phoneCode}${phoneNumber}`;
        }
        let errors = authService.signUpRequestValidation(username, phoneNumber, email, password, passwordConfirm, allowPolicy, allowOffer, refs, refsDict);
        if (!errors.length){
            authService.signUp(user).then((response) => {
                errors = authService.signUpResponseValidation(response, refsDict);
                if (!errors.size) {
                    closeWindow();
                    openSuccessSignUp();
                }
            })
        }
    }

    return(
        <Modal
            isOpen={isOpen}
            // onAfterOpen={afterOpenModal}
            // onRequestClose={closeModal}
            // style={customStyles}
            className={"popup-fon"}
            contentLabel="Example Modal"
            ariaHideApp={false}
        >
            <div className={"popup-frame sign-up-component"} onClick={hiddenFrames}>
                <div className={"popup-left"}>
                    <div className={"sign-up-l-body"}>
                        <div className={"sign-up-l-elem head"}>
                            <span className={"black-600-22"}>Регистрация</span>
                            <div onClick={toMenu} className={"btn-close sign-up-close left"}></div>
                        </div>
                        <div className={"sign-up-content scroll"}>
                            <div className={"sign-up-l-elem div-input"} ref={refUsername}>
                                <input className={"name-icon"} type="text" placeholder={"Username *"} onChange={(event) => setUsername(event.target.value)}/>
                                <span className={"input-message"}></span>
                            </div>
                            <div className={"sign-up-l-elem phone-field"} ref={refPhoneNumber}>
                                <div className={"dropdown-country"}>
                                    <span className={"dropdown-label"} ref={refPhoneCode} onClick={openDropdown}>
                                        <img src={banner ? banner : ''} alt=""/>
                                    </span>
                                    <div className={"down-arrow-icon"} ref={refArrowIcon} onClick={openDropdown}></div>
                                    <div className={`dropdown-menu ${isDropdown ? 'open' : ''}`}>
                                        <input className={"search-icon"} type="text" placeholder={"Найти страну"}
                                               onChange={(event) => authService.searchCountry(event, refCountryBody, countryTag, setCountryTag, setPhoneCode)}/>
                                        <div className={"dropdown-body"} ref={refCountryBody}>
                                            {countries && countries.map((item, key) => (
                                                <div className={"dropdown-elem"} onClick={choicePhoneCode} key={key}>
                                                    <span className={"country"}>{item[0]}</span>
                                                    <span className={"code"}>{item[1]}</span>
                                                    <img className={"banner"} src={item[2]} alt=""/>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <input className={"phone-input"} onClick={clickPhoneInput} type="text" placeholder={"Телефон"}  onChange={(event) => phoneInput(event.target)}/>
                            </div>
                            <div className={"sign-up-l-elem div-input"} ref={refEmail}>
                                <input className={"email-icon"} type="text" placeholder={"Почта *"} onChange={(event) => setEmail(event.target.value)}/>
                                <span className={"input-message"}></span>
                            </div>
                            <div className={"sign-up-l-elem div-input elem-5"} ref={refPassword}>
                                <input className={"password-icon"} type="password" placeholder={"Пароль *"} onClick={suggestPassword} onChange={(event) => setPassword(event.target.value)}/>
                                <span className={"input-message"}></span>
                                <span className={"generate-password black-400-12 disabled"} onClick={usePassword}>
                                    Сгенерированный пароль: <span className={"new-password"}></span>
                                </span>
                            </div>
                            <div className={"sign-up-l-elem div-input"} ref={refPasswordConfirm}>
                                <input className={"password-icon"} type="password" placeholder={"Потвердите пароль *"} onChange={(event) => setPasswordConfirm(event.target.value)}/>
                                <span className={"input-message"}></span>
                            </div>
                            <div className={"sign-up-l-elem div-input-checkbox"} ref={refAllowPolicy}>
                                <div className={"checkbox-div"}></div>
                                <input id={"id-policy"} type="checkbox" onChange={(event) => setAllowPolicy(!allowPolicy)}/>
                                <label className={"checkbox-label"} htmlFor={"id-policy"}></label>
                                <Link className={"gray-400-14 link"} to={BaseRoutes.allowPolicy} onClick={toMenu}>Я согласен с политикой конфеденциальности</Link>
                            </div>
                            <div className={"sign-up-l-elem div-input-checkbox"} ref={refAllowOffer}>
                                <div className={"checkbox-div"}></div>
                                <input id={"id-offer"} type="checkbox" onChange={(event) => setAllowOffer(!allowOffer)}/>
                                <label className={"checkbox-label"} htmlFor={"id-offer"}></label>
                                <Link className={"gray-400-14 link"} to={BaseRoutes.allowOffer} onClick={toMenu}>Я согласен с условиями договора-оферты</Link>
                            </div>
                        </div>
                        <button className={"sign-up-l-elem btn btn-reg"} autoFocus={true} onClick={sendForm}>Зарегистрироваться</button>
                    </div>
                    <div className={`sign-up-l-bottom ${isIPhone ? 'safari-margin' : ''}`} ref={refBottom}>
                        <div className={"sign-up-l-bottom-elem"}>
                            <span className={"gray-400-14"}>У меня уже есть аккаунт,&nbsp;</span>
                            <span className={"gray-600-14 link"} onClick={toLogin} >Войти</span>
                        </div>
                        <div className={"sign-up-l-bottom-elem telegram"}>
                            <TelegramLoginComponent/>
                        </div>
                    </div>
                </div>
                <RightFonComponent
                    className={"popup-right"}
                    close={toMenu}
                    slider={isOpen && window.screen.width > 743 ? true : false}
                    contents={["Попробуй себя в любительском футболе", "Попробуй себя в любительском футболе"]}
                    imageClasses={["sign-up-fon", "sign-up-fon"]}
                />
            </div>
        </Modal>
    )
}

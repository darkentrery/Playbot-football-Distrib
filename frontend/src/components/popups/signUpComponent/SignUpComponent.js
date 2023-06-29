import React, {useState, useEffect, useRef} from "react";
import AuthService from "../../../services/AuthService";
import TelegramLoginComponent from "../../TelegramLoginComponent";
import Modal from "react-modal";
import {Link} from "react-router-dom";
import BaseRoutes from "../../../routes/BaseRoutes";
import {InputComponent} from "../../inputComponent/InputComponent";
import {useDispatch} from "react-redux";
import {allowPolicyWindow} from "../../../redux/actions/actions";


export default function SignUpComponent ({isOpen, isIPhone, closeComponent, openLogin, openSuccessSignUp, showMap}) {
    const authService = new AuthService();
    const [email, setEmail] = useState(false);
    const [password, setPassword] = useState(false);
    const [passwordConfirm, setPasswordConfirm] = useState(false);
    const [allowPolicy, setAllowPolicy] = useState(false);
    const [allowOffer, setAllowOffer] = useState(false);
    const dispatch = useDispatch();

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [passwordConfirmError, setPasswordConfirmError] = useState(false);
    const [allowPolicyError, setAllowPolicyError] = useState(false);
    const [allowOfferError, setAllowOfferError] = useState(false);
    const [rightIcon, setRightIcon] = useState('eye-icon');
    const [typePassword, setTypePassword] = useState(true);

    const refSignUp = useRef(null);
    const refAllowPolicy = useRef();
    const refAllowOffer = useRef();
    const refBottom = useRef();

    const openAllowPolicy = () => {
        dispatch(allowPolicyWindow(true));
    }

    const dropErrors = () => {
        setEmailError(false);
        setPasswordError(false);
        setPasswordConfirmError(false);
        setAllowPolicyError(false);
        setAllowOfferError(false);
    }

    const closeWindow = () => {
        setEmail(false);
        setPassword(false);
        setPasswordConfirm(false);
        setAllowPolicy(false);
        setAllowOffer(false);
        dropErrors();
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

    const hiddenPassword = () => {
        if (typePassword) {
            setTypePassword(false);
            setRightIcon('eye-icon off');
        } else {
            setTypePassword(true);
            setRightIcon('eye-icon');
        }
    }

    const hiddenFrames = (e) => {
        if (e.target.nodeName !== "INPUT") refSignUp.current.focus();
    }

    const clickEnter = (e) => {
        if (e.keyCode === 13) {
            sendForm();
        }
    }

    const clickAllowPolicy = () => {
        setAllowPolicy(!allowPolicy);
        setAllowPolicyError(false);
    }

    const clickAllowOffer = () => {
        setAllowOffer(!allowOffer);
        setAllowOfferError(false);
    }

    const signUpRequestValidation = () => {
        let isValid = true;
        if (!email) {
            setEmailError("Это поле обязательно для заполнения!");
            isValid = false;
        }
        if (!password) {
            setPasswordError("Это поле обязательно для заполнения!");
            isValid = false;
        }
        if (!passwordConfirm) {
            setPasswordConfirmError("Это поле обязательно для заполнения!");
            isValid = false;
        }
        if (!allowOffer) {
            setAllowOfferError("Это поле обязательно для заполнения!");
            isValid = false;
        }
        if (!allowPolicy) {
            setAllowPolicyError("Это поле обязательно для заполнения!");
            isValid = false;
        }
        if (password && passwordConfirm && password !== passwordConfirm) {
            setPasswordError("Пароли не совпадают!");
            setPasswordConfirmError("Пароли не совпадают!");
            isValid = false;
        }

        return isValid;
    }

    const sendForm = () => {
        dropErrors();
        let user = {
            "email": email,
            "password": password,
        }
        let isValid = signUpRequestValidation();
        if (isValid){
            authService.signUp(user).then((response) => {
                console.log(response)
                if (response.status === 201) {
                    closeWindow();
                    openSuccessSignUp();
                } else {
                    if (response.data.email) {
                        if (response.data.email.includes("Введите правильный адрес электронной почты.")) setEmailError("Введите правильный адрес электронной почты!");
                        if (response.data.email.includes("User с таким Email Address уже существует.")) setEmailError("Пользователь с таким email уже существует!");
                    }
                }
            })
        }
    }

    return(
        <Modal
            isOpen={isOpen}
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
                            <InputComponent
                                leftIcon={'email-icon'} value={email} setValue={setEmail} errorText={emailError}
                                placeholder={"Почта *"} onKeyUp={clickEnter}
                            />
                            <InputComponent
                                leftIcon={"password-icon"} rightIcon={rightIcon} password={typePassword} placeholder={"Пароль *"}
                                errorText={passwordError} value={password} setValue={setPassword} rightOnClick={hiddenPassword}
                                onKeyUp={clickEnter}
                            />
                            <InputComponent
                                leftIcon={"password-icon"} rightIcon={rightIcon} password={typePassword} placeholder={"Потвердите пароль *"}
                                errorText={passwordConfirmError} value={passwordConfirm} setValue={setPasswordConfirm} rightOnClick={hiddenPassword}
                                onKeyUp={clickEnter}
                            />
                            {/*<div className={"sign-up-l-elem div-input elem-5"} ref={refPassword}>*/}
                            {/*    <input className={"password-icon"} type="password" placeholder={"Пароль *"} onClick={suggestPassword} onChange={(event) => setPassword(event.target.value)}/>*/}
                            {/*    <span className={"input-message"}></span>*/}
                            {/*    <span className={"generate-password black-400-12 disabled"} onClick={usePassword}>*/}
                            {/*        Сгенерированный пароль: <span className={"new-password"}></span>*/}
                            {/*    </span>*/}
                            {/*</div>*/}
                            {/*<div className={"sign-up-l-elem div-input"} ref={refPasswordConfirm}>*/}
                            {/*    <input className={"password-icon"} type="password" placeholder={"Потвердите пароль *"} onChange={(event) => setPasswordConfirm(event.target.value)}/>*/}
                            {/*    <span className={"input-message"}></span>*/}
                            {/*</div>*/}
                            <div className={"sign-up-l-elem div-input-checkbox"} ref={refAllowPolicy}>
                                <div className={`checkbox-div ${allowPolicyError ? 'error' : ''}`}></div>
                                <input id={"id-policy"} type="checkbox" onChange={clickAllowPolicy}/>
                                <label className={"checkbox-label"} htmlFor={"id-policy"}></label>
                                <span className={"gray-400-14 link label-link"} onClick={openAllowPolicy}>Я согласен с политикой конфеденциальности</span>
                                {/*<Link className={"gray-400-14 link"} to={BaseRoutes.allowPolicy} target={"_blank"}>Я согласен с политикой конфеденциальности</Link>*/}
                            </div>
                            <div className={"sign-up-l-elem div-input-checkbox"} ref={refAllowOffer}>
                                <div className={`checkbox-div ${allowOfferError ? 'error' : ''}`}></div>
                                <input id={"id-offer"} type="checkbox" onChange={clickAllowOffer}/>
                                <label className={"checkbox-label"} htmlFor={"id-offer"}></label>
                                <Link className={"gray-400-14 link"} to={BaseRoutes.allowOffer} target={"_blank"}>Я согласен с условиями договора-оферты</Link>
                            </div>
                        </div>
                        <div className={"sign-up-l-elem gap-element"}></div>
                        <button className={"sign-up-l-elem btn btn-reg"} autoFocus={true} onClick={sendForm} ref={refSignUp}>Зарегистрироваться</button>
                    </div>
                    <div className={`sign-up-l-bottom ${isIPhone ? 'safari-margin' : ''}`} ref={refBottom}>
                        <div className={"sign-up-l-bottom-elem"}>
                            <span className={"gray-400-14"}>У меня уже есть аккаунт,&nbsp;</span>
                            <span className={"gray-600-14 link"} onClick={toLogin} >Войти</span>
                        </div>
                        <div className={"sign-up-l-bottom-elem telegram"}>
                        {/*    <TelegramLoginComponent/>*/}
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

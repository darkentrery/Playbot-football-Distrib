import React, { useState, useEffect } from "react";
import AuthService, {authService} from "../services/AuthService";
import TelegramLoginComponent from "./TelegramLoginComponent";
import Modal from "react-modal";
import $ from 'jquery';
import {InputComponent} from "./inputComponent/InputComponent";


export default function LoginComponent ({isOpen, closeComponent, openSignUp, openRefreshPassword, setAuth, showMap}) {
    const authServicee = new AuthService();
    const [email, setEmail] = useState(false);
    const [password, setPassword] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [typePassword, setTypePassword] = useState(true);
    const [rightIcon, setRightIcon] = useState('eye-icon');
    const [data, setData] = useState(false);

    useEffect(() => {
        let bodyFormData = new FormData();
        setEmailError('');
        setPasswordError('');
        bodyFormData.append('email', email);
        bodyFormData.append('password', password);
        setData(bodyFormData);
    }, [email, password]);

    const closeWindow = () => {
        setEmail(false);
        setPassword(false);
        setData(false);
        closeComponent();
    }

    const toMenu = () => {
        closeWindow();
        showMap();
    }

    const toSignUp = () => {
        closeWindow();
        openSignUp();
    }

    const toRefreshPassword = () => {
        closeWindow();
        openRefreshPassword();
    }

    const sendForm = () => {
        let errors = authServicee.loginRequestValidation(email, password, setEmailError, setPasswordError);
        if (!errors.length) {
            authService.login(data).then((response) => {
                errors = authServicee.loginResponseValidation(response, setEmailError, setPasswordError);
                if (!errors.length) {
                    setAuth(true, response.data.user);
                    closeWindow();
                    showMap();
                }
            })
        }
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
        if ($(e.target)[0].nodeName !== "INPUT") $('.btn.btn-login').focus();
    }

    return(
        <Modal
            isOpen={isOpen}
            className={"popup-fon"}
            contentLabel="Example Modal"
            ariaHideApp={false}
        >
            <div className={"popup-frame login"} onClick={hiddenFrames}>
                <div className={"popup-left"}>
                    <div className={"login-l-body"}>
                        <div className={"login-l-elem close"}>
                            <div onClick={toMenu} className={"btn-close login-close"}></div>
                        </div>
                        <div className={"login-l-elem login-l-head-elem"}>
                            <div className={"login-title"}>Вход</div>
                        </div>
                        <InputComponent leftIcon={'name-icon'} value={email} setValue={setEmail} errorText={emailError}
                                        placeholder={"Номер телефона или e-mail"} className={'login-l-elem'}/>
                        <InputComponent leftIcon={"password-icon"} rightIcon={rightIcon} password={typePassword}
                                        className={"login-l-elem"} placeholder={"Пароль"} errorText={passwordError}
                                        value={password} setValue={setPassword} rightOnClick={hiddenPassword}/>
                        <div className={"login-l-elem"}>
                            <button className={"btn btn-login"} autoFocus={true} onClick={sendForm}>Войти</button>
                        </div>
                        <div className={"login-l-elem"}>
                            <span onClick={toSignUp} className={"link link-login-reg gray-600-14"}>Регистрация</span>
                            <span onClick={toRefreshPassword} className={"link link-login-reg gray-600-14"}>Забыли пароль?</span>
                        </div>
                        <div className={"login-l-elem login-l-elem-line"}>
                            <div className={"line"}></div>
                        </div>
                        <div className={"login-l-elem login-l-bottom-elem"}>
                            <TelegramLoginComponent/>
                        </div>
                    </div>
                </div>
                <div className={"popup-right"}>
                    <div className={"popup-img login-img"}>
                        <div className={"first"}>
                            <div onClick={toMenu} className={"btn-close login-close"}></div>
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
                            <div className={"login-right-text"}>Попробуй себя в любительском футболе</div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

import React, { useState, useEffect, useContext, useRef } from "react";
import AuthService from "../services/AuthService";
import TelegramLoginComponent from "./TelegramLoginComponent";
import Modal from "react-modal";
import $ from 'jquery';
import BaseRoutes from "../routes/BaseRoutes";


export default function LoginComponent ({isOpenLogin, openSignUp, closeLogin, openRefreshPassword}) {
    const authService = new AuthService();
    const [email, setEmail] = useState(false);
    const [password, setPassword] = useState(false);
    const [data, setData] = useState(false);
    const refEmail = useRef();
    const refPassword = useRef();

    useEffect(() => {
        let bodyFormData = new FormData();
        bodyFormData.append('email', email);
        bodyFormData.append('password', password);
        setData(bodyFormData);
    }, [email, password]);

    const closeWindow = () => {
        setEmail(false);
        setPassword(false);
        setData(false);
        closeLogin();
        // setOpenLogin(!openLogin);
    }

    const toSignUp = () => {
        closeWindow();
        openSignUp();
    }

    const toRefreshPassword = () => {
        closeWindow();
        openRefreshPassword();
    }

    const sendForm = async () => {
        let errors = authService.loginRequestValidation(email, password, refEmail, refPassword);
        if (!errors.length) {
            await authService.login(data).then((response) => {
                console.log(response)
                errors = authService.loginResponseValidation(response, refEmail, refPassword);
                if (!errors.length) {
                    closeWindow();
                    window.location.href = `${process.env.REACT_APP_MAIN_URL}${BaseRoutes.events}`;
                }
            })
        }
    }

    const hiddenPassword = (event) => {
        if ($(event.target).attr('class').includes("off")) {
            $(event.target).removeClass('off');
            $(event.target).parent('div').find('input').attr('type', 'password');
        } else {
            $(event.target).addClass('off');
            $(event.target).parent('div').find('input').attr('type', 'text');
        }
    }

    const hiddenFrames = (e) => {
        if ($(e.target)[0].nodeName !== "INPUT") $('.btn.btn-login').focus();
    }

    return(
        <Modal
            isOpen={isOpenLogin}
            className={"popup-fon"}
            contentLabel="Example Modal"
            ariaHideApp={false}
        >
            <div className={"popup-frame login"} onClick={hiddenFrames}>
                <div className={"popup-left"}>
                    <div className={"login-l-body"}>
                        <div className={"login-l-elem close"}>
                            <div onClick={closeWindow} className={"btn-close login-close"}></div>
                        </div>
                        <div className={"login-l-elem login-l-head-elem"}>
                            <div className={"login-title"}>Вход</div>
                        </div>
                        <div className={"login-l-elem div-input"} ref={refEmail}>
                            <input className={"name-icon"} type="text" placeholder={"Номер телефона или e-mail"} onChange={(event) => setEmail(event.target.value)}/>
                            <span className={"input-message"}></span>
                        </div>
                        <div className={"login-l-elem div-input password-elem"} ref={refPassword}>
                            <input className={"password-icon password-input"} type="password" placeholder={"Пароль"} onChange={(event) => setPassword(event.target.value)}/>
                            <span className={"input-message"}></span>
                            <div className={"eye-icon right-input-icon"} onClick={hiddenPassword}></div>
                        </div>
                        <div className={"login-l-elem"}>
                            <button className={"btn btn-login"} autoFocus={true} onClick={sendForm}>Войти</button>
                        </div>
                        <div className={"login-l-elem"}>
                            <span onClick={toSignUp} className={"link link-login-reg"}>Регистрация</span>
                            <span onClick={toRefreshPassword} className={"link link-login-reg"}>Забыли пароль?</span>
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
                            <div onClick={closeWindow} className={"btn-close login-close"}></div>
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

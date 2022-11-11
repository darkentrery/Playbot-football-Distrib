import React, { useState, useEffect, useContext } from "react";
import AuthService from "../services/AuthService";
import TelegramLoginComponent from "./TelegramLoginComponent";
import Modal from "react-modal";
import {OpenLoginContext, OpenSignUpContext, OpenRefreshPasswordContext} from "../context/AuthContext";
import $ from 'jquery';


export default function LoginComponent () {
    const authService = new AuthService();
    const [email, setEmail] = useState(false);
    const [password, setPassword] = useState(false);
    const [data, setData] = useState("No");

    const {openSignUp, setOpenSignUp} = useContext(OpenSignUpContext);
    const {openLogin, setOpenLogin} = useContext(OpenLoginContext);
    const {openRefreshPassword, setOpenRefreshPassword} = useContext(OpenRefreshPasswordContext);

    useEffect(() => {
        let bodyFormData = new FormData();
        bodyFormData.append('email', email);
        bodyFormData.append('password', password);
        setData(bodyFormData)
    }, [email, password]);

    const sendForm = async () => {
        if (email && password) {
            console.log(localStorage.getItem("access_token"))
            console.log(localStorage.getItem("refresh_token"))
            await authService.login(data).then((response) => {
                console.log(response)
            })
        }
    }

    const hiddenPassword = (event) => {
        if ($(event.target).attr('class').includes("off")) {
            $(event.target).removeClass('off');
            $(event.target).parent('div').children('input').attr('type', 'password');
        } else {
            $(event.target).addClass('off');
            $(event.target).parent('div').children('input').attr('type', 'text');
        }
    }

    return(
        <Modal
            isOpen={openLogin}
            className={"popup-fon"}
            contentLabel="Example Modal"
            ariaHideApp={false}
        >
            <div className={"popup-frame login"}>
                <div className={"popup-left"}>
                    <div className={"login-l-body"}>
                        <div className={"login-l-elem close"}>
                            <div onClick={() => {setOpenLogin(!openLogin)}} className={"btn-close login-close"}></div>
                        </div>
                        <div className={"login-l-elem login-l-head-elem"}>
                            <div className={"login-title"}>Вход</div>
                        </div>
                        <div className={"login-l-elem"}>
                            <div className={"div-input"}>
                                <input className={"name-icon"} type="text" placeholder={"Номер телефона или e-mail"} onChange={(event) => setEmail(event.target.value)}/>
                            </div>
                        </div>
                        <div className={"login-l-elem"}>
                            <div className={"div-input"}>
                                <input className={"password-icon password-input"} type="text" placeholder={"Пароль"} onChange={(event) => setPassword(event.target.value)}/>
                                <div className={"eye-icon right-input-icon"} onClick={hiddenPassword}></div>
                            </div>
                        </div>
                        <div className={"login-l-elem"}>
                            <button className={"btn btn-login"} onClick={sendForm}>Войти</button>
                        </div>
                        <div className={"login-l-elem"}>
                            <a onClick={() => {
                                setOpenLogin(!openLogin)
                                setOpenSignUp(!openSignUp)
                            }} className={"link link-login-reg"}>Регистрация</a>
                            <a onClick={() => {
                                setOpenLogin(!openLogin)
                                setOpenRefreshPassword(!openRefreshPassword)
                            }} className={"link link-login-reg"}>Забыли пароль?</a>
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
                            <div onClick={() => {setOpenLogin(!openLogin)}} className={"btn-close login-close"}></div>
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

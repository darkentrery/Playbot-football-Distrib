import React, {Component, useState, useEffect, useRef, useContext} from "react";
import AuthService from "../services/AuthService";
import TelegramLoginComponent from "./TelegramLoginComponent";
import Modal from "react-modal";
import {OpenLoginContext, OpenSignUpContext, OpenRefreshPasswordContext} from "../context/AuthContext";
import CheckToken from "../services/AuthDecorator";
import avatarIcon from "../assets/icon/avatar.png";
import passwordIcon from "../assets/icon/password.png";
import eyeIcon from "../assets/icon/eye.png";


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


    const [isLogin, setIsLogin] = useState(false);
    CheckToken(authService.getData, [], isLogin, setIsLogin);


    const sendForm = () => {
        if (email && password) {
            console.log(localStorage.getItem("access_token"))
            console.log(localStorage.getItem("refresh_token"))
            authService.login(data).then((response) => {
                console.log(response)
            })
            // authService.getData(setIsLogin).then((response) => {
            //     if (response.status == 200) {
            //         console.log(response)
            //     }
            // })

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
                        <div className={"login-l-elem login-l-head-elem"}>
                            <div className={"login-title"}>Вход</div>
                        </div>
                        <div className={"login-l-elem"}>
                            <div className={"sign-up-div-input"}>
                                <input type="text" placeholder={"Номер телефона или e-mail"} onChange={(event) => setEmail(event.target.value)}/>
                                <div className={"left-input-icon"}>
                                    <img className={"name-icon"} src={avatarIcon} alt=""/>
                                </div>
                            </div>
                        </div>
                        <div className={"login-l-elem"}>
                            <div className={"sign-up-div-input"}>
                                <input type="text" placeholder={"Пароль"} onChange={(event) => setPassword(event.target.value)}/>
                                <div className={"left-input-icon"}>
                                    <img className={"password-icon"} src={passwordIcon} alt=""/>
                                </div>
                                <div className={"right-input-icon"}>
                                    <img className={"eye-icon"} src={eyeIcon} alt=""/>
                                </div>
                            </div>
                        </div>
                        <div className={"login-l-elem"}>
                            <button className={"btn btn-login"} onClick={sendForm}>
                                <div className={"btn-text"}>Войти</div>
                            </button>
                        </div>
                        <div className={"login-l-elem"}>

                        </div>
                        <div className={"login-l-elem"}>

                        </div>
                        <div className={"login-l-elem login-l-bottom-elem"}>

                        </div>
                    </div>
                </div>
                <div className={"popup-right"}>
                    <div className={"popup-img login-img"}>
                        <div onClick={() => {setOpenLogin(!openLogin)}} className={"btn-close"}>
                            <svg className={"icon-cross"} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M0.292893 0.292893C0.683417 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L8 6.58579L14.2929 0.292893C14.6834 -0.0976311 15.3166 -0.0976311 15.7071 0.292893C16.0976 0.683417 16.0976 1.31658 15.7071 1.70711L9.41421 8L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L8 9.41421L1.70711 15.7071C1.31658 16.0976 0.683417 16.0976 0.292893 15.7071C-0.0976311 15.3166 -0.0976311 14.6834 0.292893 14.2929L6.58579 8L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683417 0.292893 0.292893Z" fill="#1B1B1B"/>
                            </svg>
                        </div>
                         <svg  className={"sign-up-circle-2"} viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="4" cy="4" r="4" fill="#EFB041"/>
                        </svg>
                        <svg className={"sign-up-circle-1"} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="8" cy="8" r="8" fill="#EFB041"/>
                        </svg>

                        <div className={"login-right-text"}>Попробуй себя в любительском футболе</div>
                    </div>
                </div>
            </div>
            {/*<div>*/}
            {/*    <label>Email</label><br/>*/}
            {/*    <input className="form-control" type="text"  onChange={(event) => setEmail(event.target.value)}/><br/><br/>*/}
            {/*    <label>Password</label><br/>*/}
            {/*    <input className="form-control" type="text"  onChange={(event) => setPassword(event.target.value)}/><br/><br/>*/}
            {/*    <button onClick={sendForm}>Login</button>*/}
            {/*    <div className={"sign-up-l-bottom-elem"}>*/}
            {/*                <a onClick={() => {*/}
            {/*                    setOpenLogin(!openLogin)*/}
            {/*                    setOpenRefreshPassword(!openRefreshPassword)*/}
            {/*                }} className={"sign-up-btn-login"}>Забыли пароль?</a>*/}
            {/*            </div>*/}
            {/*    <TelegramLoginComponent/>*/}
            {/*</div>*/}
        </Modal>
    )
}

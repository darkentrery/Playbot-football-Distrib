import React, { useState, useRef} from "react";
import Modal from "react-modal";
import {InputComponent} from "../../inputComponent/InputComponent";
import {authService} from "../../../services/AuthService";


export default function RefreshPasswordComponent ({isOpen, closeComponent, openSuccess, openLogin, showMap}) {
    const [email, setEmail] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const refEnter = useRef(false);

    const closeWindow = () => {
        setEmail(false);
        setEmailError(false);
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

    const sendForm = async () => {
        if (email) {
            authService.refreshPassword({email: email}).then((response) => {
                if (response.status == 200) {
                    closeWindow();
                    openSuccess();
                } else {
                    setEmailError('Пользователей с таким email не зарегистрировано!');
                }
                console.log(response)
            })
        } else {
            setEmailError('Введите email!');
        }
    }

    const changeEmail = (value) => {
        setEmailError(false);
        setEmail(value);
    }

    const hiddenFrames = (e) => {
        if (e.target.nodeName !== "INPUT") {
            refEnter.current.focus();
        }
    }

    return(
        <Modal
            isOpen={isOpen}
            className={"popup-fon"}
            contentLabel="Example Modal"
            ariaHideApp={false}
        >
            <div className={"popup-frame refresh-password-component"} onClick={hiddenFrames}>
                <div className={"refresh-head-elem"}>
                    <div onClick={toLogin} className={"btn-back"}></div>
                    <div onClick={toMenu} className={"btn-close"}></div>
                </div>
                <span className={"refresh-title black-600-22"}>Забыли пароль?</span>
                <span className={"black-400-14 refresh-text"}>Напишите вашу почту, мы вышлем вам пароль.</span>
                <InputComponent leftIcon={"password-icon"} placeholder={"Почта *"} errorText={emailError}
                                value={email} setValue={changeEmail}
                />
                <button className={"btn"} autoFocus={true} onClick={sendForm} ref={refEnter}>Войти</button>
                <div className={"line"}></div>
                <div className={"refresh-bottom-elem"}>
                    {/*<TelegramLoginComponent/>*/}
                </div>
            </div>
        </Modal>
    )
}

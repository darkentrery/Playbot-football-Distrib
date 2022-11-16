import React, { useState, useEffect, useContext, useRef} from "react";
import AuthService from "../services/AuthService";
import TelegramLoginComponent from "./TelegramLoginComponent";
import Modal from "react-modal";
import {OpenLoginContext, OpenRefreshPasswordContext} from "../context/AuthContext";
import {getData} from "../services/AuthDecorator";


export default function RefreshPasswordComponent () {
    const authService = new AuthService();
    const [email, setEmail] = useState(false);
    const [data, setData] = useState(false);
    const refEmail = useRef();

    const {openLogin, setOpenLogin} = useContext(OpenLoginContext);
    const {openRefreshPassword, setOpenRefreshPassword} = useContext(OpenRefreshPasswordContext);

    useEffect(() => {
        let bodyFormData = new FormData();
        bodyFormData.append('email', email);
        setData(bodyFormData);
    }, [email])

    const closeWindow = () => {
        setEmail(false);
        setData(false);
        setOpenRefreshPassword(!openRefreshPassword);
    }

    const toLogin = () => {
        closeWindow();
        setOpenLogin(!openLogin);
    }

    const sendForm = async () => {
        if (email) {
            authService.refreshPassword(data).then((response) => {
                if (response.status == 200) {
                    setEmail(false);
                    setData(false);
                    setOpenRefreshPassword(!openRefreshPassword);
                    setOpenLogin(!openLogin);
                }
                console.log(response)
            })

            await getData(authService.getData, [], openLogin, setOpenLogin)
        }
    }

    return(
        <Modal
            isOpen={openRefreshPassword}
            className={"popup-fon"}
            contentLabel="Example Modal"
            ariaHideApp={false}
        >
            <div className={"popup-frame popup-frame-refresh"}>
                <div className={"refresh-body"}>
                    <div className={"refresh-elem refresh-head-elem"}>
                        <div onClick={toLogin} className={"btn-back refresh-back"}></div>
                        <div onClick={closeWindow} className={"btn-close refresh-close"}></div>
                    </div>
                    <div className={"refresh-elem refresh-elem-2"}>
                        <div className={"refresh-title"}>Забыли пароль?</div>
                    </div>
                    <div className={"refresh-elem refresh-elem-3"}>
                        <span className={"refresh-text"}>Напишите вашу почту, мы вышлем вам пароль.</span>
                    </div>
                    <div className={"refresh-elem div-input"}>
                        <input className={"email-icon"} type="text" placeholder={"Почта *"} onChange={(event) => setEmail(event.target.value)}/>
                        <span className={"input-message"}></span>
                    </div>
                    <div className={"refresh-elem refresh-elem-btn"}>
                        <button className={"btn btn-reg"} onClick={sendForm}>Войти</button>
                    </div>
                    <div className={"refresh-elem div-line"}>
                        <div className={"line"}></div>
                    </div>
                    <div className={"refresh-elem refresh-bottom-elem"}>
                        <TelegramLoginComponent/>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

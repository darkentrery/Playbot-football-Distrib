import React, { useState, useEffect, useContext} from "react";
import AuthService from "../services/AuthService";
import TelegramLoginComponent from "./TelegramLoginComponent";
import Modal from "react-modal";
import {OpenLoginContext, OpenRefreshPasswordContext} from "../context/AuthContext";
import emailIcon from "../assets/icon/email.png";
import {getData} from "../services/AuthDecorator";


export default function RefreshPasswordComponent () {
    const authService = new AuthService();
    const [email, setEmail] = useState(false);
    const [data, setData] = useState("No");

    const {openLogin, setOpenLogin} = useContext(OpenLoginContext);
    const {openRefreshPassword, setOpenRefreshPassword} = useContext(OpenRefreshPasswordContext);

    useEffect(() => {
        let bodyFormData = new FormData();
        bodyFormData.append('email', email);
        setData(bodyFormData);
    }, [email])

    const sendForm = async () => {
        if (email) {
            console.log(data)
            console.log(localStorage.getItem("access_token"))
            console.log(localStorage.getItem("refresh_token"))
            authService.refreshPassword(data).then((response) => {
                console.log(response)
            })

            // await getData(authService.getData, [], openLogin, setOpenLogin)
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
                        <div onClick={() => {
                            setOpenRefreshPassword(!openRefreshPassword)
                            setOpenLogin(!openLogin)
                        }} className={"btn-back refresh-back"}></div>
                        <div onClick={() => {setOpenRefreshPassword(!openRefreshPassword)}} className={"btn-close refresh-close"}></div>
                    </div>
                    <div className={"refresh-elem"}>
                        <div className={"refresh-title"}>Забыли пароль?</div>
                    </div>
                    <div className={"refresh-elem"}>
                        <span className={"refresh-text"}>Напишите вашу почту, мы вышлем вам пароль.</span>
                    </div>
                    <div className={"refresh-elem"}>
                        <div className={"div-input"}>
                            <input type="text" placeholder={"Почта *"} onChange={(event) => setEmail(event.target.value)}/>
                            <div className={"left-input-icon"}>
                                <img className={"email-icon"} src={emailIcon} alt=""/>
                            </div>
                        </div>
                    </div>
                    <div className={"refresh-elem"}>
                        <button className={"btn btn-reg"} onClick={sendForm}>
                            <div className={"btn-text"}>Войти</div>
                        </button>
                    </div>
                    <div className={"refresh-elem"}>
                        <div className={"line"}></div>
                    </div>
                    <div className={"refresh-elem refresh-bottom-elem"}>
                        <TelegramLoginComponent/>
                    </div>
                </div>
            </div>
            {/*<div>*/}
            {/*    <label>Email</label><br/>*/}
            {/*    <input className="form-control" type="text"  onChange={(event) => setEmail(event.target.value)}/><br/><br/>*/}
            {/*    <button onClick={sendForm}>Login</button>*/}
            {/*    <TelegramLoginComponent/>*/}
            {/*</div>*/}
        </Modal>
    )
}

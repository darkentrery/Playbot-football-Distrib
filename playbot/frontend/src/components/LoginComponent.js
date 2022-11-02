import React, {Component, useState, useEffect, useRef, useContext} from "react";
import AuthService from "../services/AuthService";
import TelegramLoginComponent from "./TelegramLoginComponent";
import Modal from "react-modal";
import {OpenLoginContext, OpenSignUpContext, OpenRefreshPasswordContext} from "../context/AuthContext";


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
    }, [email, password])

    const sendForm = () => {
        if (email && password) {
            console.log(data)
            console.log(localStorage.getItem("access_token"))
            console.log(localStorage.getItem("refresh_token"))
            authService.login(data).then((response) => {
                console.log(response)
            })
            // authService.refresh(localStorage.getItem("refresh_token")).then((response) => {
            //     console.log(response)
            // })
        }
    }

    return(
        <Modal
            isOpen={openLogin}
            // onAfterOpen={afterOpenModal}
            // onRequestClose={closeModal}
            // style={customStyles}
            className={"popup-fon"}
            contentLabel="Example Modal"
            ariaHideApp={false}
        >
            <div>
                <label>Email</label><br/>
                <input className="form-control" type="text"  onChange={(event) => setEmail(event.target.value)}/><br/><br/>
                <label>Password</label><br/>
                <input className="form-control" type="text"  onChange={(event) => setPassword(event.target.value)}/><br/><br/>
                <button onClick={sendForm}>Login</button>
                <div className={"sign-up-l-bottom-elem"}>
                            <a onClick={() => {
                                setOpenLogin(!openLogin)
                                setOpenRefreshPassword(!openRefreshPassword)
                            }} className={"sign-up-btn-login"}>Забыли пароль?</a>
                        </div>
                <TelegramLoginComponent/>
            </div>
        </Modal>
    )
}

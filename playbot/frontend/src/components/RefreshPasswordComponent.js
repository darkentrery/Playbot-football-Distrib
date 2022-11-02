import React, { useState, useEffect, useContext} from "react";
import AuthService from "../services/AuthService";
import TelegramLoginComponent from "./TelegramLoginComponent";
import Modal from "react-modal";
import {OpenLoginContext, OpenRefreshPasswordContext} from "../context/AuthContext";


export default function RefreshPasswordComponent () {
    const authService = new AuthService();
    const [email, setEmail] = useState(false);
    const [data, setData] = useState("No");

    const {openLogin, setOpenLogin} = useContext(OpenLoginContext);
    const {openRefreshPassword, setOpenRefreshPassword} = useContext(OpenRefreshPasswordContext);

    useEffect(() => {
        let bodyFormData = new FormData();
        bodyFormData.append('email', email);
        setData(bodyFormData)
    }, [email])

    const sendForm = () => {
        if (email) {
            console.log(data)
            console.log(localStorage.getItem("access_token"))
            console.log(localStorage.getItem("refresh_token"))
            authService.refreshPassword(data).then((response) => {
                console.log(response)
            })
        }
    }

    return(
        <Modal
            isOpen={openRefreshPassword}
            className={"popup-fon"}
            contentLabel="Example Modal"
            ariaHideApp={false}
        >
            <div>
                <label>Email</label><br/>
                <input className="form-control" type="text"  onChange={(event) => setEmail(event.target.value)}/><br/><br/>
                <button onClick={sendForm}>Login</button>
                <TelegramLoginComponent/>
            </div>
        </Modal>
    )
}

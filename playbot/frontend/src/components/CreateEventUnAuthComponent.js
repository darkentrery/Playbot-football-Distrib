import React, { useState, useEffect, useContext } from "react";
import Modal from "react-modal";
import {OpenCreateEventUnAuthContext} from "../context/EventContext";
import {OpenLoginContext, OpenSignUpContext} from "../context/AuthContext";


export default function CreateEventUnAuthComponent () {
    const { openCreateEventUnAuth, setOpenCreateEventUnAuth } = useContext(OpenCreateEventUnAuthContext);
    const { openLogin, setOpenLogin } = useContext(OpenLoginContext);
    const {openSignUp, setOpenSignUp} = useContext(OpenSignUpContext);

    const toLogin = () => {
        setOpenCreateEventUnAuth(!openCreateEventUnAuth);
        setOpenLogin(!openLogin);
    }

    const toSignUp = () => {
        setOpenCreateEventUnAuth(!openCreateEventUnAuth);
        setOpenSignUp(!openSignUp);
    }


    return(
        <Modal
            isOpen={openCreateEventUnAuth}
            className={"popup-fon"}
            contentLabel="Example Modal"
            ariaHideApp={false}
        >
            <div className={"popup-frame create-event"}>
                <div className={"popup-left"}>
                    <div className={"elem elem-1"}>
                        <span>Создайте свое событие</span>
                    </div>
                    <div className={"elem event-inactive"}></div>
                    <div className={"elem elem-10"}>
                        <button className={"btn btn-create-event disabled"}>Создать</button>
                    </div>
                </div>
                <div className={"popup-right popup-img create-event-img"}>
                    <div className={"elem-1"}>
                        <div onClick={(e) => setOpenCreateEventUnAuth(!openCreateEventUnAuth)} className={"btn-close"}></div>
                    </div>
                    <div className={"elem-3"}>
                        <span className={"text"}>Зарегестрируйся или авторизуйся, чтобы создать игру</span>
                    </div>
                    <div className={"elem-4"}>
                        <button className={"btn btn-login"} onClick={toLogin}>Регистрация / Вход</button>
                    </div>
                </div>
            </div>

            <div className={"popup-frame create-event-376"}>
                <div className={"elem elem-1"}>
                    <div onClick={(e) => setOpenCreateEventUnAuth(!openCreateEventUnAuth)} className={"btn-close"}></div>
                </div>
                <span className={"elem elem-2"}>Войдите или зарегистрируйтесь</span>
                <span className={"elem elem-3"}>Для того чтобы создать игру, нужно зарегистрироваться</span>
                <button className={"elem elem-4 btn"} onClick={toLogin}>Вход</button>
                <span className={"elem elem-5 link"} onClick={toSignUp}>Регистрация</span>
            </div>
        </Modal>
    )
}

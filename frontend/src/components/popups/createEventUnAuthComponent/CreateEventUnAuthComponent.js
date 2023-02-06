import React from "react";
import Modal from "react-modal";


export default function CreateEventUnAuthComponent ({isOpen, closeComponent, openLogin, openSignUp}) {

    const closeWindow = () => {
        closeComponent();
    }

    const toLogin = () => {
        closeWindow();
        openLogin();
    }

    const toSignUp = () => {
        closeWindow();
        openSignUp();
    }

    return(
        <Modal
            isOpen={isOpen}
            className={"popup-fon"}
            contentLabel="Example Modal"
            ariaHideApp={false}
        >
            <div className={"popup-frame create-event-un-auth-component"}>
                <div className={"popup-left"}>
                    <span className={"elem-1 black-600-22"}>Создайте свое событие</span>
                    <div className={"elem event-inactive"}></div>
                    <span className={"btn elem-2 disabled"}>Создать</span>
                </div>
                <div className={"popup-right sign-up-fon"}>
                    <div onClick={closeWindow} className={"btn-close"}></div>
                    <span className={"black-400-16"}>Зарегестрируйся или авторизуйся, чтобы создать игру</span>
                    <span className={"btn"} onClick={toLogin}>Регистрация / Вход</span>
                </div>
            </div>

            <div className={"popup-frame create-event-un-auth-376-component"}>
                <div className={"elem elem-1"}>
                    <div onClick={closeWindow} className={"btn-close"}></div>
                </div>
                <span className={"elem elem-2"}>Войдите или зарегистрируйтесь</span>
                <span className={"elem elem-3"}>Для того чтобы создать игру, нужно зарегистрироваться</span>
                <span className={"elem elem-4 btn"} onClick={toLogin}>Вход</span>
                <span className={"elem elem-5 link"} onClick={toSignUp}>Регистрация</span>
            </div>
        </Modal>
    )
}

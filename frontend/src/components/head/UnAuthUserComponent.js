import React from "react";


export default function UnAuthUserComponent ({state, openLogin, removeMap}) {

    const toLogin = () => {
        removeMap();
        openLogin();
    }

    return (
        <div className={"elem un-auth-user"}>
            <div onClick={toLogin} className={"avatar-black-icon"}></div>
            <span onClick={toLogin}>Регистрация / Вход</span>
        </div>
    )
}
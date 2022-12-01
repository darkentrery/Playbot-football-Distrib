import React from "react";


export default function UnAuthUserComponent ({state, openLogin}) {

    return (
        <div className={"elem un-auth-user"}>
            <div onClick={openLogin} className={"avatar-black-icon"}></div>
            <span onClick={openLogin}>Регистрация / Вход</span>
        </div>
    )
}
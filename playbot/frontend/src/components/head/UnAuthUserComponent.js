import React, {useContext} from "react";
import {OpenLoginContext} from "../../context/AuthContext";


export default function UnAuthUserComponent () {
    const {openLogin, setOpenLogin} = useContext(OpenLoginContext);

    return (
        <div className={"elem un-auth-user"}>
            <div onClick={(e) => setOpenLogin(!openLogin)} className={"avatar-black-icon"}></div>
            <span onClick={(e) => setOpenLogin(!openLogin)}>Регистрация / Вход</span>
        </div>
    )
}
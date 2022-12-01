import React, {useContext, useEffect, useState} from "react";
import {OpenLoginContext} from "../context/AuthContext";
import {Link, Route, Routes} from "react-router-dom";
import BaseRoutes from "../routes/BaseRoutes";
import UnAuthUserComponent from "./head/UnAuthUserComponent";
import UserComponent from "./head/UserComponent";
import {authDecoratorWithoutLogin} from "../services/AuthDecorator";
import EventService from "../services/EventService";
import $ from "jquery";
import VisibleUnAuthUser from "../redux/containers/VisibleUnAuthUser";


export default function HeadComponent () {
    const eventService = new EventService();
    const [isAuth, setIsAuth] = useState(false);
    const {openLogin, setOpenLogin} = useContext(OpenLoginContext);
    const loginWindow = { openLogin, setOpenLogin };

    const auth = async () => {
        await authDecoratorWithoutLogin(eventService.getCreateEvent, []).then((response) => {
            if (response.status == 200) {
                setIsAuth(true);
            } else {
                setIsAuth(false);
            }
            console.log(response)
        })
    }

    useEffect(() => {
        auth();
    }, [isAuth])

    const clickMenu = (e) => {
        let parent = $(e.target).parent('.elem-2');
        parent.children('a').removeClass('inactive');
        parent.children('a').addClass('inactive');
        $(e.target).removeClass('inactive');
    }


    return(
        <div className={"head"}>
            <div className={"elem elem-1 logo-korobka-icon"}></div>
            <div className={"elem elem-2"}>
                <Link className={"menu-point black-point-icon"} to={BaseRoutes.main} onClick={clickMenu}>Главная</Link>
                <Link className={"menu-point black-point-icon inactive"} to={BaseRoutes.events} onClick={clickMenu}>События</Link>
                <Link className={"menu-point black-point-icon inactive"} to={BaseRoutes.main} onClick={clickMenu}>Статистика</Link>
                <Link className={"menu-point black-point-icon inactive"} to={BaseRoutes.main} onClick={clickMenu}>FAQ</Link>
            </div>

            <div className={"elem"}>

            </div>
            <div className={"elem search-black-icon"}></div>

            {isAuth && <UserComponent/>}
            {!isAuth && <VisibleUnAuthUser/>}
        </div>
    )
}
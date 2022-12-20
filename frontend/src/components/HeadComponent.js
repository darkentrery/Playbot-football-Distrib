import React from "react";
import {Link} from "react-router-dom";
import BaseRoutes from "../routes/BaseRoutes";
import UserComponent from "./head/UserComponent";
import VisibleUnAuthUser from "../redux/containers/VisibleUnAuthUser";


export default function HeadComponent ({user, flagDropdown=false, funcs}) {

    return(
        <div className={"head"}>
            <div className={"elem elem-1 logo-korobka-icon"}></div>
            <div className={"elem elem-2"}>
                <Link
                    className={`menu-point black-point-icon ${window.location.pathname === `${BaseRoutes.main}` ? '' : 'inactive'}`}
                    to={BaseRoutes.main}
                >Главная</Link>
                <Link
                    className={`menu-point black-point-icon ${window.location.pathname === `${BaseRoutes.events}` ? '' : 'inactive'}`}
                    to={BaseRoutes.events}
                >События</Link>
                <Link
                    className={`menu-point black-point-icon ${window.location.pathname === `${BaseRoutes.statistic}` ? '' : 'inactive'}`}
                    to={BaseRoutes.statistic}
                    >Статистика</Link>
                <Link
                    className={`menu-point black-point-icon ${window.location.pathname === `${BaseRoutes.faq}` ? '' : 'inactive'}`}
                    to={BaseRoutes.faq}
                >FAQ</Link>
            </div>

            <div className={"elem"}>

            </div>
            <div className={"elem search-black-icon"}></div>

            {user.isAuth && <UserComponent user={user.user} flagDropdown={flagDropdown} funcs={funcs}/>}
            {!user.isAuth && <VisibleUnAuthUser/>}
        </div>
    )
}
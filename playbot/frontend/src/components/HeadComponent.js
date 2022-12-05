import React, {useRef} from "react";
import {Link} from "react-router-dom";
import BaseRoutes from "../routes/BaseRoutes";
import UserComponent from "./head/UserComponent";
import $ from "jquery";
import VisibleUnAuthUser from "../redux/containers/VisibleUnAuthUser";


export default function HeadComponent ({user, flagDropdown=false, funcs}) {
    const refMain = useRef();
    const refEvents = useRef();
    const refs = [
        refMain,
        refEvents,
    ]

    const clickMenu = (e) => {
        let parent = $(e.target).parent('.elem-2');
        parent.children('a').removeClass('inactive');
        parent.children('a').addClass('inactive');
        $(e.target).removeClass('inactive');
    }

    const firstLink = () => {
        refs.forEach(ref => {
            if (ref.current !== undefined && !ref.current.className.includes('inactive')) ref.current.className += ' inactive';
            if (ref.current !== undefined && ref.current.href === window.location.href) {
                ref.current.className = ref.current.className.replace(" inactive", "");
            }
            if (ref.current !== undefined && ref.current.href.includes('events')
                && window.location.href.includes('events')) {
                ref.current.className = ref.current.className.replace(" inactive", "");
            }
        })
    }

    firstLink();

    return(
        <div className={"head"}>
            <div className={"elem elem-1 logo-korobka-icon"}></div>
            <div className={"elem elem-2"}>
                <Link className={"menu-point black-point-icon inactive"} to={BaseRoutes.main} onClick={clickMenu} ref={refMain}>Главная</Link>
                <Link className={"menu-point black-point-icon inactive"} to={BaseRoutes.events} onClick={clickMenu} ref={refEvents}>События</Link>
                <Link className={"menu-point black-point-icon inactive"} to={BaseRoutes.main} onClick={clickMenu}>Статистика</Link>
                <Link className={"menu-point black-point-icon inactive"} to={BaseRoutes.main} onClick={clickMenu}>FAQ</Link>
            </div>

            <div className={"elem"}>

            </div>
            <div className={"elem search-black-icon"}></div>

            {user.isAuth && <UserComponent user={user.user} flagDropdown={flagDropdown} funcs={funcs}/>}
            {!user.isAuth && <VisibleUnAuthUser/>}
        </div>
    )
}
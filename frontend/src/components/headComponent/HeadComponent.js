import React, {useState} from "react";
import {Link} from "react-router-dom";
import BaseRoutes from "../../routes/BaseRoutes";
import UserComponent from "../userComponent/UserComponent";
import VisibleUnAuthUser from "../../redux/containers/VisibleUnAuthUser";
import {MainSearchComponent} from "../mainSearchComponent/MainSearchComponent";
import {LoaderComponent} from "../loaderComponent/LoaderComponent";


export default function HeadComponent ({user, city, funcs}) {
    const [isOpenSearch, setIsOpenSearch] = useState(false);

    return(
        <div className={"head-component"}>
            <Link className={"elem elem-1 logo-korobka-icon"} to={BaseRoutes.main}></Link>
            <div className={"elem elem-2"}>
                <Link
                    className={`menu-point menu-point-1 black-point-icon ${window.location.pathname === `${BaseRoutes.main}` ? '' : 'inactive'}`}
                    to={BaseRoutes.main}
                >Главная</Link>
                <Link
                    className={`menu-point menu-point-2 black-point-icon ${window.location.pathname === `${BaseRoutes.events}` ? '' : 'inactive'}`}
                    to={BaseRoutes.events}
                >События</Link>
                <Link
                    className={`menu-point menu-point-3 black-point-icon ${window.location.pathname === `${BaseRoutes.statistic}` ? '' : 'inactive'}`}
                    to={BaseRoutes.statistic}
                    >Лидеры</Link>
                <Link
                    className={`menu-point menu-point-4 black-point-icon ${window.location.pathname === `${BaseRoutes.faq}` ? '' : 'inactive'}`}
                    to={BaseRoutes.faq}
                >FAQ</Link>
            </div>

            <MainSearchComponent isOpen={isOpenSearch} setIsOpen={setIsOpenSearch}/>

            <div className={`elem search-black-icon ${isOpenSearch ? 'hidden' : ''}`} onClick={() => setIsOpenSearch(!isOpenSearch)}></div>

            {user.isAuth && <UserComponent user={user.user} funcs={funcs}/>}
            {user.isAuth === false && <VisibleUnAuthUser/>}
            {user.isAuth === null && <LoaderComponent width={30} height={30}/>}
        </div>
    )
}
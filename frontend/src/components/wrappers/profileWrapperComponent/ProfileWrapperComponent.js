import HeadComponent from "../../HeadComponent";
import BottomComponent from "../../BottomComponent";
import React from "react";
import {ProfileAsideComponent} from "../../profileAsideComponent/ProfileAsideComponent";
import {Link, useParams} from "react-router-dom";
import BaseRoutes from "../../../routes/BaseRoutes";
import ProfileRoutes from "../../../routes/ProfileRoutes";


export const ProfileWrapperComponent = ({
    state,
    children,
    funcs,
}) => {
    const params = useParams();
    const pk = params.pk;

    return (
        <main className={"main-wrapper-component"}>
            <HeadComponent user={state.user} funcs={funcs}/>
            <div className={"profile-wrapper-component scroll"}>
                <ProfileAsideComponent/>
                <div className={"my-profile"}>
                    <div className={"title-elem"}>
                        <span className={"black-700-28"}>Мой профиль</span>
                        <span className={"btn-second"}><div className={"black-ball-icon"}></div>Создать событие</span>
                    </div>
                    <div className={"navigate-bar-1280"}>
                        <Link
                            className={`nav-link ${window.location.pathname.includes('my-events') ? 'black-400-14 active' : 'A7-gray-400-14'}`}
                            to={ProfileRoutes.profileMyEventsLink(pk)}
                        >Мои события</Link>
                        <Link
                            className={`nav-link ${window.location.pathname.includes('favorites') ? 'black-400-14 active' : 'A7-gray-400-14'}`}
                            to={ProfileRoutes.profileFavoritesLink(pk)}
                        >Избранное</Link>
                        <Link
                            className={`nav-link ${window.location.pathname.includes('personal-data') ? 'black-400-14 active' : 'A7-gray-400-14'}`}
                            to={ProfileRoutes.profilePersonalDataLink(pk)}
                        >Личные данные</Link>
                    </div>
                    {children}
                </div>
            </div>
            <BottomComponent/>
        </main>
    )
}
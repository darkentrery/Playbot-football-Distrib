import HeadComponent from "../../HeadComponent";
import BottomComponent from "../../BottomComponent";
import React, {useEffect} from "react";
import {ProfileAsideComponent} from "../../profileAsideComponent/ProfileAsideComponent";
import {Link, useParams} from "react-router-dom";
import ProfileRoutes from "../../../routes/ProfileRoutes";
import {authService} from "../../../services/AuthService";


export const ProfileWrapperComponent = ({
    state,
    app,
    children,
    funcs,
}) => {
    const params = useParams();
    const pk = params.pk;

    useEffect(() => {
        if (!state.event.player || (state.event.player && state.event.player.id !== pk)) {
            authService.getUser(pk.toString()).then((response) => {
                if (response.status === 200) {
                    console.log(response)
                    funcs.setPlayer(response.data);
                }
            })
        }
    }, [pk])

    const getOpenCreateEvent = () => {
        if (state.user.isAuth) {
            funcs.setEvent(false);
            funcs.openCreateEvent();
        } else {
            funcs.openCreateEventUnAuth();
        }
    }

    return (
        <main className={"main-wrapper-component"}>
            <HeadComponent user={state.user} funcs={funcs}/>
            <div className={"profile-wrapper-component"}>
                <ProfileAsideComponent player={state.event.player} funcs={funcs}/>
                <div className={"my-profile"}>
                    <div className={"title-elem"}>
                        <span className={"black-700-28"}>Мой профиль</span>
                        <span className={"btn-second"} onClick={getOpenCreateEvent}><div className={"black-ball-icon"}></div>Создать событие</span>
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
            <div className={"profile-wrapper-component-376"}>
                {children}
            </div>
            <BottomComponent user={state.user.user} isIPhone={app.isIPhone}/>
        </main>
    )
}
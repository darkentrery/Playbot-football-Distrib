import HeadComponent from "../../headComponent/HeadComponent";
import BottomComponent from "../../bottomComponent/BottomComponent";
import React, { useEffect } from "react";
import { ProfileAsideComponent } from "../../profileAsideComponent/ProfileAsideComponent";
import { Link, useParams } from "react-router-dom";
import ProfileRoutes from "../../../routes/ProfileRoutes";
import { authService } from "../../../services/AuthService";
import { useDispatch } from "react-redux";
import { openLoadUserPhotoPopupAsAdmin } from "../../../redux/reducers/loadPhotoReducer";


export const ProfileWrapperComponent = ({
    state,
    app,
    children,
    funcs,
}) => {
    const { pk } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        if (!state.event.player || (state.event.player && state.event.player.id !== pk)) {
            funcs.setPlayer(false);
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

    const handleAdminUserPhotoLoad = () => {
        dispatch(openLoadUserPhotoPopupAsAdmin())
    }

    return (
        <main className={"main-wrapper-component"}>
            <HeadComponent user={state.user} funcs={funcs} />
            <div className={"profile-wrapper-component"}>
                <ProfileAsideComponent player={state.event.player} funcs={funcs} />
                <div className={"my-profile"}>
                    <div className={"title-elem"}>
                        <span className={"black-700-28"}>Мой профиль</span>
                        {((state.user.isAuth && state.user.user.is_organizer) || !state.user.isAuth) &&
                            <>
                                <span className="create-event-button only-desktop" onClick={getOpenCreateEvent}>
                                    <div className={"black-ball-icon"}></div>
                                    Создать событие
                                </span>
                                <div className="admin-profile-actions-744">
                                    <span className="create-event-button" onClick={getOpenCreateEvent}>
                                        <div className={"black-ball-icon"}></div>
                                        Создать событие
                                    </span>
                                    <button className="admin-load-user-photo-btn black-500-14 add-photo-icon">Загрузить фото других игроков</button>
                                </div>
                            </>
                        }
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
                        {
                            (state.user.isAuth && state.user.user.is_organizer) &&
                            <button className="admin-load-user-photo-btn black-500-14 add-photo-icon only-desktop" onClick={handleAdminUserPhotoLoad}>
                                Загрузить фото других игроков
                            </button>
                        }


                    </div>
                    {children}
                </div>
            </div>
            <div className={`profile-wrapper-component-376 ${app.isIPhone ? 'safari-margin' : ''}`}>
                {children}
            </div>
            <BottomComponent user={state.user.user} isIPhone={app.isIPhone} />
        </main>
    )
}
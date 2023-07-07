import HeadComponent from "../../headComponent/HeadComponent";
import BottomComponent from "../../bottomComponent/BottomComponent";
import React, { useEffect } from "react";
import { ProfileAsideComponent } from "../../profileAsideComponent/ProfileAsideComponent";
import { Link, useParams } from "react-router-dom";
import ProfileRoutes from "../../../routes/ProfileRoutes";
import { authService } from "../../../services/AuthService";
import { useDispatch } from "react-redux";
import { openLoadUserPhotoPopupAsAdmin } from "../../../redux/reducers/loadPhotoReducer";
import { UserProfileHeader } from "../../UserProfileHeader/UserProfileHeader";
import { UserProfilePins } from "../../UserProfilePins/UserProfilePins";
import { UserProfileStats } from "../../UserProfileStats/UserProfileStats";
import { UserProfileAchievements } from "../../UserProfileAchievements/UserProfileAchievements";


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
                
            </div>
            <div className={`profile-wrapper-component-376 ${app.isIPhone ? 'safari-margin' : ''}`}>
               <UserProfileHeader/>
               <UserProfilePins/>
               <UserProfileStats/>
               <UserProfileAchievements/>
            </div>
            <BottomComponent user={state.user.user} isIPhone={app.isIPhone} />
        </main>
    )
}
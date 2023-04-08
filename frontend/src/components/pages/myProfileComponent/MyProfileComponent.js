import VisibleProfileWrapper from "../../../redux/containers/VisibleProfileWrapper";
import {Profile376MenuComponent} from "../../profile376MenuComponent/Profile376MenuComponent";
import {ProfileAsideComponent} from "../../profileAsideComponent/ProfileAsideComponent";
import {UserNoticesComponent} from "../../userNoticesComponent/UserNoticesComponent";
import {LoaderComponent} from "../../loaderComponent/LoaderComponent";
import React from "react";


export const MyProfileComponent = ({
    player,
    user,
    funcs,
}) => {

    const showMenu = () => {
        funcs.openShowMenu();
    }

    return (
        <VisibleProfileWrapper>
            <div className={"my-profile-component"}>
                {!!user && !!player && <>
                    <div className={"menu-376"}>
                    <UserNoticesComponent user={user}/>
                        <div className={"settings-icon"} onClick={showMenu}></div>
                    </div>
                    <Profile376MenuComponent pk={user.id}/>
                    <ProfileAsideComponent player={player} funcs={funcs}/>
                </>}
                {!player && <LoaderComponent/>}
            </div>
        </VisibleProfileWrapper>
    )
}
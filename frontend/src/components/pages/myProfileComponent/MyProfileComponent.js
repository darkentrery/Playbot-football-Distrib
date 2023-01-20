import VisibleProfileWrapper from "../../../redux/containers/VisibleProfileWrapper";
import {Profile376MenuComponent} from "../../profile376MenuComponent/Profile376MenuComponent";
import {ProfileAsideComponent} from "../../profileAsideComponent/ProfileAsideComponent";
import {UserNoticesComponent} from "../../userNoticesComponent/UserNoticesComponent";


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
            {user && <div className={"my-profile-component"}>
                <div className={"menu-376"}>
                    <UserNoticesComponent user={user}/>
                    <div className={"settings-icon"} onClick={showMenu}></div>
                </div>
                <Profile376MenuComponent pk={user.id}/>
                <ProfileAsideComponent player={user} funcs={funcs}/>
            </div>}
        </VisibleProfileWrapper>
    )
}
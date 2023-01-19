import {Link} from "react-router-dom";
import ProfileRoutes from "../../routes/ProfileRoutes";


export const Profile376MenuComponent = ({pk}) => {
    return (
        <div className={"profile-376-menu-component"}>
            <Link
                className={`nav-link ${window.location.pathname.includes('my-profile') ? 'white-600-12 active' : 'middle-gray-400-12'}`}
                to={ProfileRoutes.myProfileLink(pk)}
            >Мой профиль</Link>
            <Link
                className={`nav-link ${window.location.pathname.includes('my-events') ? 'white-600-12 active' : 'middle-gray-400-12'}`}
                to={ProfileRoutes.profileMyEventsLink(pk)}
            >Мои события</Link>
            <Link
                className={`nav-link ${window.location.pathname.includes('favorites') ? 'white-600-12 active' : 'middle-gray-400-12'}`}
                to={ProfileRoutes.profileFavoritesLink(pk)}
            >Избранное</Link>
            <Link
                className={`nav-link ${window.location.pathname.includes('personal-data') ? 'white-600-12 active' : 'middle-gray-400-12'}`}
                to={ProfileRoutes.profilePersonalDataLink(pk)}
            >Личные данные</Link>
        </div>
    )
}
import React, {useEffect, useState} from "react";
import userIcon from "../../assets/icon/player-avatar.png";
import {authService} from "../../services/AuthService";
import {Link} from "react-router-dom";
import ProfileRoutes from "../../routes/ProfileRoutes";


export default function UserComponent ({user, funcs}) {
    const [isDropdown, setIsDropdown] = useState(false);

    const openDropdown = () => {
        setIsDropdown(!isDropdown);
    }

    const selectMenu = () => {
        setIsDropdown(false);
    }

    const logout = () => {
      authService.logout();
      funcs.setAuth(false, false);
    }

    const choiceCity = () => {
        selectMenu();
        funcs.removeMap();
        funcs.openChoiceCity();
    }

    document.addEventListener('click', function (e) {
        if (isDropdown) {
            if (!e.target.className.includes("dropdown-elem") && !e.target.className.includes("label") && !e.target.className.includes("city")
                && !e.target.className.includes("dropdown-user") && !e.target.className.includes("dropdown-head")
                && !e.target.className.includes("dropdown-label") && !e.target.className.includes("arrow-icon")
                && !e.target.className.includes("dropdown-icon")) {
               setIsDropdown(false);
            }
        }
    })

    return (
        <div className={"elem user"}>
            <div className={"el black-bell-icon"}></div>
            <div className={"el dropdown-user"}>
                <div className={"dropdown-head"} onClick={openDropdown}>
                    <img className={"dropdown-icon"} src={userIcon} alt=""/>
                    <span className={"dropdown-label"}>{user.username}</span>
                    <div className={`arrow-icon ${isDropdown ? 'up-arrow-icon' : 'down-arrow-icon'}`}></div>
                </div>
                <div className={`dropdown-menu ${isDropdown ? 'open' : ''}`}>
                    <Link className={"dropdown-elem"} to={ProfileRoutes.profileMyEventsLink(user.id)}>Профиль</Link>
                    <span className={"dropdown-elem"} onClick={selectMenu}>Личные данные</span>
                    <span className={"dropdown-elem"} onClick={logout}>Выйти</span>
                    <div className={"dropdown-elem d-el-4"} onClick={choiceCity}>
                        <span className={"label"}>Ваш город</span>
                        <span className={"city"}>{user.city}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
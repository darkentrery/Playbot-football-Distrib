import React, {useEffect, useRef, useState} from "react";
import userIcon from "../../assets/icon/player-avatar.png";
import $ from "jquery";
import AuthService from "../../services/AuthService";


export default function UserComponent ({user, flagDropdown=false, funcs}) {
    const authService = new AuthService();
    const [isDropdown, setIsDropdown] = useState(false);
    const refuserHead = useRef();

    useEffect(() => {
        if (isDropdown) {
            let arrow = $(refuserHead.current).children('.arrow-icon');
            arrow.removeClass('up-arrow-icon');
            arrow.addClass('down-arrow-icon');
            setIsDropdown(!isDropdown);
        }
    }, [flagDropdown])

    const openDropdown = () => {
        let arrow = $(refuserHead.current).children('.arrow-icon');
        if (!isDropdown) {
            arrow.removeClass('down-arrow-icon');
            arrow.addClass('up-arrow-icon');
        } else {
            arrow.removeClass('up-arrow-icon');
            arrow.addClass('down-arrow-icon');
        }
        setIsDropdown(!isDropdown);
    }

    const selectMenu = () => {
        let arrow = $(refuserHead.current).children('.arrow-icon');
        arrow.removeClass('up-arrow-icon');
        arrow.addClass('down-arrow-icon');
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

    return (
        <div className={"elem user"}>
            <div className={"el black-bell-icon"}></div>
            <div className={"el dropdown-user"}>
                <div className={"dropdown-head"} onClick={openDropdown} ref={refuserHead}>
                    <img className={"dropdown-icon"} src={userIcon} alt=""/>
                    <span className={"dropdown-label"}>{user.username}</span>
                    <div className={"arrow-icon down-arrow-icon"}></div>
                </div>
                <div className={`dropdown-menu ${isDropdown ? 'open' : ''}`}>
                    <span className={"dropdown-elem"} onClick={selectMenu}>Профиль</span>
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
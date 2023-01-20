import Modal from "react-modal";
import {MainSearchComponent} from "../../mainSearchComponent/MainSearchComponent";
import React, {useState} from "react";
import {Link} from "react-router-dom";
import BaseRoutes from "../../../routes/BaseRoutes";
import {authService} from "../../../services/AuthService";


export const ShowMenuComponent = ({isOpen, user, city, funcs}) => {
    const [isOpenSearch, setIsOpenSearch] = useState(false);

    const closeWindow = () => {
        console.log(user)
        console.log(city)
        funcs.closeComponent();
    }

    const logout = () => {
        closeWindow();
        authService.logout();
        funcs.setAuth(false, false);
    }

    const getOpenCreateEvent = () => {
        closeWindow();
        funcs.setEvent(false);
        funcs.openCreateEvent();
    }

    return (
        <Modal
            isOpen={isOpen}
            className={"popup-fon"}
            contentLabel="Example Modal"
            ariaHideApp={false}
        >
            <div className={"popup-frame show-menu-component"}>
                <div className={"top-bar"}>
                    <span className={"black-600-20"}>Меню</span>
                    <span className={"btn-close"} onClick={closeWindow}></span>
                </div>
                <div className={`first-search ${isOpenSearch ? 'hidden' : ''}`} onClick={() => setIsOpenSearch(true)}>
                    <div className={"search-icon"}></div>
                    <span className={"black-400-16"}>Поиск</span>
                </div>
                <MainSearchComponent isOpen={isOpenSearch} setIsOpen={setIsOpenSearch} user={user} city={city}/>
                <div className={"city-field"}>
                    <div className={"map-point-icon"}></div>
                    <div className={"text-field"}>
                        <span className={"gray-400-12"}>Ваш город</span>
                        <span className={"black-600-16"}>{user.city}</span>
                    </div>
                </div>
                <div className={"area-field"}>
                    <span className={"btn-second"} onClick={getOpenCreateEvent}><div className={"black-ball-icon"}></div>Создать событие</span>
                </div>
                <div className={"exit"} onClick={logout}>
                    <span className={"black-400-16"}>Выйти</span>
                </div>
                <div className={"contacts"}>
                    <div className={"elem-1"}>
                        <div className={"instagram-icon"}></div>
                        <div className={"telegram-icon"}></div>
                        <div className={"vk-icon"}></div>
                    </div>
                    <div className={"elem-2"}>
                        <div className={"el-1"}>
                            <span className={"black-400-14"}>Поддержка:</span>
                            <span className={"gray-400-14"}>Почта:&nbsp;<span className={"black-400-14"}>admin@korobkaplay.ru</span></span>
                            <span className={"gray-400-14"}>Телеграм:&nbsp;<span className={"black-400-14"}>@korobkaplay</span></span>
                        </div>
                        <Link className={"black-400-14"} to={BaseRoutes.faq} onClick={closeWindow}>FAQ</Link>
                    </div>
                </div>
                <div className={"menu-bottom"}>
                    <div className={"elem-1"}>
                        <span className={"gray-400-12"}>Правила пользования</span>
                        <div className={"vert-line"}></div>
                        <span className={"gray-400-12"}>Пользовательское соглашение</span>
                    </div>
                    <span className={"gray-400-12"}>© 2022 Коробка. Все права защищены</span>
                </div>
            </div>
        </Modal>
    )
}
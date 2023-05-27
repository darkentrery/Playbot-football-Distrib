import Modal from "react-modal";
import {MainSearchComponent} from "../../mainSearchComponent/MainSearchComponent";
import React, {useState} from "react";
import {Link} from "react-router-dom";
import BaseRoutes from "../../../routes/BaseRoutes";
import {authService} from "../../../services/AuthService";


export const ShowMenuComponent = ({isOpen, user, city, funcs}) => {
    const [isOpenSearch, setIsOpenSearch] = useState(false);

    const closeWindow = () => {
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

    const toChoiceCity = () => {
        // closeWindow();
        funcs.openChoiceCity();
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
                <MainSearchComponent isOpen={isOpenSearch} setIsOpen={setIsOpenSearch}/>
                <div className={"city-field"} onClick={toChoiceCity}>
                    <div className={"map-point-icon"}></div>
                    <div className={"text-field"}>
                        <span className={"gray-400-12"}>Ваш город</span>
                        <span className={"black-600-16"}>{user.isAuth && !!user.user.address ? user.user.address.city : ''}</span>
                    </div>
                </div>
                <div className={"area-field"}>
                    {((user.isAuth && user.user.is_organizer) || !user.isAuth) &&
                        <span className={"btn-second"} onClick={getOpenCreateEvent}>
                            <div className={"black-ball-icon"}></div>
                            Создать событие
                        </span>
                    }
                </div>
                <div className={"exit"} onClick={logout}>
                    <span className={"black-400-16"}>Выйти</span>
                </div>
                <div className={"contacts"}>
                    <div className={"elem-1"}>
                        <a className={"instagram-icon"} href={BaseRoutes.instagramShare} target={"_blank"} rel={"noopener noreferrer"}> </a>
                        <a className={"telegram-icon"} href={BaseRoutes.telegramShare} target={"_blank"} rel={"noopener noreferrer"}> </a>
                        {/*<div className={"instagram-icon"} onClick={linkShareService.clickInst}></div>*/}
                        {/*<div className={"telegram-icon"} onClick={linkShareService.clickTg}></div>*/}
                        {/*<div className={"vk-icon"} onClick={linkShareService.clickVk}></div>*/}
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
                        <Link className={"gray-400-12"} to={BaseRoutes.rules} onClick={closeWindow}>Правила пользования</Link>
                        <div className={"vert-line"}></div>
                        <Link className={"gray-400-12"} to={BaseRoutes.allowOffer} onClick={closeWindow}>Пользовательское соглашение</Link>
                    </div>
                    <span className={"gray-400-12"}>© 2022 Коробка. Все права защищены</span>
                </div>
            </div>
        </Modal>
    )
}
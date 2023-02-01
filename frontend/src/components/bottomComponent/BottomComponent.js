import BaseRoutes from "../../routes/BaseRoutes";
import {Link} from "react-router-dom";
import React from "react";
import ProfileRoutes from "../../routes/ProfileRoutes";
import {linkShareService} from "../../services/LinkShareService";


export default function BottomComponent ({user, isIPhone}) {

    return(
        <div className={"bottom-component"}>
            <div className={"elem-1280"}>
                <div className={"el el-1"}>
                    <div className={"logo"}>
                        <div className={"logo-korobka-white-icon"}></div>
                        <div className={"title-korobka-white-icon"}></div>
                    </div>
                    <span>© 2022 Коробка. Все права защищены</span>
                </div>
                <div className={"el el-2"}>
                    <div className={"col col-1"}>
                        <Link className={"white-400-14"} to={BaseRoutes.main}>Главная</Link>
                        <span>Статистика</span>
                    </div>
                    <div className={"col col-2"}>
                        <Link className={"white-400-14"} to={BaseRoutes.events}>События</Link>
                        <span>Для рекламодателей</span>
                    </div>
                    <div className={"col col-3"}>
                        <Link className={"white-400-14"} to={BaseRoutes.faq}>FAQ</Link>
                        <span>Контакты</span>
                    </div>
                </div>
                <div className={"el el-3"}>
                    <span className={"label"}><span className={"value"}>Поддержка:</span></span>
                    <span className={"label"}>Почта: <span className={"value"}>admin@korobkaplay.ru</span></span>
                    <span className={"label"}>Телеграм: <span className={"value"}>@korobka</span></span>
                </div>
            </div>

            <div className={"elem-744"}>
                <div className={"ell ell-1"}>
                    <div className={"el el-1"}>
                        <div className={"logo"}>
                            <div className={"logo-korobka-white-icon"}></div>
                            <div className={"title-korobka-white-icon"}></div>
                        </div>
                        <span>© 2022 Коробка. Все права защищены</span>
                    </div>
                    <div className={"el el-2"}>
                        <span className={"label"}><span className={"value"}>Поддержка:</span></span>
                        <span className={"label"}>Почта: <span className={"value"}>admin@korobkaplay.ru</span></span>
                        <span className={"label"}>Телеграм: <span className={"value"}>@korobka</span></span>
                    </div>
                </div>
                <div className={"ell ell-2"}>
                    <div className={"el el-1"}>
                        <div className={"col col-1"}>
                            <Link className={"white-400-14"} to={BaseRoutes.main}>Главная</Link>
                            <span>Статистика</span>
                        </div>
                        <div className={"col col-2"}>
                            <Link className={"white-400-14"} to={BaseRoutes.events}>События</Link>
                            <span>Для рекламодателей</span>
                        </div>
                        <div className={"col col-3"}>
                            <Link className={"white-400-14"} to={BaseRoutes.faq}>FAQ</Link>
                            <span>Контакты</span>
                        </div>
                    </div>
                    <div className={"el el-2"}>
                        <div className={"instagram-icon"} onClick={linkShareService.clickInst}></div>
                        <div className={"telegram-icon"} onClick={linkShareService.clickTg}></div>
                        <div className={"vk-icon"} onClick={linkShareService.clickVk}></div>
                    </div>
                </div>
            </div>

            <div className={"elem-bottom"}>
                <div className={"el-1"}>
                    <Link className={"policy"} to={BaseRoutes.rules}>Правила пользования</Link>
                    <Link className={"offer"} to={BaseRoutes.allowOffer}>Пользовательское соглашение</Link>
                </div>
                <div className={"el-2"}>
                    <div className={"note-orange-icon"}></div>
                    <span className={"music"}>Включить музыку</span>
                </div>
                <div className={"el-3"}>
                    <div className={"instagram-icon"} onClick={linkShareService.clickInst}></div>
                    <div className={"telegram-icon"} onClick={linkShareService.clickTg}></div>
                    <div className={"vk-icon"} onClick={linkShareService.clickVk}></div>
                </div>
            </div>

            <div className={`elem-376 ${isIPhone ? 'safari-margin' : ''}`}>
                <Link className={`elem orange-600-11 orange-cup-icon ${window.location.pathname === `${BaseRoutes.main}` ? '' : 'disabled'}`}
                      to={BaseRoutes.main}
                >События</Link>
                <Link
                    className={`elem orange-600-11 orange-statistic-icon ${window.location.pathname === `${BaseRoutes.statistic}` ? '' : 'disabled'}`}
                    to={BaseRoutes.statistic}
                >Статистика</Link>
                <Link
                    className={`elem orange-600-11 orange-avatar-icon 
                    ${user && window.location.pathname.includes("profile") ? '' : 'disabled'}`}
                    to={user ? ProfileRoutes.myProfileLink(user.id) : BaseRoutes.main}
                >Профиль</Link>
            </div>
        </div>
    )
}
import docPolicy from "../assets/documents/policy.docx";
import docOffer from "../assets/documents/offer.docx";
import BaseRoutes from "../routes/BaseRoutes";
import {Link} from "react-router-dom";
import React from "react";
import $ from "jquery";
import ProfileRoutes from "../routes/ProfileRoutes";


export default function BottomComponent ({user, isIPhone}) {

    const openAllowPolicy = () => {
        let link = document.createElement("a");
        link.download = `Политика конфиденциальности.docx`;
        link.href = docPolicy
        link.click();
    }

    const openAllowOffer = () => {
        let link = document.createElement("a");
        link.download = `Пользовательское соглашение.docx`;
        link.href = docOffer
        link.click();
    }

    const clickMenu = (e) => {
      let parent = $(e.target).parent('.elem-376');
      parent.children('a').removeClass('active');
      parent.children('a').addClass('disabled');
      $(e.target).removeClass('disabled');
      $(e.target).addClass('active');
    }


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
                        <div className={"instagram-icon"}></div>
                        <div className={"telegram-icon"}></div>
                        <div className={"vk-icon"}></div>
                    </div>
                </div>
            </div>

            <div className={"elem-bottom"}>
                <div className={"el-1"}>
                    {/*<span className={"policy"} onClick={openAllowPolicy}>Правила пользования</span>*/}
                    <Link className={"policy"} to={BaseRoutes.rules}>Правила пользования</Link>
                    <Link className={"offer"} to={BaseRoutes.allowOffer}>Пользовательское соглашение</Link>
                    {/*<span className={"offer"} onClick={openAllowOffer}>Пользовательское соглашение</span>*/}
                </div>
                <div className={"el-2"}>
                    <div className={"note-orange-icon"}></div>
                    <span className={"music"}>Включить музыку</span>
                </div>
                <div className={"el-3"}>
                    <div className={"instagram-icon"}></div>
                    <div className={"telegram-icon"}></div>
                    <div className={"vk-icon"}></div>
                </div>
            </div>

            <div className={`elem-376 ${isIPhone ? 'safari-margin' : ''}`}>
                <Link className={"elem elem-1 orange-cup-icon active"}
                      to={BaseRoutes.main} onClick={clickMenu}
                >События</Link>
                <Link className={"elem elem-2 orange-statistic-icon disabled"}
                      to={BaseRoutes.main} onClick={clickMenu}
                >Статистика</Link>
                <Link className={"elem elem-3 orange-avatar-icon disabled"}
                      to={user ? ProfileRoutes.myProfileLink(user.id) : BaseRoutes.main} onClick={clickMenu}
                >Профиль</Link>
            </div>
        </div>
    )
}
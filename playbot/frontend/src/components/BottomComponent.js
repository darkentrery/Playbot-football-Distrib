import docPolicy from "../assets/documents/policy.docx";
import docOffer from "../assets/documents/offer.docx";

export default function BottomComponent () {

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


    return(
        <div className={"bottom"}>
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
                        <span>Главная</span>
                        <span>Статистика</span>
                    </div>
                    <div className={"col col-2"}>
                        <span>События</span>
                        <span>Для рекламодателей</span>
                    </div>
                    <div className={"col col-3"}>
                        <span>FAQ</span>
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
                            <span>Главная</span>
                            <span>Статистика</span>
                        </div>
                        <div className={"col col-2"}>
                            <span>События</span>
                            <span>Для рекламодателей</span>
                        </div>
                        <div className={"col col-3"}>
                            <span>FAQ</span>
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

            <div className={"elem-2"}>
                <div className={"el-1"}>
                    <span className={"policy"} onClick={openAllowPolicy}>Правила пользования</span>
                    <span className={"offer"} onClick={openAllowOffer}>Пользовательское соглашение</span>
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
        </div>
    )
}
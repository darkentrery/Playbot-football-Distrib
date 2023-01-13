import {Top376Component} from "../top376Component/Top376Component";
import BaseRoutes from "../../routes/BaseRoutes";
import VisibleMainWrapper from "../../redux/containers/VisibleMainWrapper";
import {useState} from "react";


export const FaqPageComponent = () => {

    const FaqParagraph = ({title, children}) => {
        const [unfolded, setUnfolded] = useState(false);
        return (
            <div className={`faq-block ${unfolded ? 'unfolded' : ''}`} onClick={(e) => setUnfolded(!unfolded)}>
                <div className={"title"}>
                    <div className={unfolded ? 'orange-minus-icon' : 'black-plus-icon'}></div>
                    <span className={unfolded ? 'orange-700-16' : 'black-700-16'}>{title}</span>
                </div>
                <div className={`faq-block-text ${unfolded ? '' : 'hidden'}`}>{children}</div>
            </div>
        )
    }

    return (
        <VisibleMainWrapper>
            <div className={"rules-pattern-component"}>
                <Top376Component label={"Главная"} to={BaseRoutes.main}/>
                <div className={"block block-1 allow-policy-fon"}>
                    <span className={"white-700-40"}>FAQ</span>
                </div>
                <div className={"block block-3"}>
                    <FaqParagraph title={"Что такое Сервис Коробка?"}>

                    </FaqParagraph>
                    <FaqParagraph title={"Что такое Бот Коробка в Телеграме?"}>
                        <span className={"black-400-14"}>Бот Коробка в Telegram позволяет вам создавать события на площадках, присоединяться к ним и управлять игрой с девайса.</span>
                        <span className={"black-400-14"}>Вся информация, собранная на мероприятиях, будет выгружаться в красивую базу данных на сайт korobkaplay.ru</span>
                        <span className={"black-400-14"}>Управлять игрой через плеер пока возможно только через Telegram Бот.</span>
                        <span className={"black-400-14"}>Весь остальной функционал доступен на этом сайте.</span>
                    </FaqParagraph>

                </div>
            </div>
        </VisibleMainWrapper>
    )
}
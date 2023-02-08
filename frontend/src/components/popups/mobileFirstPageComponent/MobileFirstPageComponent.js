import React from "react";
import Modal from "react-modal";
import { MobileView } from 'react-device-detect';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";


export default function MobileFirstPageComponent ({isOpen, isIPhone, funcs}) {
    const contents = [
        "Организовывай футбольные событие и управляй ими",
        "Ищи события и присоединяйся к ним",
        "Следи за статистикой и поднимайся в рейтинге",
    ]
    const images = ["white-cup-icon", "white-heands-icon", "white-run-people-icon"];
    const fons = ["mobile-1-fon", "mobile-1-fon", "mobile-1-fon"];

    let settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        appendDots: dots => (<div>{dots}</div>),
        // customPaging: i => (<></>)
    };

    const closeWindow = () => {
        funcs.closeMobileFirstPage();
    }
    const toLogin = () => {
        closeWindow();
        funcs.openLogin();
    }
    const toSignUp = () => {
        closeWindow();
        funcs.openSignUp();
    }

    const Slide = ({fon='', image, content}) => {
        return (
            <div className={`slide-elem ${fon}`}>
                <span className={"slide-elem-1 white-600-20"}>Перед началом события вы сможете:</span>
                <div className={`slide-elem-2 ${image}`}></div>
                <span className={"slide-elem-3 white-400-20"}>{content}</span>
            </div>
        )
    }

    return(
        <MobileView>
            <Modal
                isOpen={isOpen}
                className={"mobile-first-component"}
                contentLabel="Example Modal"
                ariaHideApp={false}
            >
                <Slider {...settings}>
                    {contents.map((content, i) => (
                        <Slide content={content} image={images[i]} fon={fons[i]} key={i}/>
                    ))}
                </Slider>
                <span onClick={closeWindow} className={"skip link white-600-16"}>Пропустить</span>
                <span className={`to-login btn ${isIPhone ? 'safari-margin' : ''}`} onClick={toLogin}>Вход</span>
            </Modal>
        </MobileView>
    )
}

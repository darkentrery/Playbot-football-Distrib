import React, {useState} from "react";
import Modal from "react-modal";
import { MobileView } from 'react-device-detect';
import $ from "jquery";


export default function MobileFirstPageComponent ({isOpen, isIPhone, funcs}) {
    const [slideNumber, setSlideNumber] = useState(0);
    const content = [
        "Организовывай футбольные событие и управляй ими",
        "Ищи события и присоединяйся к ним",
        "Следи за статистикой и поднимайся в рейтинге",
    ]
    const images = ["white-cup-icon", "white-heands-icon", "white-run-people-icon"];

    let posInit = 0;
    let posX1 = 0;
    let posX2 = 0;
    let posFinal = 0;

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

    const nextSlide = () => {
        if (posX2 < 0) {
            if (slideNumber !== 0) {
                setSlideNumber(slideNumber - 1);
            }
            else {
                setSlideNumber(2);
            }
        } else {
            if (slideNumber !== 2) {
                setSlideNumber(slideNumber + 1);
            } else {
                setSlideNumber(0);
            }
        }
    }

    const getEvent = (e) => e.type.search('touch') !== -1 ? e.touches[0] : e;

    const swipeAction = (e) => {
        let evt = getEvent(e);
        posX2 = posX1 - evt.clientX;
        $('.elem-3').attr('style', `transform: translateX(${-posX2}px);`);
        $('.elem-4').attr('style', `transform: translateX(${-posX2}px);`);
    }

    const swipeEnd = (e) => {
        $('.elem-3').attr('style', `transform: translateX(0px);`);
        $('.elem-4').attr('style', `transform: translateX(0px);`);
        if (Math.abs(posX2) > 70) {
            nextSlide();
        }
    }

    const swipeStart = (e) => {
        let evt = getEvent(e);
        posInit = posX1 = evt.clientX;
        $('.popup-mobile-first').on('touchmove', swipeAction);
        $('.popup-mobile-first').on('touchend', swipeEnd);
        $('.popup-mobile-first').on('mousemove', swipeAction);
        $('.popup-mobile-first').on('mouseup', swipeEnd);
    }

    $('.popup-mobile-first').on('touchstart', swipeStart)

    return(
        <MobileView>
            <Modal
                isOpen={isOpen}
                className={"popup-mobile-first"}
                contentLabel="Example Modal"
                ariaHideApp={false}
            >
                <span onClick={closeWindow} className={"elem elem-1 link white-600-16"}>Пропустить</span>
                <span className={"elem elem-2 white-600-20"}>Перед началом события вы сможете:</span>
                <div className={`elem elem-3 ${images[slideNumber]}`}></div>
                <span className={"elem elem-4 white-400-20"}>{content[slideNumber]}</span>
                <div className={"elem elem-5"}>
                    <div className={`point ${slideNumber === 0 ? 'orange-point-icon' : 'gray-point-icon'}`}></div>
                    <div className={`point ${slideNumber === 1 ? 'orange-point-icon' : 'gray-point-icon'}`}></div>
                    <div className={`point ${slideNumber === 2 ? 'orange-point-icon' : 'gray-point-icon'}`}></div>
                </div>
                <button className={`elem elem-6 btn ${isIPhone ? 'safari-margin' : ''}`} onClick={toLogin}>Вход</button>
            </Modal>
        </MobileView>
    )
}

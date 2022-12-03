import React, {useState} from "react";
import Modal from "react-modal";
import { MobileView } from 'react-device-detect';
import cup from "../assets/icon/white-cup.png";
import orangePoint from "../assets/icon/orange-point.png";
import grayPoint from "../assets/icon/gray-point.png";
import {authDecoratorWithoutLogin} from "../services/AuthDecorator";
import AuthService from "../services/AuthService";



export default function MobileFirstPageComponent ({isOpen, funcs}) {
    const [firstRequest, setFirstRequest] = useState(true);

    const authService = new AuthService();

    if (firstRequest) {
        authDecoratorWithoutLogin(authService.getData, []).then((response) => {
            setFirstRequest(false);
            if (response.status != 200 && !isOpen) {
                funcs.openMobileFirstPage();
            }
            console.log(response)
        })
    }

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

    return(
        <MobileView>
            <Modal
                isOpen={isOpen}
                className={"popup-mobile-first"}
                contentLabel="Example Modal"
                ariaHideApp={false}
            >
                <div className={"elem first"}>
                    <a onClick={closeWindow} className={"link link-skip"}>Пропустить</a>
                </div>
                <div className={"elem second"}>
                    <img className={"cup"} src={cup} alt=""/>
                </div>
                <div className={"elem third"}>
                    <span>Создавай турниры</span>
                </div>
                <div className={"elem fourth"}>
                    <span>Играй со случайными игроками быстрые матчи в любом формате</span>
                </div>
                <div className={"elem fifth"}>
                    <img className={"point"} src={orangePoint} alt=""/>
                    <img className={"point"} src={grayPoint} alt=""/>
                    <img className={"point"} src={grayPoint} alt=""/>
                </div>
                <div className={"elem sixth"}>
                    <button className={"btn btn-login-mobile"} onClick={toLogin}>
                        <div className={"btn-text"}>Вход</div>
                    </button>
                </div>
                <div className={"elem seventh"}>
                    <a onClick={toSignUp} className={"link link-reg"}>Регистрация</a>
                </div>
            </Modal>
        </MobileView>
    )
}

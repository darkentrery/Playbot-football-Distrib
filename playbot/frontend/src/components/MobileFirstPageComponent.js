import React, { useContext } from "react";
import Modal from "react-modal";
import {OpenLoginContext, OpenMobileFirstPageContext, OpenSignUpContext} from "../context/AuthContext";
import { BrowserView, MobileView, isBrowser, isMobile } from 'react-device-detect';
import cup from "../assets/icon/white-cup.png";
import orangePoint from "../assets/icon/orange-point.png";
import grayPoint from "../assets/icon/gray-point.png";



export default function MobileFirstPageComponent () {
    const {openSignUp, setOpenSignUp} = useContext(OpenSignUpContext);
    const {openLogin, setOpenLogin} = useContext(OpenLoginContext);
    const {openMobileFirstPage, setOpenMobileFirstPage} = useContext(OpenMobileFirstPageContext);

    return(
        <MobileView>
            <Modal
                isOpen={openMobileFirstPage}
                className={"popup-mobile-first"}
                contentLabel="Example Modal"
                ariaHideApp={false}
            >
                <div className={"elem first"}>
                    <a onClick={() => {setOpenMobileFirstPage(!openMobileFirstPage)}} className={"link link-skip"}>Пропустить</a>
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
                    <button className={"btn btn-login-mobile"} onClick={() => {
                        setOpenMobileFirstPage(!openMobileFirstPage)
                        setOpenLogin(!openLogin)
                    }}>
                        <div className={"btn-text"}>Вход</div>
                    </button>
                </div>
                <div className={"elem seventh"}>
                    <a onClick={() => {
                        setOpenMobileFirstPage(!openMobileFirstPage)
                        setOpenSignUp(!openSignUp)
                    }} className={"link link-reg"}>Регистрация</a>
                </div>
            </Modal>
        </MobileView>

    )
}

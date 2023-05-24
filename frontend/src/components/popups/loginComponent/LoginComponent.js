import React, {useState, useEffect, useRef} from "react";
import AuthService, {authService} from "../../../services/AuthService";
import TelegramLoginComponent from "../../TelegramLoginComponent";
import Modal from "react-modal";
import {InputComponent} from "../../inputComponent/InputComponent";
import {RightFonComponent} from "../../rightFonComponent/RightFonComponent";
import {LoaderComponent} from "../../loaderComponent/LoaderComponent";
import {blockBodyScroll} from "../../../utils/manageElements";
import {AppleAuthComponent} from "../../appleAuthComponent/AppleAuthComponent";


export default function LoginComponent ({isOpen, closeComponent, openSignUp, openRefreshPassword, setAuth, showMap}) {
    const authServicee = new AuthService();
    const [email, setEmail] = useState(false);
    const [password, setPassword] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [typePassword, setTypePassword] = useState(true);
    const [rightIcon, setRightIcon] = useState('eye-icon');
    const [data, setData] = useState(false);
    const [isLoader, setIsLoader] = useState(false);
    const refLogin = useRef(false);

    useEffect(() => {
        let bodyFormData = new FormData();
        setEmailError('');
        setPasswordError('');
        bodyFormData.append('email', email);
        bodyFormData.append('password', password);
        setData(bodyFormData);
    }, [email, password]);

    useEffect(() => {
        blockBodyScroll(isOpen);
    }, [isOpen])

    const closeWindow = () => {
        setEmail(false);
        setPassword(false);
        setData(false);
        closeComponent();
    }

    const toMenu = () => {
        closeWindow();
        showMap();
    }

    const toSignUp = () => {
        closeWindow();
        openSignUp();
    }

    const toRefreshPassword = () => {
        closeWindow();
        openRefreshPassword();
    }

    const sendForm = () => {
        let errors = authServicee.loginRequestValidation(email, password, setEmailError, setPasswordError);
        if (!errors.length) {
            setIsLoader(true);
            authService.login(data).then((response) => {
                errors = authServicee.loginResponseValidation(response, setEmailError, setPasswordError);
                setIsLoader(false);
                if (!errors.length) {
                    setAuth(true, response.data.user);
                    closeWindow();
                    showMap();
                }
            })
        }
    }

    const clickEnter = (e) => {
        if (e.keyCode === 13) {
            sendForm();
        }
    }

    const hiddenPassword = () => {
        if (typePassword) {
            setTypePassword(false);
            setRightIcon('eye-icon off');
        } else {
            setTypePassword(true);
            setRightIcon('eye-icon');
        }
    }

    const hiddenFrames = (e) => {
        if (e.target.nodeName !== "INPUT") refLogin.current.focus();
    }

    return(
        <Modal
            isOpen={isOpen}
            className={"popup-fon"}
            contentLabel="Example Modal"
            ariaHideApp={false}
        >
            <div className={"popup-frame login-component"} onClick={hiddenFrames}>
                {isLoader && <LoaderComponent borderRadius={10}/>}
                <div className={"popup-left"}>
                    <div onClick={toMenu} className={"btn-close"}></div>
                    <span className={"black-600-22 login-title"}>Вход</span>
                    <InputComponent
                        leftIcon={'name-icon'} value={email} setValue={setEmail} errorText={emailError}
                        placeholder={"Номер телефона или e-mail"} onKeyUp={clickEnter}
                    />
                    <InputComponent
                        leftIcon={"password-icon"} rightIcon={rightIcon} password={typePassword} placeholder={"Пароль"}
                        errorText={passwordError} value={password} setValue={setPassword} rightOnClick={hiddenPassword}
                        onKeyUp={clickEnter}
                    />
                    <button className={"btn"} autoFocus={true} onClick={sendForm} ref={refLogin}>Войти</button>
                    <div className={"links"}>
                        <span onClick={toSignUp} className={"link link-login-reg gray-600-14"}>Регистрация</span>
                        <span onClick={toRefreshPassword} className={"link link-login-reg gray-600-14"}>Забыли пароль?</span>
                    </div>
                    <div className={"login-l-elem-line"}></div>
                    <div className={"login-l-bottom-elem"}>
                        {/*<TelegramLoginComponent/>*/}
                        {/*<AppleAuthComponent setAuth={setAuth} closeWindow={closeWindow}/>*/}
                    </div>
                </div>
                <RightFonComponent
                    className={"popup-right"}
                    close={toMenu}
                    slider={isOpen && window.screen.width > 743 ? true : false}
                    contents={[
                        "Создавай события и присоединяйся к открытым играм",
                        "Играй, развивай свой профиль и поднимайся в рейтинге",
                    ]}
                    imageClasses={["sign-up-fon", "sign-up-fon"]}
                />
            </div>
        </Modal>
    )
}

import React, {useState, useEffect, useContext} from "react";
import AuthService from "../services/AuthService";
import TelegramLoginComponent from "./TelegramLoginComponent";
import {OpenLoginContext, OpenSignUpContext} from "../context/AuthContext";
import Modal from "react-modal";
import avatarIcon from "../assets/icon/avatar.png";
import phoneIcon from "../assets/icon/phone.png";
import emailIcon from "../assets/icon/email.png";
import passwordIcon from "../assets/icon/password.png";


export default function SignUpComponent () {
    const authService = new AuthService();
    const [name, setName] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState(false);
    const [email, setEmail] = useState(false);
    const [password, setPassword] = useState(false);
    const [passwordConfirm, setPasswordConfirm] = useState(false);
    const [allowPolicy, setAllowPolicy] = useState(false);
    const [allowOffer, setAllowOffer] = useState(false);
    const [data, setData] = useState("No");
    const {openSignUp, setOpenSignUp} = useContext(OpenSignUpContext);
    const {openLogin, setOpenLogin} = useContext(OpenLoginContext);


    function phoneInput(event) {
        let value = event.target.value.replace(/\D/g, "");
        if (value.length > 11) value = value.slice(0, 11);
        event.target.value = value;
        setPhoneNumber(value);
    }

    useEffect(() => {
        let bodyFormData = new FormData();
        bodyFormData.append('name', name);
        bodyFormData.append('phone_number', phoneNumber);
        bodyFormData.append('email', email);
        bodyFormData.append('password', password);
        setData(bodyFormData)
    }, [name, phoneNumber, email, password, passwordConfirm, allowPolicy, allowOffer])

    const sendForm = () => {
        console.log("open", openLogin)
        console.log(data)
        console.log(localStorage.getItem("access_token"))
        console.log(localStorage.getItem("refresh_token"))
        console.log(name, phoneNumber, email, password, passwordConfirm, allowPolicy, allowOffer)
        let errors = authService.signUpRequestValidation(name, phoneNumber, email, password, passwordConfirm, allowPolicy, allowOffer);
        console.log(errors)
        if (errors.size){
            console.log(1)
        } else {
            authService.signUp(data).then((response) => {
                errors = authService.signUpResponseValidation(response);
                console.log(errors)
                if (errors.size) {
                    console.log(2)
                } else {
                   setOpenLogin(!openLogin);
                    console.log(3)
                }
            })
        }
    }

    return(
        <Modal
            isOpen={openSignUp}
            // onAfterOpen={afterOpenModal}
            // onRequestClose={closeModal}
            // style={customStyles}
            className={"popup-fon"}
            contentLabel="Example Modal"
            ariaHideApp={false}
        >
            <div className={"popup-frame sign-up"}>
                <div className={"popup-left"}>
                    <div className={"sign-up-l-body"}>
                        <div className={"sign-up-l-elem"}>
                            <div className={"sign-up-title"}>Регистрация</div>
                        </div>
                        <div className={"sign-up-l-elem"}>
                            <div className={"div-input"}>
                                <input type="text" placeholder={"Имя и фамилия *"} onChange={(event) => setName(event.target.value)}/>
                                <div className={"left-input-icon"}>
                                    <img className={"name-icon"} src={avatarIcon} alt=""/>
                                </div>
                            </div>
                        </div>
                        <div className={"sign-up-l-elem"}>
                            <div className={"div-input"}>
                                <input type="text" placeholder={"Телефон *"}  onChange={(event) => phoneInput(event)}/>
                                <div className={"left-input-icon"}>
                                    <img className={"phone-icon"} src={phoneIcon} alt=""/>
                                </div>
                            </div>
                        </div>
                        <div className={"sign-up-l-elem"}>
                            <div className={"div-input"}>
                                <input type="text" placeholder={"Почта *"} onChange={(event) => setEmail(event.target.value)}/>
                                <div className={"left-input-icon"}>
                                    <img className={"email-icon"} src={emailIcon} alt=""/>
                                </div>
                            </div>
                        </div>
                        <div className={"sign-up-l-elem"}>
                            <div className={"div-input"}>
                                <input type="text" placeholder={"Пароль *"} onChange={(event) => setPassword(event.target.value)}/>
                                <div className={"left-input-icon"}>
                                    <img className={"password-icon"} src={passwordIcon} alt=""/>
                                </div>
                            </div>
                        </div>
                        <div className={"sign-up-l-elem"}>
                            <div className={"div-input"}>
                                <input type="text" placeholder={"Потвердите пароль *"} onChange={(event) => setPasswordConfirm(event.target.value)}/>
                                <div className={"left-input-icon"}>
                                    <img className={"password-icon"} src={passwordIcon} alt=""/>
                                </div>
                            </div>
                        </div>
                        <div className={"sign-up-l-elem"}>
                            <div className={"div-input-checkbox"}>
                                <div className={"checkbox-div"}></div>
                                <input id={"id-policy"} type="checkbox" onChange={(event) => setAllowPolicy(!allowPolicy)}/>
                                <label className={"checkbox-label"} htmlFor={"id-policy"}></label>
                                <span>Я согласен с политикой конфеденциальности</span>
                            </div>
                        </div>
                        <div className={"sign-up-l-elem"}>
                            <div className={"div-input-checkbox"}>
                                <div className={"checkbox-div"}></div>
                                <input id={"id-offer"} type="checkbox" onChange={(event) => setAllowOffer(!allowOffer)}/>
                                <label className={"checkbox-label"} htmlFor={"id-offer"}></label>
                                <span>Я согласен с условиями договора-оферты</span>
                            </div>
                        </div>
                        <div className={"sign-up-l-elem"}>
                            <button className={"btn btn-reg"} onClick={sendForm}>
                                <div className={"btn-text"}>Зарегистрироваться</div>
                            </button>
                        </div>
                    </div>
                    <div className={"sign-up-l-bottom"}>
                        <div className={"sign-up-l-bottom-elem"}>
                            <a onClick={() => {
                                setOpenSignUp(!openSignUp)
                                setOpenLogin(!openLogin)
                            }} className={"link link-sign-up-login"}>У меня уже есть аккаунт, Войти</a>
                        </div>
                        <div className={"sign-up-l-bottom-elem"}>
                            <div className={"line"}></div>
                        </div>
                        <div className={"sign-up-l-bottom-elem"}>
                            <TelegramLoginComponent/>
                        </div>
                    </div>
                </div>
                <div className={"popup-right"}>
                    <div className={"popup-img sign-up-img"}>
                        <div className={"first"}>
                            <div onClick={() => {setOpenSignUp(!openSignUp)}} className={"btn-close sign-up-close"}></div>
                        </div>
                        <div className={"second"}>
                            <svg className={"circle-1"} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="8" cy="8" r="8" fill="#EFB041"/>
                            </svg>
                            <svg  className={"circle-2"} viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="4" cy="4" r="4" fill="#EFB041"/>
                            </svg>
                        </div>
                        <div className={"third"}>
                            <div className={"sign-up-right-text"}>Попробуй себя в любительском футболе</div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>

    )
}

import React, {useState, useEffect, useContext} from "react";
import AuthService from "../services/AuthService";
import {Link, useNavigate} from "react-router-dom";
import AuthRoutes from "../routes/AuthRoutes";
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

    const navigate = useNavigate();

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
                   navigate(AuthRoutes.login);
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
            <div className={"frame-sign-up"}>
                <div className={"sign-up-left"}>
                    <div className={"sign-up-l-body"}>
                        <div className={"sign-up-l-elem"}>
                            <div className={"sign-up-title"}>Регистрация</div>
                        </div>
                        <div className={"sign-up-l-elem"}>
                            <div className={"sign-up-div-input"}>
                                <input type="text" placeholder={"Имя и фамилия *"} onChange={(event) => setName(event.target.value)}/>
                                <div className={"sign-up-icon"}>
                                    <img className={"name-icon"} src={avatarIcon} alt=""/>
                                </div>
                            </div>
                        </div>
                        <div className={"sign-up-l-elem"}>
                            <div className={"sign-up-div-input"}>
                                <input type="text" placeholder={"Телефон *"}  onChange={(event) => phoneInput(event)}/>
                                <div className={"sign-up-icon"}>
                                    <img className={"phone-icon"} src={phoneIcon} alt=""/>
                                </div>
                            </div>
                        </div>
                        <div className={"sign-up-l-elem"}>
                            <div className={"sign-up-div-input"}>
                                <input type="text" placeholder={"Почта *"} onChange={(event) => setEmail(event.target.value)}/>
                                <div className={"sign-up-icon"}>
                                    <img className={"email-icon"} src={emailIcon} alt=""/>
                                </div>
                            </div>
                        </div>
                        <div className={"sign-up-l-elem"}>
                            <div className={"sign-up-div-input"}>
                                <input type="text" placeholder={"Пароль *"} onChange={(event) => setPassword(event.target.value)}/>
                                <div className={"sign-up-icon"}>
                                    <img className={"password-icon"} src={passwordIcon} alt=""/>
                                </div>
                            </div>
                        </div>
                        <div className={"sign-up-l-elem"}>
                            <div className={"sign-up-div-input"}>
                                <input type="text" placeholder={"Потвердите пароль *"} onChange={(event) => setPasswordConfirm(event.target.value)}/>
                                <div className={"sign-up-icon"}>
                                    <img className={"password-icon"} src={passwordIcon} alt=""/>
                                </div>
                            </div>
                        </div>
                        <div className={"sign-up-l-elem"}>
                            <div className={"sign-up-div-input-ch"}>
                                <div className={"checkbox-div"}></div>
                                <input id={"id-policy"} type="checkbox" onChange={(event) => setAllowPolicy(!allowPolicy)}/>
                                <label className={"checkbox-label"} htmlFor={"id-policy"}></label>
                                <span>Я согласен с политикой<br/> конфеденциальности</span>
                            </div>
                        </div>
                        <div className={"sign-up-l-elem"}>
                            <div className={"sign-up-div-input-ch"}>
                                <div className={"checkbox-div"}></div>
                                <input id={"id-offer"} type="checkbox" onChange={(event) => setAllowOffer(!allowOffer)}/>
                                <label className={"checkbox-label"} htmlFor={"id-offer"}></label>
                                <span>Я согласен с условиями договора<br/>-оферты</span>
                            </div>
                        </div>
                        <div className={"sign-up-l-elem"}>
                            <button className={"btn-reg"} onClick={sendForm}>
                                <div className={"btn-reg-text"}>Зарегистрироваться</div>
                            </button>
                        </div>
                    </div>
                    <div className={"sign-up-l-bottom"}>
                        <div className={"sign-up-l-bottom-elem"}>
                            <a onClick={() => {
                                setOpenSignUp(!openSignUp)
                                setOpenLogin(!openLogin)
                            }} className={"sign-up-btn-login"}>У меня уже есть аккаунт, Войти</a>
                        </div>
                        <div className={"sign-up-l-bottom-elem"}>
                            <div className={"sign-up-line"}></div>
                        </div>
                        <div className={"sign-up-l-bottom-elem"}>


                        </div>
                    </div>
                    {/*<div className={"sign-up-left-elem"}>*/}
                    {/*    <input className={"sign-up-input"} type="text" placeholder={"Имя и фамилия"} onChange={(event) => setName(event.target.value)}/><br/><br/>*/}
                    {/*</div>*/}

                    {/*<input className="form-control" type="text" placeholder={"Телефон"}  onChange={(event) => phoneInput(event)}/><br/><br/>*/}
                    {/*<input className="form-control" type="text" placeholder={"Почта"} onChange={(event) => setEmail(event.target.value)}/><br/><br/>*/}
                    {/*<input className="form-control" type="text" placeholder={"Пароль"} onChange={(event) => setPassword(event.target.value)}/><br/><br/>*/}
                    {/*<input className="form-control" type="text" placeholder={"Потвердите пароль"} onChange={(event) => setPasswordConfirm(event.target.value)}/><br/><br/>*/}
                    {/*<label>Я согласен с политикой конфеденциальности</label><br/>*/}
                    {/*<input className="form-control" type="checkbox" onChange={(event) => setAllowPolicy(!allowPolicy)}/><br/><br/>*/}
                    {/*<label>Я согласен с условиями договора-оферты</label><br/>*/}
                    {/*<input className="form-control" type="checkbox" onChange={(event) => setAllowOffer(!allowOffer)}/><br/><br/>*/}
                    {/*<button onClick={sendForm}>Sign Up</button>*/}

                    {/*<Link to={AuthRoutes.login}><h3>Login</h3></Link>*/}
                    {/*<TelegramLoginComponent/>*/}
                    {/*<button onClick={() => {setOpenSignUp(!openSignUp)}}>Close</button>*/}
                </div>
                <div className={"sign-up-right"}>
                    {/*<div className={"sign-up-fon-orange"}>*/}
                    {/*    <div className={"sign-up-fon-white"}>*/}
                    {/*        <div className={"sign-up-fon-white"}>*/}
                    {/*            <div className={"sign-up-fon-cell"}>*/}
                                    <div className={"sign-up-img"}>
                                        <div onClick={() => {setOpenSignUp(!openSignUp)}} className={"btn-close"}>
                                            <svg className={"icon-cross"} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M0.292893 0.292893C0.683417 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L8 6.58579L14.2929 0.292893C14.6834 -0.0976311 15.3166 -0.0976311 15.7071 0.292893C16.0976 0.683417 16.0976 1.31658 15.7071 1.70711L9.41421 8L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L8 9.41421L1.70711 15.7071C1.31658 16.0976 0.683417 16.0976 0.292893 15.7071C-0.0976311 15.3166 -0.0976311 14.6834 0.292893 14.2929L6.58579 8L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683417 0.292893 0.292893Z" fill="#1B1B1B"/>
                                            </svg>
                                        </div>
                                         <svg  className={"sign-up-circle-2"} viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="4" cy="4" r="4" fill="#EFB041"/>
                                        </svg>
                                        <svg className={"sign-up-circle-1"} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="8" cy="8" r="8" fill="#EFB041"/>
                                        </svg>

                                        <div className={"sign-up-right-text"}>Попробуй себя в любительском футболе</div>
                                    </div>
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}

                    {/*</div>*/}

                    {/*<div className={"sign-up-fon-f"}></div>*/}









                </div>


            </div>
        </Modal>

    )
}

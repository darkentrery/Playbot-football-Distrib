import React, {Component, useState, useEffect, useRef} from "react";
import AuthService from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import AuthRoutes from "../routes/AuthRoutes";




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

    function phoneInput(event) {
        let value = event.target.value.replace(/\D/g, "");
        if (value.length > 11) value = value.slice(0, 11);
        event.target.value = value;
        setPhoneNumber(value);
    }

    useEffect(() => {
        console.log(allowOffer)
        let bodyFormData = new FormData();
        bodyFormData.append('name', name);
        bodyFormData.append('phone_number', phoneNumber);
        bodyFormData.append('email', email);
        bodyFormData.append('password', password);
        setData(bodyFormData)
    }, [name, phoneNumber, email, password, passwordConfirm, allowPolicy, allowOffer])

    const changeAllowPolicy = () => {
        if (allowPolicy) {
            setAllowPolicy(false);
        } else {
            setAllowPolicy(true);
        }
    }
    const changeAllowOffer = () => {
        if (allowOffer) {
            setAllowOffer(false);
        } else {
            setAllowOffer(true);
        }
    }
    // const history = useHistory();
    const navigate = useNavigate();

    const sendForm = () => {
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
        <div>
            <input className="form-control" type="text" placeholder={"Имя и фамилия"} onChange={(event) => setName(event.target.value)}/><br/><br/>
            <input className="form-control" type="text" placeholder={"Телефон"}  onChange={(event) => phoneInput(event)}/><br/><br/>
            <input className="form-control" type="text" placeholder={"Почта"} onChange={(event) => setEmail(event.target.value)}/><br/><br/>
            <input className="form-control" type="text" placeholder={"Пароль"} onChange={(event) => setPassword(event.target.value)}/><br/><br/>
            <input className="form-control" type="text" placeholder={"Потвердите пароль"} onChange={(event) => setPasswordConfirm(event.target.value)}/><br/><br/>
            <label>Я согласен с политикой конфеденциальности</label><br/>
            <input className="form-control" type="checkbox" onChange={(event) => changeAllowPolicy()}/><br/><br/>
            <label>Я согласен с условиями договора-оферты</label><br/>
            <input className="form-control" type="checkbox" onChange={(event) => changeAllowOffer()}/><br/><br/>


            <button onClick={sendForm}>Sign Up</button>
        </div>
    )
}

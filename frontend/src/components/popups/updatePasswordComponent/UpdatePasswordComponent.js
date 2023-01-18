import Modal from "react-modal";
import {InputComponent} from "../../inputComponent/InputComponent";
import {useEffect, useState} from "react";
import {authService} from "../../../services/AuthService";
import {authDecoratorWithoutLogin} from "../../../services/AuthDecorator";


export const UpdatePasswordComponent = ({isOpen, user, funcs}) => {
    const [password, setPassword] = useState(false);
    const [passwordConfirm, setPasswordConfirm] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [passwordConfirmError, setPasswordConfirmError] = useState(false);
    const [data, setData] = useState(false);

    useEffect(() => {
        setPasswordError(false);
        setPasswordConfirmError(false);
        let newData = {
            'id': user.id,
            'password': password,
        }
        setData(newData);
    }, [password, passwordConfirm])

    const closeWindow = () => {
        setPassword(false);
        setPasswordConfirm(false);
        setPasswordError(false);
        setPasswordConfirmError(false);
        funcs.closeComponent();
    }
    
    const clickButton = () => {
        if (password && passwordConfirm && password === passwordConfirm) {
            authDecoratorWithoutLogin(authService.updatePassword, data).then((response) => {
                if (response.status === 200) {
                    funcs.setPlayer(response.data);
                    closeWindow();
                    funcs.openSuccessUpdatePassword();
                }
            })
        } else {
            if (!password) setPasswordError("Введите пароль!");
            if (!passwordConfirm) setPasswordConfirmError("Потвердите пароль!");
            if (password && passwordConfirm && password !== passwordConfirm) {
                setPasswordError("Пароли не совпадают!");
                setPasswordConfirmError("Пароли не совпадают!");
            }
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            className={"popup-fon"}
            contentLabel="Example Modal"
            ariaHideApp={false}
        >
            <div className={"popup-frame update-password-component"}>
                <div onClick={closeWindow} className={"btn-close elem-376"}></div>
                <div className={"elem elem-1"}>
                    <span className={"title-22"}>Сменить пароль</span>
                    <div onClick={closeWindow} className={"btn-close"}></div>
                </div>
                <InputComponent value={password} setValue={setPassword} password={true} leftIcon={"password-icon"}
                                placeholder={"Введите новый пароль"} errorText={passwordError}/>
                <InputComponent value={passwordConfirm} setValue={setPasswordConfirm} password={true}
                                leftIcon={"password-icon"} placeholder={"Подтвердите пароль"} errorText={passwordConfirmError}/>
                <div className={"elem elem-3"}>
                    <button className={"btn"} onClick={clickButton}>Сохранить</button>
                    <button className={"btn-second"} onClick={closeWindow}>Вернуться</button>
                </div>
            </div>
        </Modal>
    )
}
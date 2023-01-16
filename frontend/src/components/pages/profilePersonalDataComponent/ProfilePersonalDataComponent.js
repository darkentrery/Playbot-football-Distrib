import VisibleProfileWrapper from "../../../redux/containers/VisibleProfileWrapper";
import {InputComponent} from "../../inputComponent/InputComponent";
import {useState} from "react";


export const ProfilePersonalDataComponent = ({
    player,
    user,
    funcs,
}) => {
    const [username, setUsername] = useState(false);
    const [email, setEmail] = useState(false);

    return (
        <VisibleProfileWrapper>
            <div className={"profile-personal-data-component"}>
                <div className={"top-bar"}>
                    <span className={`elem-1 btn`}>Сохранить изменения</span>
                    <div className={`elem-2`}>
                        <div className={"black-eye-icon"}></div>
                        <span className={"black-500-14 el-1"}>Смотреть превью</span>
                    </div>
                </div>
                <div className={"photo-bar"}>
                    <span className={"black-400-14"}>Фотография профиля:</span>
                    <div className={"upload-photo"}>
                        <div className={"el-1 no-photo-icon"}></div>
                        <div className={"el-2"}>
                            <span className={"gray-400-14"}>Файл загружен</span>
                            <span className={"orange-400-14"}>Выбрать файл</span>
                        </div>
                    </div>
                </div>
                <div className={"fields-form"}>
                    <InputComponent leftIcon={"avatar-icon disabled"} className={"elem elem-1"}/>
                    <InputComponent leftIcon={"avatar-icon disabled"} className={"elem elem-1"}/>
                    <InputComponent leftIcon={"email-icon"} className={"elem elem-1"}/>

                </div>
                <div className={"change-password"}>
                    <div className={"orange-lock-icon"}></div>
                    <span className={"orange-400-14 link"}>Сменить пароль</span>
                </div>
            </div>
        </VisibleProfileWrapper>
    )
}
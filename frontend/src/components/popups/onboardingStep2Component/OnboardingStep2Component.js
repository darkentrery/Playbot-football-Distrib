import {OnboardingComponent} from "../../onboardingComponent/OnboardingComponent";
import {InputComponent} from "../../inputComponent/InputComponent";
import {useEffect, useState} from "react";
import {authDecoratorWithoutLogin} from "../../../services/AuthDecorator";
import {authService} from "../../../services/AuthService";
import {errorsUtil} from "../../../utils/errorsUtil";


export const OnboardingStep2Component = ({isOpen, user, funcs}) => {
    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState(false);
    const [photo, setPhoto] = useState(null);

    useEffect(() => {
        if (isOpen) {
            setUsername(user.username);
        }
    }, [isOpen])


    const clickSave = () => {
        if (username) {
            let data = {
                id: user.id,
                username: username,
                photo: photo,
            }
            authDecoratorWithoutLogin(authService.updatePhotoUsername, data).then(response => {
                console.log(response.data)
                if (response.status === 200) {
                    funcs.setAuth(true, response.data);
                } else {
                    if (response.data.username) setUsernameError(errorsUtil.getError("username", response.data.username[0]));
                }
            })
        } else {
            if (!username) setUsernameError("Введите username!");
        }
    }

    const clickBack = () => {
        funcs.closeComponent();
        funcs.openOnboardingStep1();
    }

    const clickSkip = () => {
        funcs.closeComponent();
        funcs.openOnboardingStep2();
    }

    const changeUsername = (value) => {
        setUsernameError(false);
        return value.slice(0, 15);
    }

    return (
        <OnboardingComponent
            isOpen={isOpen}
            step={2}
            closeWindow={funcs.closeComponent}
            button2Text={"Пропустить"}
            button1Click={clickSave}
            button2Click={clickSkip}
            clickBack={clickBack}
        >
            <div className={"onboarding-step-2-component"}>
                <span className={"title-elem black-600-20"}>Заполни карточку игрока</span>
                <div className={"photo-elem upload-photo-icon"}>

                </div>
                <InputComponent
                    className={"username-elem"} placeholder={"Введите username"} value={username} setValue={setUsername}
                    onChange={changeUsername} errorText={usernameError}
                />
            </div>
        </OnboardingComponent>
    )
}
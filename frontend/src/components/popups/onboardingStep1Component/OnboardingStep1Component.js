import {OnboardingComponent} from "../../onboardingComponent/OnboardingComponent";
import "./onboarding-step-1.scss";
import {useEffect, useState} from "react";
import {cityService} from "../../../services/CityService";
import {authDecoratorWithoutLogin} from "../../../services/AuthDecorator";
import {authService} from "../../../services/AuthService";


export const OnboardingStep1Component = ({isOpen, user, funcs}) => {
    const [addresses, setAddresses] = useState([]);
    const [address, setAddress] = useState(null);

    useEffect(() => {
        if (isOpen) {
            cityService.getAddresses().then(response => {
                setAddresses(response.data);
            })
        }
    }, [isOpen])

    const clickAddress = (e) => {
        for (let item of addresses) {
            if (item.id.toString() === e.target.id) {
                setAddress(item);
            }
        }
    }

    const clickSave = () => {
        if (address) {
            authDecoratorWithoutLogin(authService.updateAddress, {"city": address.city}).then(response => {
                funcs.setAuth(true, response.data);
                funcs.closeComponent();
                funcs.openOnboardingStep2();
            })
        }
    }

    const clickSkip = () => {
        funcs.closeComponent();
        funcs.openOnboardingStep2();
    }
    return (
        <OnboardingComponent
            isOpen={isOpen}
            step={1}
            closeWindow={funcs.closeComponent}
            button2Text={"Пропустить"}
            button1Click={clickSave}
            button2Click={clickSkip}
            backButton={false}
        >
            <div className={"onboarding-step-1-component"}>
                <span className={"title-elem black-600-20"}>Выбери город, в котором будешь играть</span>
                <div className={"cities"}>
                    {!!addresses.length && addresses.map((item, i) => (
                        <span
                            className={`city-elem black-300-16 ${address && item.id === address.id ? 'active' : ''}`}
                            key={i} id={item.id}
                            onClick={clickAddress}
                        >{item.city}</span>
                    ))}
                </div>
            </div>
        </OnboardingComponent>
    )
}
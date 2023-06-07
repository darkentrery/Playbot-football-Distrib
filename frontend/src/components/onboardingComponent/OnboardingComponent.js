import Modal from "react-modal";
import {CloseButtonComponent} from "../closeButtonComponent/CloseButtonComponent";
import {ButtonComponent} from "../buttonComponent/ButtonComponent";
import {BackButtonComponent} from "../backButtonComponent/BackButtonComponent";


export const OnboardingComponent = ({
    isOpen,
    step,
    clickBack = () => {},
    closeWindow,
    button1Text='Сохранить',
    button2Text='',
    button1Click = () => {},
    button2Click = () => {},
    backButton=true,
    children,
}) => {

    return (
        <Modal
            isOpen={isOpen}
            className={"popup-fon center-position"}
            contentLabel="Example Modal"
            ariaHideApp={false}
        >
            <div className={"popup-frame onboarding-component"}>
                <CloseButtonComponent className={"close-button"} onClick={closeWindow}/>
                {backButton && <BackButtonComponent className={"back-button"} onClick={clickBack}/>}
                <div className={"steps"}>
                    <span className={`step ${step === 1 ? 'black-600-16 active': 'gray-400-16'}`}>Шаг 1</span>
                    <span className={`step ${step === 2 ? 'black-600-16 active': 'gray-400-16'}`}>Шаг 2</span>
                </div>
                <div className={"onboarding-body"}>{children}</div>
                <ButtonComponent text={button1Text} onClick={button1Click}/>
                <ButtonComponent text={button2Text} buttonType={"type-3"} onClick={button2Click}/>
            </div>
        </Modal>
    )
}
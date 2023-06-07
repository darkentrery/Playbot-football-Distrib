import Modal from "react-modal";
import {CloseButtonComponent} from "../closeButtonComponent/CloseButtonComponent";
import {ButtonComponent} from "../buttonComponent/ButtonComponent";


export const OnboardingComponent = ({
    isOpen,
    step,
    clickBack = () => {},
    closeWindow,
    children,
    button1Text='Сохранить',
    button2Text='',
    button1Click = () => {},
    button2Click = () => {},
}) => {

    return (
        <Modal
            isOpen={isOpen}
            className={"popup-fon"}
            contentLabel="Example Modal"
            ariaHideApp={false}
        >
            <div className={"popup-frame onboarding-component"}>
                <CloseButtonComponent className={"close-button"} onClick={closeWindow}/>
                <div className={"steps"}>
                    <span className={`step step-1 black-600-16 active`}>Шаг 1</span>
                    <span className={`step step-2 black-600-16`}>Шаг 2</span>
                    <span className={`step step-3 black-600-16`}>Шаг 3</span>
                </div>
                <div className={"onboarding-body"}>{children}</div>
                <ButtonComponent text={"Сохранить"} onClick={button1Click}/>
                <ButtonComponent text={button2Text} buttonType={"type-3"} onClick={button2Click}/>
            </div>
        </Modal>
    )
}
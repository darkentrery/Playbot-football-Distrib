import Modal from "react-modal";


export const OnboardingComponent = ({
    isOpen,
    step,
    clickBack = () => {},
    closeWindow,
    children,
}) => {

    return (
        <Modal
            isOpen={isOpen}
            className={"popup-fon"}
            contentLabel="Example Modal"
            ariaHideApp={false}
        >
            <div className={"popup-frame onboarding-component"}>

            </div>
        </Modal>
    )
}
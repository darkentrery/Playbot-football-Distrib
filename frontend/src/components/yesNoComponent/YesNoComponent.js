import Modal from "react-modal";


export const YesNoComponent = ({
    isOpen,
    closeSuccess,
    title,
    text,
    buttonLabel1="Да",
    buttonLabel2="Нет",
    clickSuccess = () => {},
}) => {

    const closeWindow = () => {
        closeSuccess();
    }

    const clickButton = () => {
        closeWindow();
        clickSuccess();
    }

    return(
        <Modal
            isOpen={isOpen}
            className={"popup-fon"}
            contentLabel="Example Modal"
            ariaHideApp={false}
        >
            <div className={"popup-frame yes-no-component"}>
                <div onClick={closeWindow} className={"btn-close elem-376"}></div>
                <div className={"elem elem-1"}>
                    <span className={"title-22"}>{title}</span>
                    <div onClick={closeWindow} className={"btn-close"}></div>
                </div>
                <div className={"elem elem-2"}>
                    <span>{text}</span>
                </div>
                <div className={"elem elem-3"}>
                    <button className={"btn"} onClick={clickButton}>{buttonLabel1}</button>
                    <button className={"btn-second"} onClick={closeWindow}>{buttonLabel2}</button>
                </div>
            </div>
        </Modal>
    )
}
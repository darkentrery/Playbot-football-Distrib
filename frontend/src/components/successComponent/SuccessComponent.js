import Modal from "react-modal";
import {useEffect, useRef} from "react";


export default function SuccessComponent ({
    isOpen,
    closeSuccess,
    title,
    text,
    buttonLabel,
    clickSuccess = () => {},
}) {
    const windowRef = useRef();

     useEffect(() => {
        if (isOpen) {
            windowRef.current.parentNode.parentNode.style.zIndex = 1010;
        }
    }, [windowRef.current])

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
            <div className={"popup-frame success-component"} ref={windowRef}>
                <div className={"elem elem-1"}>
                    <span className={"black-600-22"}>{title}</span>
                    <div onClick={closeWindow} className={"btn-close"}></div>
                </div>
                <div className={"elem elem-2"}>
                    <span>{text}</span>
                </div>
                <div className={"elem elem-3"}>
                    <button className={"btn btn-success-event"} onClick={clickButton}>{buttonLabel}</button>
                </div>
            </div>
        </Modal>
    )
}
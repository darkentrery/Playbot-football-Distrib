import Modal from "react-modal";
import React from "react";


export const ReglamentComponent = ({
    className='',
    isOpen,
    step,
    clickBack = () => {},
    closeWindow,
    title,
    children,
    popupClick = () => {},
}) => {

    return (
        <Modal
            isOpen={isOpen}
            className={"popup-fon"}
            contentLabel="Example Modal"
            ariaHideApp={false}
        >
            <div className={"popup-fon"} onClick={popupClick}>
                <div className={`popup-frame reglament-component ${className}`}>
                    <div className={"elem elem-1"}>
                        <div onClick={clickBack} className={`btn-back ${step !== 1 ? '' : 'hidden'}`}></div>
                        <span className={"title-22"}>{title}</span>
                        <div onClick={closeWindow} className={"btn-close"}></div>
                    </div>
                    <div className={"elem elem-2"}>
                        <span className={step === 1 ? "black-600-16" : "gray-400-16"}>Шаг 1</span>
                        <span className={step === 2 ? "black-600-16" : "gray-400-16"}>Шаг 2</span>
                        <span className={step === 3 ? "black-600-16" : "gray-400-16"}>Шаг 3</span>
                    </div>
                    <div className={"elem elem-3"}>
                        <div className={step === 1 ? "orange-line" : "gray-line"}></div>
                        <div className={step === 2 ? "orange-line" : "gray-line"}></div>
                        <div className={step === 3 ? "orange-line" : "gray-line"}></div>
                    </div>
                    {children}
                </div>
            </div>
        </Modal>
    )
}
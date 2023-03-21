import {useState} from "react";
import Modal from "react-modal";
import $ from "jquery";
import {InputComponent} from "../inputComponent/InputComponent";


export const CancelComponent = ({
    isOpen,
    closeComponent,
    onClick,
    reason,
    setReason,
    reasons,
    title='',
    text='',
    buttonText='',
}) => {
    const [errorReason, setErrorReason] = useState(false);
    const [otherReason, setOtherReason] = useState(false);

    const closeWindow = () => {
        setReason(false);
        closeComponent();
    }

    const choiceReason = (e) => {
        let parent = $(e.target).parent('.elem-3');
        parent.children('.el').removeClass('inactive');
        parent.children('.el').addClass('inactive');
        $(e.target).removeClass('inactive');
        setReason($(e.target).html());
        setOtherReason(false);
    }

    const clickOtherReason = (e) => {
        if (!otherReason) {
            let parent = $(e.target).parent('.elem-3');
            parent.children('.el').removeClass('inactive');
            parent.children('.el').addClass('inactive');
            setOtherReason(true);
            setReason(false);
        }
    }

    const inputReason = (value) => {
        setReason(value);
        setErrorReason(false);
    }

    const sendForm = () => {
        if (reason) {
            onClick();
        } else {
            setErrorReason("Заполните поле!");
        }
    }

    return(
        <Modal
            isOpen={isOpen}
            className={"popup-fon"}
            contentLabel="Example Modal"
            ariaHideApp={false}
        >
            <div className={`popup-frame cancel-component ${otherReason ? 'other-reason' : ''}`}>
                <div className={"elem elem-1"}>
                    <span className={"black-600-22"}>{title}</span>
                    <div onClick={closeWindow} className={"btn-close"}></div>
                </div>
                <span className={"elem elem-2"}>{text}</span>
                <div className={"elem elem-3"}>
                    {reasons  && reasons.map((item, key) => {
                        return (<span className={"el radio-select-icon inactive"} key={key} id={item.id} onClick={choiceReason}>{item.name}</span>)
                    })}
                    <span className={`el radio-select-icon ${otherReason ? '' : 'inactive'}`} onClick={clickOtherReason}>Другая причина</span>
                    <InputComponent className={`elem elem-4 ${otherReason ? '' : 'hidden'}`}
                                    value={reason} setValue={inputReason} errorText={errorReason} placeholder={"Введите причину"}/>
                </div>
                <button className={"elem elem-5 btn"} onClick={sendForm}>{buttonText}</button>
            </div>
        </Modal>
    )
}
import {useContext} from "react";
import Modal from "react-modal";
import {OpenSuccessSignUpContext} from "../../context/AuthContext";


export default function SuccessSignUpComponent () {
   const {openSuccessSignUp, setOpenSuccessSignUp} = useContext(OpenSuccessSignUpContext);

    const closeWindow = () => {
        setOpenSuccessSignUp(!openSuccessSignUp);
    }

    return(
        <Modal
            isOpen={openSuccessSignUp}
            className={"popup-fon"}
            contentLabel="Example Modal"
            ariaHideApp={false}
        >
            <div className={"popup-frame success-event"}>
                <div className={"elem elem-1"}>
                    <span className={"title-22"}>Пароль отправлен</span>
                    <div onClick={closeWindow} className={"btn-close"}></div>
                </div>
                <div className={"elem elem-2"}>
                    <span>Мы отправили новый пароль на твою почту</span>
                </div>
                <div className={"elem elem-3"}>
                    <button className={"btn"} onClick={closeWindow}>Спасибо</button>
                </div>
            </div>
        </Modal>
    )
}
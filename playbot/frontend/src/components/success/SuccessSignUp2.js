import {useContext} from "react";
import Modal from "react-modal";
import {OpenSuccessSignUp2Context} from "../../context/AuthContext";


export default function SuccessSignUp2Component () {
   const {openSuccessSignUp2, setOpenSuccessSignUp2} = useContext(OpenSuccessSignUp2Context);

    const closeWindow = () => {
        setOpenSuccessSignUp2(!openSuccessSignUp2);
        window.location.href = `${process.env.REACT_APP_MAIN_URL}`;
    }

    return(
        <Modal
            isOpen={openSuccessSignUp2}
            className={"popup-fon"}
            contentLabel="Example Modal"
            ariaHideApp={false}
        >
            <div className={"popup-frame success-event"}>
                <div className={"elem elem-1"}>
                    <span className={"title-22"}>Успешная регистрация</span>
                    <div onClick={closeWindow} className={"btn-close"}></div>
                </div>
                <div className={"elem elem-2"}>
                    <span>Вы успешно зарегистрировались. Теперь футбол в твоих руках</span>
                </div>
                <div className={"elem elem-3"}>
                    <button className={"btn"} onClick={closeWindow}>Продолжить</button>
                </div>
            </div>
        </Modal>
    )
}
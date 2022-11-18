import {useContext} from "react";
import Modal from "react-modal";
import {OpenSuccessRefreshPasswordContext} from "../../context/AuthContext";


export default function SuccessRefreshPasswordComponent () {
    const { openSuccessRefreshPassword, setOpenSuccessRefreshPassword } = useContext(OpenSuccessRefreshPasswordContext);

    const closeWindow = () => {
        setOpenSuccessRefreshPassword(!openSuccessRefreshPassword);
    }

    return(
        <Modal
            isOpen={openSuccessRefreshPassword}
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
                    <button className={"btn btn-success-event"} onClick={closeWindow}>Спасибо</button>
                </div>
            </div>
        </Modal>
    )
}
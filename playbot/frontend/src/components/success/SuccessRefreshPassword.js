import {useContext} from "react";
import Modal from "react-modal";
import {OpenSuccessCreateEventContext} from "../context/EventContext";


export default function SuccessRefreshPasswordComponent () {
    const { openSuccessCreateEvent, setOpenSuccessCreateEvent } = useContext(OpenSuccessCreateEventContext);

    const closeWindow = () => {
        setOpenSuccessCreateEvent(!openSuccessCreateEvent);
    }

    return(
        <Modal
            isOpen={openSuccessCreateEvent}
            className={"popup-fon"}
            contentLabel="Example Modal"
            ariaHideApp={false}
        >
            <div className={"popup-frame success-event"}>
                <div className={"elem elem-1"}>
                    <span className={"title-22"}>Событие создано</span>
                    <div onClick={closeWindow} className={"btn-close"}></div>
                </div>
                <div className={"elem elem-2"}>
                    <span>Теперь дождитесь, когда соберется необходимое количество игроков и начинайте игру</span>
                </div>
                <div className={"elem elem-3"}>
                    <button className={"btn btn-success-event"} onClick={closeWindow}>Перейти на страницу события</button>
                </div>
            </div>
        </Modal>
    )
}
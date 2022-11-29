import {useContext} from "react";
import Modal from "react-modal";
import {OpenSuccessEditEventContext} from "../../context/EventContext";
import {useNavigate} from "react-router-dom";


export default function SuccessEditEventComponent ({id}) {
    const { openSuccessEditEvent, setOpenSuccessEditEvent } = useContext(OpenSuccessEditEventContext);
    let navigate = useNavigate();

    const closeWindow = () => {
        setOpenSuccessEditEvent(!openSuccessEditEvent);
        window.location.href = `${process.env.REACT_APP_MAIN_URL}events/event/${id}/`
    }

    return(
        <Modal
            isOpen={openSuccessEditEvent}
            className={"popup-fon"}
            contentLabel="Example Modal"
            ariaHideApp={false}
        >
            <div className={"popup-frame success-event"}>
                <div className={"elem elem-1"}>
                    <span className={"title-22"}>Событие изменено</span>
                    <div onClick={closeWindow} className={"btn-close"}></div>
                </div>
                <div className={"elem elem-2"}>
                    <span>Теперь дождитесь, когда соберется необходимое количество игроков и начинайте игру</span>
                </div>
                <div className={"elem elem-3"}>
                    <button className={"btn"} onClick={closeWindow}>Перейти на страницу события</button>
                </div>
            </div>
        </Modal>
    )
}
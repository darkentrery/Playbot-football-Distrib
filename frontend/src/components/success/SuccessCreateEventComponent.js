import SuccessComponent from "../successComponent/SuccessComponent";
import {useNavigate} from "react-router-dom";


export default function SuccessCreateEventComponent ({isOpen, event, closeComponent, closeShowMenu}) {
    const navigate = useNavigate();
    const clickSuccess = () => {
        closeShowMenu();
        navigate(`events/event/${event.id}/`);
    }

    const close = () => {
        closeComponent();
        closeShowMenu();
    }

    return(
        <SuccessComponent
            isOpen={isOpen}
            closeSuccess={close}
            title={"Событие создано"}
            text={"Теперь дождитесь, когда соберется необходимое количество игроков и начинайте игру"}
            buttonLabel={"Перейти на страницу события"}
            clickSuccess={clickSuccess}
        />
    )
}
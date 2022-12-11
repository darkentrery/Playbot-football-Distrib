import SuccessComponent from "./SuccessComponent";
import {useNavigate} from "react-router-dom";


export default function SuccessCreateEventComponent ({isOpen, event, closeComponent}) {
    const navigate = useNavigate();
    const clickSuccess = () => {
        navigate(`events/event/${event.id}/`)
    }

    return(
        <SuccessComponent
            isOpen={isOpen}
            closeSuccess={closeComponent}
            title={"Событие создано"}
            text={"Теперь дождитесь, когда соберется необходимое количество игроков и начинайте игру"}
            buttonLabel={"Перейти на страницу события"}
            clickSuccess={clickSuccess}
        />
    )
}
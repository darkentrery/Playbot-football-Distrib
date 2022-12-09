import SuccessComponent from "./SuccessComponent";
import {useNavigate} from "react-router-dom";


export default function SuccessEditEventComponent ({isOpen, event, closeComponent, showMap}) {
    const navigate = useNavigate();
    const clickSuccess = () => {
        navigate(`events/event/${event.id}/`);
        showMap();
    }

    return(
        <SuccessComponent
            isOpen={isOpen}
            closeSuccess={closeComponent}
            title={"Событие изменено"}
            text={"Теперь дождитесь, когда соберется необходимое количество игроков и начинайте игру"}
            buttonLabel={"Перейти на страницу события"}
            clickSuccess={clickSuccess}
        />
    )
}
import SuccessComponent from "../successComponent/SuccessComponent";
import {useNavigate} from "react-router-dom";


export const SuccessCancelEventComponent = ({isOpen, event, closeComponent, showMap}) => {
    const navigate = useNavigate();
    const clickSuccess = () => {
        closeComponent();
        navigate(`events/event/${event.id}/`);
        showMap();
    }

    return(
        <SuccessComponent
            isOpen={isOpen}
            closeSuccess={clickSuccess}
            title={"Событие отменено"}
            text={"Вы можете посмотреть информацию об отмененном событии"}
            buttonLabel={"Перейти на страницу события"}
            // clickSuccess={clickSuccess}
        />
    )
}
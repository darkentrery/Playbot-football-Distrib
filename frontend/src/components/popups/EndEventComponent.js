import {YesNoComponent} from "../yesNoComponent/YesNoComponent";
import {authDecoratorWithoutLogin} from "../../services/AuthDecorator";
import {eventService} from "../../services/EventService";


export const EndEventComponent = ({isOpen, event, closeComponent, setEvent}) => {
    const clickSuccess = () => {
      closeComponent();
    }
    const clickEndEvent = () => {
        // setIsEndEvent(true);
        setEvent(false);
        authDecoratorWithoutLogin(eventService.endEvent, {"id": event.id}).then((response) => {
            if (response.status === 200) {
                setEvent(response.data);
            }
        })
    }
    
    return (
        <YesNoComponent
            isOpen={isOpen}
            closeSuccess={clickSuccess}
            title={"Завершить матч"}
            text={"Вы уверены, что хотите завершить матч? Результаты матчей будут сохранены на момент окончания события."}
            clickSuccess={clickEndEvent}
        />
    )
}
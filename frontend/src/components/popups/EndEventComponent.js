import {YesNoComponent} from "../yesNoComponent/YesNoComponent";


export const EndEventComponent = ({isOpen, event, closeComponent, setEvent, sendSocketMessage}) => {
    const clickSuccess = () => {
      closeComponent();
    }
    const clickEndEvent = () => {
        if (sendSocketMessage) {
            sendSocketMessage({
                type: "end_event",
                event
            })
        }
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
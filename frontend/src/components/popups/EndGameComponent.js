import {YesNoComponent} from "../yesNoComponent/YesNoComponent";
import {authDecoratorWithoutLogin} from "../../services/AuthDecorator";
import {eventService} from "../../services/EventService";


export const EndGameComponent = ({isOpen, game, closeComponent, setGame}) => {
    const clickSuccess = () => {
      closeComponent();
    }
    const clickEndGame = () => {
        authDecoratorWithoutLogin(eventService.endGame, game).then((response) => {
            console.log(response.data)
            if (response.status === 200) setGame(response.data);
        })
    }
    
    return (
        <YesNoComponent
            isOpen={isOpen}
            closeSuccess={clickSuccess}
            title={"Завершить игру"}
            text={"Вы уверены, что хотите завершить игру? Результаты матчей будут сохранены на момент окончания события"}
            clickSuccess={clickEndGame}
        />
    )
}
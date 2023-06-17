import {YesNoComponent} from "../yesNoComponent/YesNoComponent";


export const EndGameComponent = ({isOpen, game, closeComponent, setGame, setEvent, sendSocketMessage}) => {
    const clickSuccess = () => {
      closeComponent();
    }
    const clickEndGame = () => {
        if (sendSocketMessage) {
            sendSocketMessage({
                type: "end_game",
                game
            })
        }
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
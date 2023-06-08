import "./high-light.scss";
import {BackButtonComponent} from "../backButtonComponent/BackButtonComponent";
import {CloseButtonComponent} from "../closeButtonComponent/CloseButtonComponent";
import {PlayerIconComponent} from "../playerIconComponent/PlayerIconComponent";


export const HighLightComponent = ({
    isOpen,
    teamPlayers,
    toBack=false,
    delHighLight=false,
    autoGoal=false,
    clickPlayer = () => {},
    text='',
    clickClose = () => {},
}) => {
    return (
        <div className={`high-light-component ${isOpen ? '' : 'hidden'}`}>
            <div className={`title-row`}>
                {!!toBack && <BackButtonComponent className={"back"} onClick={toBack}/>}
                <span className={"title black-600-14"}>{text}</span>
                <CloseButtonComponent className={"close"} onClick={clickClose}/>
            </div>
            {!!autoGoal && <div className={"autogoal-row"} onClick={autoGoal}>
                <div className={"autogoal-icon"}></div>
                <span className={"black-400-14"}>Автогол</span>
            </div>}
            <div className={"players-elems"}>
                {!!teamPlayers.length && teamPlayers.map((player, i) => (
                    <div className={"player-elem"} key={i} onClick={() => clickPlayer(player)}>
                        <PlayerIconComponent photo={player.player.photo}/>
                        <span className={"black-400-14"}>{player.player.username}</span>
                    </div>
                ))}
            </div>
            {!!delHighLight && <div className={"delete-row"} onClick={delHighLight}>
                <div className={"red-bucket-icon bucket"}></div>
                <span className={"red-400-14"}>Удалить хайлайт</span>
            </div>}
        </div>
    )
}
import "./high-light.scss";
import {BackButtonComponent} from "../backButtonComponent/BackButtonComponent";
import {CloseButtonComponent} from "../closeButtonComponent/CloseButtonComponent";
import {PlayerIconComponent} from "../playerIconComponent/PlayerIconComponent";


export const HighLightComponent = ({
    isOpen,
    event,
    team,
    toBack=false,
    delHighLight=false,
}) => {
    return (
        <div className={`high-light-component ${isOpen ? '' : 'hidden'}`}>
            <div className={`title-row`}>
                {!!toBack && <BackButtonComponent className={"back"} onClick={toBack}/>}
                <span className={"title black-600-14"}>Автор гола (1/2)</span>
                <CloseButtonComponent className={"close"}/>
            </div>
            <div className={"players-elems"}>
                {!!team.team_players.length && team.team_players.map((player, i) => (
                    <div className={"player-elem"} key={i}>
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
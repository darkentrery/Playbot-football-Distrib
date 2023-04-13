import {Link} from "react-router-dom";
import ProfileRoutes from "../../routes/ProfileRoutes";
import {eventService} from "../../services/EventService";


export const PlayerRowComponent = ({className='', player}) => {
    return (
        <Link className={`player-row-component ${className}`} to={ProfileRoutes.previewPlayerLink(player.id)}>
            <div className={"el el-1 player-avatar-icon"}>
                <span className={"name"}>{eventService.getCutUsername(player.username)}</span>
                <span className={"role"}>{player.position_1 ? player.position_1.name : ''}</span>
            </div>
            <span className={"el el-2"}>{player.rank}</span>
        </Link>
    )
}
import {Link} from "react-router-dom";
import ProfileRoutes from "../../routes/ProfileRoutes";


export const PlayerRowComponent = ({className='', player}) => {
    return (
        <Link className={`player-row-component ${className}`} to={ProfileRoutes.previewPlayerLink(player.id)}>
            <div className={"el el-1 player-avatar-icon"}>
                <span className={"name"}>{player.username}</span>
                <span className={"role"}>Форвард</span>
            </div>
            <span className={"el el-2"}>{player.rank.toFixed(1).replace('.', ',')}</span>
        </Link>
    )
}
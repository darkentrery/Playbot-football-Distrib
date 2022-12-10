import BaseRoutes from "../../routes/BaseRoutes";
import {Link} from "react-router-dom";


export default function ActiveMenuLinkComponent ({link, label}) {

    return (
        <div className={"menu-point black-point-icon"}>
            <Link to={link}><span>{label}</span></Link>
        </div>
    )
}
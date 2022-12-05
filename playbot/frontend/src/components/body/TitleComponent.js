import {Link} from "react-router-dom";
import React from "react";


export default function TitleComponent ({label, to}) {
    return (
        <div className={"title"}>
            <span className={"t-1"}>{label}</span>
            <Link className={"t-2"} to={to}>
                <span>Смотреть все</span>
                <div className={"orange-right-arrow-icon"}></div>
            </Link>
        </div>
    )
}
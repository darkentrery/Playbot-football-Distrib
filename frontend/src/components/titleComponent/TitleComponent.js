import {Link} from "react-router-dom";
import React from "react";


export const TitleComponent = ({label, to}) => {
    return (
        <div className={"title-component"}>
            <span className={"black-600-24"}>{label}</span>
            <Link className={"t-2"} to={to}>
                <span className={"orange-400-14"}>Смотреть все</span>
                <div className={"orange-right-arrow-icon"}></div>
            </Link>
        </div>
    )
}
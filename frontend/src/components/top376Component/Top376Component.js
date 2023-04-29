import {Link} from "react-router-dom";
import React from "react";


export const Top376Component = ({className='', to, label, back = () => {}, children}) => {
    return (
        <div className={`top-376-component ${className}`}>
            <Link className={"elem-1"} to={to} onClick={back}>
                <div className={"el-1 gray-left-arrow-icon"}></div>
                <span className={"el-2 black-500-14"}>{label}</span>
            </Link>
            <div className={"elem-2"}>
                {children}
            </div>
        </div>
    )
}
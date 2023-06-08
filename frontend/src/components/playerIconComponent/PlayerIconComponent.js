import avatarIcon from "../../assets/icon/avatar-2.png";
import React from "react";
import "./player-icon.scss";


export const PlayerIconComponent = ({className='', photo=''}) => {
    const serverUrl = process.env.REACT_APP_SERVER_URL;
    return (
        <img src={photo ? serverUrl + photo : avatarIcon} className={`player-icon-component ${className}`} alt=""/>
    )
}
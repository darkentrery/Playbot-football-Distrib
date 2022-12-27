import React, {useState} from "react";


export const CheckSliderComponent = ({
    value=false,
    setValue = () => {},
    text,
    sizingClass='',
    textIcon='',
    onClick=() => {},
}) => {

    const clickCheck = () => {
        setValue(!value);
        onClick();
    }

    return (
        <div className={`check-slider-component ${sizingClass}`}>
            <div className={`${value ? 'slider-check-icon' : 'slider-uncheck-icon'}`} onClick={clickCheck}></div>
            <span className={textIcon}>{text}</span>
        </div>
    )
}
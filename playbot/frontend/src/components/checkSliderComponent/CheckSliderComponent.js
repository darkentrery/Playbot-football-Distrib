import React, {useState} from "react";


export const CheckSliderComponent = ({
    value=false,
    setValue,
    text,
    sizingClass='',
    textIcon='',
    onClick=() => {},
}) => {
    const [isCheck, setIsCheck] = useState(value);

    const clickCheck = () => {
        setValue(!isCheck);
        setIsCheck(!isCheck);
        onClick();
    }

    return (
        <div className={`check-slider-component ${sizingClass}`}>
            <div className={`${isCheck ? 'slider-check-icon' : 'slider-uncheck-icon'}`} onClick={clickCheck}></div>
            <span className={textIcon}>{text}</span>
        </div>
    )
}
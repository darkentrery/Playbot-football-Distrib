import React, {useState} from "react";


export const CheckSliderComponent = ({
    value=false,
    setValue,
    text,
    sizingClass='',
}) => {
    const [isCheck, setIsCheck] = useState(value);

    const clickCheck = () => {
        setValue(!isCheck);
        setIsCheck(!isCheck);
    }

    return (
        <div className={`check-slider-component ${sizingClass}`}>
            <div className={`${isCheck ? 'slider-check-icon' : 'slider-uncheck-icon'}`} onClick={clickCheck}></div>
            <span>{text}</span>
        </div>
    )
}